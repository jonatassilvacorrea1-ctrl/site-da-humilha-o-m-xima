const senhacriptografada = document.getElementById("senhacriptografada");
const senhadigitada = document.getElementById("senhadigitada");
const mensagem = document.getElementById("mensagem");
const body = document.getElementById("body");
const btnAjuda = document.getElementById("btn-ajuda");
const containerDica = document.getElementById("container-dica");
const btnAlfabeto = document.getElementById("btn-alfabeto");
const containerAlfabeto = document.getElementById("container-alfabeto");
const deslocamento = 3;
const senhas = [
    "cacau",
    "kirito",
    "minecraft",
    "ballet",
    "patamon",
    "meencontra",
    "cafe",
    "paralelepipedo",
    "asuna",
    "livros",
    "anne",
    "aquamarine",
    "esquisitao",
    "melanciahtml"
]   

function criptografar(senha) {
    const alfabeto = "abcdefghijklmnopqrstuvwxyz";
    const letras_senha = senha.split("")
    let letras_senha_criptografada = []
    for (let o = 0; o < letras_senha.length; o++) {
        let aux = alfabeto.indexOf(letras_senha[o]);
        letras_senha_criptografada.push(alfabeto[(aux + deslocamento) % alfabeto.length]);
    }
    
    return letras_senha_criptografada.join("");
}

function verificarSenha() {
    const senha_digitada = senhadigitada.value.toLowerCase().trim();

    if (senha_digitada === senha) {
        mensagem.style.color = "#c9184a";
        mensagem.textContent = "Obrigado! Era essa mesma a minha senha! Agora posso assistir SAO de novo... 🍿";
        setTimeout(() => {
            document.getElementById("conteudo-jogo").style.display = "none";
            
            document.getElementById("conteudo-sucesso").style.display = "flex"; 
        }, 2000);
    }
    else {
        senhadigitada.value = "";
        mensagem.style.color = "#d90429";
        mensagem.textContent = "Nannn... ainda não é essa a senha que o esquisito do passado esqueceu... 💔";
        senhadigitada.focus();
    }
}

const senha = senhas[Math.floor(Math.random() * senhas.length)];
const senha_criptografada = criptografar(senha);
senhacriptografada.textContent = senha_criptografada;

senhadigitada.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        verificarSenha();
    }
});

btnAjuda.addEventListener("click", function() {
    containerDica.style.display = "block";
    btnAjuda.style.display = "none";
});

btnAlfabeto.addEventListener("click", function() {
    containerAlfabeto.style.display = "block";
    btnAlfabeto.style.display = "none";
});