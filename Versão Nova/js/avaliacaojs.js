//Javascript Document

var clientes=[];

var avaliacoes=[];

var dat=new Date;

var vbt=false;

var xca;

var avaliacao={
    id: 0,
    data: [dat.getMonth(),dat.getFullYear()],
    clientes: [],
    notas: [0],
    comentarios: [0],
    nps: 0
};

//atualiza dados cliente com o banco
firebase.database().ref('clientes').on('value', function (snapshot) {
    snapshot.forEach(function(item){
        clientes.push(item.val());
    });
});

//atualiza dados avaliacoes com o banco
firebase.database().ref('avaliacoes').on('value', function (snapshot) {
    snapshot.forEach(function(item){
        avaliacoes.push(item.val());
    });
});

//Função para calcular NPS
function calcnps(){
    var p=0;
    var promotores=0;
    var detratores=0;

    for(var i=0;i<avaliacoes[avaliacoes.length-1].clientes.length;i++){
        if(avaliacoes[avaliacoes.length-1].clientes[i].sinalizador=="Promotores"){
            promotores++;

        }else if(avaliacoes[avaliacoes.length-1].clientes[i].sinalizador=="Detratores"){
            detratores++;

        }
        p++;
    }
    avaliacoes[avaliacoes.length-1].nps=((promotores-detratores)/p) * 100;
}

//Função salva id cliente avaliação
function catchid(idcliente){
    xca=idcliente;
}

//Função para salvar notas e comentarios avaliação
function saveav(){
    var a=document.getElementById("nota").value;
    var b=document.getElementById("justify").value;

    if(a=="" || b==""){
        alert("Campo(s) em branco!!!");
    }else{
        for(var j=0;j<avaliacoes[avaliacoes.length-1].clientes.length;j++){
            if(avaliacoes[avaliacoes.length-1].clientes[j].id==xca){
                if(a>=9){
                    avaliacoes[avaliacoes.length-1].clientes[j].sinalizador="Promotores";
                    clientes[xca-1].sinalizador="Promotores";

                }else if(a>=7){
                    avaliacoes[avaliacoes.length-1].clientes[j].sinalizador="Neutros";
                    clientes[xca-1].sinalizador="Neutros";

                }else{
                    cavaliacoes[avaliacoes.length-1].clientes[j].sinalizador="Detratores";
                    clientes[xca-1].sinalizador="Detratores";
                }
            }
        }
        for(var i=0;i<avaliacoes[avaliacoes.length-1].clientes.length;i++){
            if(avaliacoes[avaliacoes.length-1].clientes[i].id==xca){
                avaliacoes[avaliacoes.length-1].notas[i]=a;
                avaliacoes[avaliacoes.length-1].comentarios[i]=b;
            }
        }
        calcnps();

        firebase.database().ref('avaliacoes').update(avaliacoes);
        firebase.database().ref('clientes').update(clientes);

        alert("Mudanças salvas com sucesso!!!");
        
        window.location.reload();
    }
}

//Função para gerar nova avaliação
function geraravaliacao(){

    if(avaliacoes.length!=0 && avaliacoes[avaliacoes.length-1].data[0]==dat.getMonth() && avaliacoes[avaliacoes.length-1].data[1]==dat.getFullYear()){
        alert("Este mês ja possui uma avaliação aberta!!!");

    }else if(clientes.length<5){
        alert("Número insuficiente de clientes para gerar avaliação!!!");
    
    }else{
        var nca=clientes.length/5;
        var auxiliar=0;

        avaliacao.id=avaliacoes.length+1;
        
        while(auxiliar!=nca){
            var n=Math.floor(Math.random()*clientes.length);
            
            if(clientes[n].dataav[0]==0 && clientes[n].dataav[1]==0 || (dat.getMonth()-clientes[n].dataav[0])>=3 && dat.getFullYear()==clientes[n].dataav[1] || (dat.getFullYear()-clientes[n].dataav[1])==1 && Clientes[n].dataav[0]-dat.getMonth<=9 || (dat.getFullYear()-clientes[n].dataav[1])>=2){
                clientes[n].dataav[0]=dat.getMonth();
                clientes[n].dataav[1]=dat.getFullYear();
                
                avaliacao.clientes.push(clientes[n]);

                auxiliar++;
            }
        }
        avaliacoes.push(avaliacao);

        firebase.database().ref().child('avaliacoes').update(avaliacoes);
        firebase.database().ref('clientes').update(clientes);

        alert("Avaliação gerada com sucesso!!!");
    }
}


