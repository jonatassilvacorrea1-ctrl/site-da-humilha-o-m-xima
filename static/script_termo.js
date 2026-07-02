const tabuleiro_termo = document.getElementById("tabuleiro_termo");
const mensagem = document.getElementById("mensagem");
const score = document.getElementById("score");
const botao = document.getElementById("botao");
const botao2 = document.getElementById("botao2");
const abscissas  = [];
const linhas = 6;
const colunas = 5;
let linha_atual = 0;
let palavra_correta = palavraCorreta;
palavra_correta = palavra_correta.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
let acertos = 0;

function alterarEstadoLinha(linha, habilitado) {
    for (let u = 0; u < colunas; u++) {
        abscissas[linha][u].readOnly = !habilitado;;
    }
}

function lerPalavraDigitada() {
    const letras = []
    for (let h = 0; h < colunas; h++) {
        const letra_inserida = abscissas[linha_atual][h].value;
        letras.push(letra_inserida);
    }
    const palavra_inserida = letras.join("").toLowerCase();
    return palavra_inserida;
}

function pintarLetras(palavra_correta, linha_atual) {
    const letras_digitadas = [];
    for (let h = 0; h < colunas; h++) {
        const letra_inserida = abscissas[linha_atual][h].value.toLowerCase();
        letras_digitadas.push(letra_inserida);
    }

    palavra_correta = palavra_correta.toLowerCase();
    const letras_corretas = palavra_correta.split("");
    const letras_restantes = palavra_correta.split("");
    const verdes = [false, false, false, false, false];

    for (let n = 0; n < colunas; n++) {
        if (letras_digitadas[n] === letras_corretas[n]) {
            abscissas[linha_atual][n].classList.add("correta");
            abscissas[linha_atual][n].style.setProperty('background-color', '#52b788', 'important');
            letras_restantes[n] = null;
            verdes[n] = true;
        }
    }

    for (let n = 0; n < colunas; n++) {
        if (!verdes[n]) {
            const indice = letras_restantes.indexOf(letras_digitadas[n]);
            if (indice !== -1) {
                abscissas[linha_atual][n].classList.add("deslocada");
                abscissas[linha_atual][n].style.setProperty('background-color', '#fee440', 'important');
                letras_restantes[indice] = null;
            }
            else {
                abscissas[linha_atual][n].classList.add("errada");
                abscissas[linha_atual][n].style.setProperty('background-color', '#bfa3a7', 'important');
            }
        }
    }
}

function acertou() {
    acertos++
    score.textContent = `Score: ${acertos}/5`;
    if (acertos === 5) {
        botao2.style.display = "block";
    }
    mensagem.style.color = "green";
    mensagem.textContent = `Parabéns! A palavra era ${palavra_correta}!`;
    mensagem.style.display = "block";
    botao.style.display = "block"; 
    botao.textContent = "Jogar novamente";
}

function perdeu() {
    mensagem.style.color = "red";
    mensagem.textContent = `Que pena! A palavra era ${palavra_correta}!`;
    mensagem.style.display = "block";
    botao.style.display = "block"; 
    botao.textContent = "Tentar novamente";
}

function verificarResposta() {
    const palavra_digitada = lerPalavraDigitada();
    if (palavra_digitada.length !== 5) {
        mensagem.style.display = "block";
        console.log("mensagem aparece")
        mensagem.textContent = "Apenas palavras com 5 letras são permitidas";
        return
    }

    pintarLetras(palavra_correta, linha_atual);

    if (palavra_correta == palavra_digitada) {
        return acertou();
    }

    else {
        if (linha_atual < linhas - 1) {
            alterarEstadoLinha(linha_atual, false);
            linha_atual++;
            alterarEstadoLinha(linha_atual, true);
            abscissas[linha_atual][0].focus();
        }
        else {
            return perdeu();
        }
    }

}

for (let o = 0; o < linhas; o++) {
    const ordenadas = [];
    const linhadiv = document.createElement("div");
    linhadiv.classList.add("linha");
    for (let i = 0; i < colunas; i++) {
       const letra = document.createElement("input");
       letra.type = "text";
       letra.maxLength = "1";
       letra.addEventListener("keydown", function(evento) {
        if (evento.key === "Enter") {
            verificarResposta();
        }
       })
       letra.addEventListener("input", function(evento) {
        if (evento.inputType === "deleteContentBackward" || evento.inputType === "deleteContentForward") {
            if (i > 0) {
                abscissas[o][i-1].focus();
            }
            mensagem.style.display = "none";
        }
        else if (letra.value !== "") {
            if (i < colunas - 1) {
                abscissas[o][i+1].focus();
            }
            mensagem.style.display = "none";
        }
       })
       letra.classList.add("letra");
       if (o > 0) {
        letra.readOnly = true;
       }
       ordenadas.push(letra);
       linhadiv.appendChild(letra);
    }
    abscissas.push(ordenadas);
    tabuleiro_termo.appendChild(linhadiv);
}

botao.addEventListener("click", function() {
    fetch("/nova-palavra")
    .then(resposta => resposta.json())
    .then(dados => {
        palavra_correta = dados.palavra;
    });
    palavra_correta = palavra_correta.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    mensagem.style.display = "none";
    botao.style.display = "none";
    for (let o = 0; o < linhas; o++) {
        for (let i = 0; i < colunas; i++) {
            abscissas[o][i].value = "";
            abscissas[o][i].classList.remove("correta", "deslocada", "errada");
            abscissas[o][i].style.backgroundColor = "#ffffff";
        }
    }
    alterarEstadoLinha(linha_atual, false)
    linha_atual = 0
    alterarEstadoLinha(linha_atual, true)
    abscissas[0][0].focus();
        
})