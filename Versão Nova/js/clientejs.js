//Javascript Document

var clientes=[];

var dat=new Date;

var cliente={
    nomecliente: "",
    contatocliente: "",
    datacad: [dat.getMonth(),dat.getFullYear()],
    dataav: [0,0],
    sinalizador:"Nenhum"
}

function cleanCadClient(){
    document.getElementById("clienteInput").innerText="";
    document.getElementById("contatoInput").innerText="";
}

function cadCliente(){

    if(document.getElementById("clienteInput").value!="" && document.getElementById("contatoInput").value!=""){
        cliente.nomecliente=document.getElementById("clienteInput").value;
        cliente.contatocliente=document.getElementById("contatoInput").value;
        clientes.push(cliente);
        cleanCadClient();
        alert(clientes[0].datacad[0]+"/"+clientes[0].datacad[1]);
    }
}