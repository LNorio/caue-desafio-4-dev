//Javascript Document

var clientes=[];

var avaliacoes=[];

var dat=new Date;

var vbt=false;

var avaliacao={
    id: 0,
    data: [dat.getMonth(),dat.getFullYear()],
    clientes: [],
    notas: [],
    comentarios: [],
    nps: 0
}

//Função para calcular NPS
function calcnps(){

}

//Função para salvar notas e comentarios avaliação
function saveav(){
    var a=document.getElementById("nota").value;
    var b=document.getElementById("justify").value;

    if(a=="" || b==""){
        alert("Campo(s) em branco!!!");
    }else{
        alert("nota: "+a+" justificativa: "+b);
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
        var aux=0;
        
        avaliacao.id=avaliacoes.length+1;

        while(aux!=nca){
            var n=Math.floor(Math.random()*nca);
            
            if(clientes[n].dataav[0]==0 && clientes[n].dataav[1]==0 || (dat.getMonth()-clientes[n].dataav[0])>=3 && dat.getFullYear()==clientes[n].dataav[1] || (dat.getFullYear()-clientes[n].dataav[1])==1 && Clientes[n].dataav[0]-dat.getMonth<=9 || (dat.getFullYear()-clientes[n].dataav[1])>=2){
                clientes[n].dataav[0]=dat.getMonth();
                clientes[n].dataav[1]=dat.getFullYear();
                avaliacao.clientes.push(clientes[n]);
                aux++;
            }
        }
        avaliacoes.push(avaliacao);
        alert("Avaliação gerada com sucesso!!!");
    }
}


//Função exibir avaliação do mês atual e clientes participantes
function loadavaliacao(){
    avaliacao.id=avaliacoes.length+1;
    avaliacao.nps=59;
    avaliacoes.push(avaliacao);

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
        
        
        for(var i=0;i<5;i++){
            var catr=document.createElement("tr");

            var idctd=document.createElement("td");
            var nomeclientetd=document.createElement("td");
            var contatoclientetd=document.createElement("td");
            var sinalizadortd=document.createElement("td");
            var tdtd=document.createElement("td");

            idctd.textContent=i+3;
            nomeclientetd.textContent="Caue";
            contatoclientetd.textContent="Caquino";
            sinalizadortd.textContent="Defrator";

            tdtd.innerHTML+="<button type=\button\ data-toggle=\modal\ data-target=\#Modal\>Avaliar";

            //idctd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].id;
            //nomeclientetd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].nomecliente;
            //contatoclientetd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].contatocliente;
            //sinalizadortd.textContent=avaliacoes[avaliacoes.length-1].clientes[i].sinalizador;

            //tdtd.innerHTML+="<button type=\button\ /*id="+avaliacoes[avaliacoes.length-1].clientes[i].id+"*/ data-toggle=\modal\ data-target=\#Modal\>Avaliar";

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

            if(avaliacao[i].nps>=80){
                npstd.style.color="green";

            }else if(avaliacao[i].nps<60){
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
