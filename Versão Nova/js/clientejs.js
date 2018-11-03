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
}

//função para limpar 'inputs' tela cadastro cliente
function cleanCadClient(){
    document.getElementById("clienteInput").innerText="";
    document.getElementById("contatoInput").innerText="";
}

//Função para cadastrar um cliente
function cadCliente(){

    if(document.getElementById("clienteInput").value!="" && document.getElementById("contatoInput").value!=""){
        cliente.id=clientes.length+1;
        cliente.nomecliente=document.getElementById("clienteInput").value;
        cliente.contatocliente=document.getElementById("contatoInput").value;
        clientes.push(cliente);
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