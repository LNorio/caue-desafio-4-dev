//Javascript Document

var clientes=[];

var dat=new Date;

var vbt=false;

var cliente={
    id: 0,
    nomecliente: "",
    contatocliente: "",
    datacad: [dat.getMonth(),dat.getFullYear()],
    dataav: [0,0],
    sinalizador: "Nenhum"
};

//atualiza dados com o banco
firebase.database().ref('clientes').on('value', function (snapshot) {
    snapshot.forEach(function(item){
        clientes.push(item);
    });
});

//função para limpar 'inputs' tela cadastro cliente
function cleanCadClient(){
    document.getElementById("clienteInput").innerText="";
    document.getElementById("contatoInput").innerText="";
}

//Função para verificar se contato ja existe
function verifcontato(){
    for(var i=0;i<clientes.length;i++){
        if(clientes[i].contatocliente==document.getElementById("contatoInput").value){
            return true;
        }
    }
    return false;
}

//Função para cadastrar um cliente
function cadCliente(){
    if(verifcontato()){
        alert("Nome do Contato ja existe!!!");

    }else if(document.getElementById("clienteInput").value!="" && document.getElementById("contatoInput").value!=""){
        cliente.id=clientes.length+1;
        cliente.nomecliente=document.getElementById("clienteInput").value;
        cliente.contatocliente=document.getElementById("contatoInput").value;

        firebase.database().ref().child('clientes').push(cliente);
        alert("Cadastro Concluído com sucesso!!!");
    }
}

//Função para carregar lista de clientes cadastrados
function loadClientes(){
    if(vbt){
        alert("Lista de clientes ja carregada!!!")

    }else if(clientes.length==0){
        alert("Não há nenhum cliente cadastrado!!!");

    }else{
        for(var i=0;i<clientes.length;i++){

            var clientetr=document.createElement("tr");
            
            var idtd=document.createElement("td");
            var nomeclientetd=document.createElement("td");
            var contatoclientetd=document.createElement("td");
            var sinalizadortd=document.createElement("td");

            idtd.textContent=clientes[i].id;
            nomeclientetd.textContent=clientes[i].nomecliente;
            contatoclientetd.textContent=clientes[i].contatocliente;
            sinalizadortd.textContent=clientes[i].sinalizador;

            clientetr.appendChild(idtd);
            clientetr.appendChild(nomeclientetd);
            clientetr.appendChild(contatoclientetd);
            clientetr.appendChild(sinalizadortd);

            var tabela=document.getElementById("tabclientes");

            tabela.appendChild(clientetr);
        }
        vbt=true;
        alert("Clintes carregados com sucesso!!!")
    }
}