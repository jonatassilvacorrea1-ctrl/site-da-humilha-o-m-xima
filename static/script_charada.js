let acertos = 0;
const botao = document.getElementById("butao");
const botao2 = document.getElementById("botao2");
const score = document.getElementById("score");
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
    },
    {
        pergunta: "O que é o que é: tem dentes, mas não morde?",
        resposta: "pente"
    },
    {
        pergunta: "O que é o que é: quanto mais seca, mais molhada fica?",
        resposta: "toalha"
    },
    {
        pergunta: "O que é o que é: anda sem pés e voa sem asas?",
        resposta: "tempo"
    },
    {
        pergunta: "O que é o que é: enche uma casa, mas não ocupa espaço?",
        resposta: "luz"
    },
    {
        pergunta: "O que é o que é: sobe quando a chuva desce?",
        resposta: "guarda chuva"
    },
    {
        pergunta: "O que é o que é: está sempre no chão, mas nunca se suja?",
        resposta: "sombra"
    },
    {
        pergunta: "O que é o que é: tem muitas chaves, mas nenhuma abre porta?",
        resposta: "piano"
    },
    {
        pergunta: "O que é o que é: quanto mais se tira, maior fica?",
        resposta: "buraco"
    },
    {
        pergunta: "O que é o que é: vive correndo, mas nunca sai do lugar?",
        resposta: "relogio"
    },
    {
        pergunta: "O que é o que é: pode passar diante do sol sem fazer sombra?",
        resposta: "vento"
    },
    {
        pergunta: "O que é o que é: é cheio de letras, mas não sabe ler?",
        resposta: "livro"
    },
    {
        pergunta: "O que é o que é: entra na água, mas não se molha?",
        resposta: "reflexo"
    },
    {
        pergunta: "O que é o que é: quanto mais cresce, menos se vê?",
        resposta: "escuridao"
    },
    {
        pergunta: "O que é o que é: pode viajar o mundo inteiro sem sair do canto?",
        resposta: "selo"
    },
    {
        pergunta: "O que é o que é: faz barulho quando passa, mas ninguém consegue pegar?",
        resposta: "vento"
    },
    {
        pergunta: "O que é o que é: nasce grande e morre pequena?",
        resposta: "vela"
    },
    {
        pergunta: "O que é o que é: tem braços, mas não abraça?",
        resposta: "cadeira"
    },
    {
        pergunta: "O que é o que é: está sempre à frente, mas nunca pode ser alcançado?",
        resposta: "futuro"
    },
    {
        pergunta: "Quem construiu uma grande arca para sobreviver ao dilúvio?",
        resposta: "noe"
    },
    {
        pergunta: "Quem derrotou Golias com uma funda?",
        resposta: "davi"
    },
    {
        pergunta: "Quem foi lançado na cova dos leões?",
        resposta: "daniel"
    },
    {
        pergunta: "Quem foi engolido por um grande peixe?",
        resposta: "jonas"
    },
    {
        pergunta: "Qual foi o primeiro homem criado por Deus?",
        resposta: "adao"
    },
    {
        pergunta: "Qual foi a primeira mulher criada por Deus?",
        resposta: "eva"
    },
    {
        pergunta: "Quem abriu o Mar Vermelho?",
        resposta: "moises"
    },
    {
        pergunta: "Qual era o nome do gigante derrotado por Davi?",
        resposta: "golias"
    },
    {
        pergunta: "Em qual cidade Jesus nasceu?",
        resposta: "belem"
    },
    {
        pergunta: "Quem batizou Jesus?",
        resposta: "joao"
    },
    {
        pergunta: "Quem traiu Jesus por 30 moedas de prata?",
        resposta: "judas"
    },
    {
        pergunta: "Qual discípulo andou sobre as águas com Jesus?",
        resposta: "pedro"
    },
    {
        pergunta: "Qual era o nome da mãe de Jesus?",
        resposta: "maria"
    },
    {
        pergunta: "Quem sonhou com vacas gordas e vacas magras?",
        resposta: "farao"
    },
    {
        pergunta: "Quem interpretou esse sonho?",
        resposta: "jose"
    },
    {
        pergunta: "Qual discípulo duvidou da ressurreição até ver Jesus?",
        resposta: "tome"
    },
    {
        pergunta: "Qual era o nome do jardim onde Adão e Eva viviam?",
        resposta: "eden"
    },
    {
        pergunta: "Qual o último livro da Bíblia?",
        resposta: "apocalipse"
    },
    {
        pergunta: "Quem escreveu a maior parte das cartas do Novo Testamento?",
        resposta: "paulo"
    },
    {
        pergunta: "Quem ficou conhecido por sua grande sabedoria?",
        resposta: "salomao"
    },
    {
        pergunta: "O que é o que é: quanto mais trabalha, mais magro fica?",
        resposta: "lapis"
    },
    {
        pergunta: "O que é o que é: sempre chega, mas nunca chega de verdade?",
        resposta: "amanha"
    },
    {
        pergunta: "O que é o que é: tem boca, mas não fala?",
        resposta: "forno"
    },
    {
        pergunta: "O que é o que é: vive no céu, mas nunca vai para a igreja?",
        resposta: "nuvem"
    },
    {
        pergunta: "O que é o que é: quanto mais quente, mais fresco parece?",
        resposta: "sorvete"
    },
    {
        pergunta: "O que é o que é: todo mundo quebra antes de usar?",
        resposta: "ovo"
    },
    {
        pergunta: "O que é o que é: pode ser contado, mas nunca termina?",
        resposta: "numeros"
    }
]

let atual = Math.floor(Math.random() * charadas.length);

function mostrarcharada() {
    pergunta.textContent = charadas[atual].pergunta;
};

function verificarresposta() {
    let texto_resposta = resposta.value.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (texto_resposta == charadas[atual].resposta) {
        acertos++
        score.textContent = `Score: ${acertos}/5`
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
    atual = Math.floor(Math.random() * charadas.length);
    if (acertos == 5) {
        botao2.style.display = "block";
    }
    resposta.value = "";
    mensagem.textContent = "";
    resposta.style.display = "block";
    pergunta.style.display = "block";
    resposta.focus();   
    botao.style.display = "none";
    
    mostrarcharada();

});