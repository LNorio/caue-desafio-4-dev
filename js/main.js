// Javascript Document

var admin=require("firebase-admin");
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");

function cadastrarCliente(){
    if(document.getElementById("cnomecliente").value=="" || document.getElementById("cnomecontato").value==""){
        alert("Preencha o(s) Campo(s) para concluir o cadastro!");
    }else if(false){
        alert("Nome de Cliente ja existe!");
    }else{

    }
    limparCampos();
}

function limparCampos(){
    document.getElementById("cnomecliente").value="";
    document.getElementById("cnomecontato").value="";
}