//Função exibir avaliação do mês atual e clientes participantes
function loadavaliacao(){
    if(vbt){
        alert("Avaliação ja Carregada!!!")

    }else if(avaliacoes.length==0){
        alert("Não há nenhuma avaliação cadastrada!!!");
    
    }else if(avaliacoes[avaliacoes.length-1].data[0]!=dat.getMonth() && avaliacoes[avaliacoes.length-1].data[0]!=dat.getFullYear()){
        alert("Nenhuma avaliação foi gerada neste mês!!!");
    
    }else{
        var avaliacaotr=document.createElement("tr");
        
        var idtd=document.createElement("td");
        var datatd=document.createElement("td");
        var npstd=document.createElement("td");

        var h3=document.createElement("h3");

        idtd.textContent=avaliacoes[avaliacoes.length-1].id;
        datatd.textContent=avaliacoes[avaliacoes.length-1].data[0]+"/"+avaliacoes[avaliacoes.length-1].data[1];
        npstd.textContent=avaliacoes[avaliacoes.length-1].nps+"%";
        
        h3.textContent="Clientes:";

        if(avaliacoes[avaliacoes.length-1].nps>=80){
            npstd.style.color="green";

        }else if(avaliacoes[avaliacoes.length-1].nps<60){
            npstd.style.color="red";

        }else{
            npstd.style.color="yellow";
        }

        avaliacaotr.appendChild(idtd);
        avaliacaotr.appendChild(datatd);
        avaliacaotr.appendChild(npstd);

        var tabela=document.getElementById("tabavaliacao");

        tabela.appendChild(avaliacaotr);
        
        
        for(var i=0;i<(avaliacoes[(avaliacoes.length)-1].clientes.length);i++){
            var catr=document.createElement("tr");

            var idctd=document.createElement("td");
            var nomeclientetd=document.createElement("td");
            var contatoclientetd=document.createElement("td");
            var sinalizadortd=document.createElement("td");
            var tdtd=document.createElement("td");

            idctd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].id;
            nomeclientetd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].nomecliente;
            contatoclientetd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].contatocliente;
            sinalizadortd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].sinalizador;

            tdtd.innerHTML+="<button type=\button\ onclick=\catchid("+avaliacoes[avaliacoes.length-1].clientes[i].id+")\ data-toggle=\modal\ data-target=\#Modal\>Avaliar";

            catr.appendChild(idctd);
            catr.appendChild(nomeclientetd);
            catr.appendChild(contatoclientetd);
            catr.appendChild(sinalizadortd);
            catr.appendChild(tdtd);

            var tabc=document.getElementById("clientesav");

            tabc.appendChild(catr);
        }
        vbt=true;
        alert("Avaliação carregada com sucesso!!!");
    }
}

//Função exibir lista de todas as avaliações
function loadavaliacoes(){
    if(vbt){
        alert("Lista de avaliações ja carregada!!!");

    }else if(avaliacoes.length==0){
        alert("Não há nenhuma avaliação cadastrada!!!");
    
    }else{
        for(var i=0;i<avaliacoes.length;i++){
            
            var avaliacaotr=document.createElement("tr");

            var idtd=document.createElement("td");
            var datatd=document.createElement("td");
            var npstd=document.createElement("td");
            
            idtd.textContent=avaliacoes[i].id;
            datatd.textContent=avaliacoes[i].data[0]+"/"+avaliacoes[i].data[1];
            npstd.textContent=avaliacoes[i].nps+"%";
            
            if(avaliacoes[i].nps>=80){
                npstd.style.color="green";

            }else if(avaliacoes[i].nps<60){
                npstd.style.color="red";
                
            }else{
                npstd.style.color="yellow";
            }
            
            avaliacaotr.appendChild(idtd);
            avaliacaotr.appendChild(datatd);
            avaliacaotr.appendChild(npstd);
            
            var tabela=document.getElementById("tabavaliacoes");
        
            tabela.appendChild(avaliacaotr);
        }
        vbt=true;
        alert("Avaliações carregadas com sucesso!!!");
    }
}
