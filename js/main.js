function cadcliente(){
    var clientInput=document.getElementById('cnomecliente');
    var contatoInput=document.getElementById('cnomecontato');

    if(clientInput.value=="" || contatoInput.value==""){
        alert("Preencha o(s) Campo(s) para concluir o cadastro!");
    }else if(verifCliente(clientInput)){
        alert("Nome de Cliente ja existe!");
    }else{
        var data=Date();
        criaCliente(clientInput.value, contatoInput.value, data);
        alert("Cadastro Concluido!");
    }
    limparCampos();
}

function verifCliente(cl){
    return true;
}

function criaCliente(cliente, contato, data){
    var dat = {
        cliente: cliente,
        contato: contato,
        cadData: data,
        categoria: "nenhum",
        avData: ""
    };

    return firebase.database().ref().child('clientes').push(dat);
}

function limparCampos(){
    document.getElementById('cnomecliente').value="";
    document.getElementById('cnomecontato').value="";
}

function cadavaliacao(){
    alert('erro');
}
