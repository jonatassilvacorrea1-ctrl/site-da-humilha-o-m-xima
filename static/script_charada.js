let atual = 0;
const botao = document.getElementById("butao");
const pergunta = document.getElementById("charada");
const resposta = document.getElementById("resposta");
const mensagem = document.getElementById("mensagem");
const mensagens = [
    "Parabéns, Lafaiette!",
    "Eita, acertou. Mas tambem, essa tava fácil.",
    "Da próxima vez eu coloco uma mais difícil.",
    "Até que tu é boa nesse negócio de advinhação.",
    "Uhul, certou!"
]

const charadas = [
    {
        pergunta: "O que é o que é: cai em pé e corre deitado?",
        resposta: "chuva"
    }
]

function mostrarcharada() {
    pergunta.textContent = charadas[atual].pergunta;
};

function verificarresposta() {
    let texto_resposta = resposta.value.toLowerCase().trim();

    if (texto_resposta == charadas[atual].resposta) {
        mensagem.textContent = mensagens[Math.floor(Math.random() * mensagens.length)];
        pergunta.style.display = "none";
        resposta.style.display = "none";
        botao.style.display = "block";
    }
    else {
        resposta.value = "";
        mensagem.textContent = "Resposta errada, tente de novo.";
        resposta.focus();
    }
};

mostrarcharada();

resposta.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        verificarresposta();
    }
});

botao.addEventListener("click", function () {
    atual++;
    if (atual == charadas.length) {
        window.location.href = "/charada/charada";
        return;
    }
    resposta.value = "";
    mensagem.textContent = "";
    resposta.style.display = "block";
    pergunta.style.display = "block";
    resposta.focus();   
    botao.style.display = "none";
    
    mostrarcharada();

});