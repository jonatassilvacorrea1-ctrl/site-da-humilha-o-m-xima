alert("Senhorita, só avisando que tem coisa depois de três vitórias (tem coisa também depois de acertar cinco charadas). Mas só to falando neh.")

const tabuleiro_da_velha = document.getElementById("tabuleiro_da_velha");
const turno = document.getElementById("turno");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("botao");
const botao2 = document.getElementById("botao2");
const score = document.getElementById("score");
const abscissas = [];
let preenchidas = 0;
let vitorias = Number(localStorage.getItem("vitorias")) || 0;
let turno_jogador = true;
let casas_preenchidas = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

localStorage.setItem("vitorias", vitorias)
score.textContent = `Score: ${vitorias}/3`
if (vitorias == 3) {
    botao2.style.display = "block";
}

function marcarX(linha, coluna) {
    const x = document.createElement("img");
    x.src = "/static/images/x.png";
    x.classList.add("simbolo");
    abscissas[linha][coluna].appendChild(x);
    casas_preenchidas[linha][coluna] = "X";
    preenchidas++;
}

function tentarGanhar() {
    for (let l = 0; l < 3; l++) {
        for (let j = 0; j < 3; j++) {
            if (!casas_preenchidas[l][j]) {
                casas_preenchidas[l][j] = "X";
                if (temVitoria("X")) {
                    casas_preenchidas[l][j] = "";
                    marcarX(l, j);
                    return true;
                }
                casas_preenchidas[l][j] = "";
            }
        }
    }
    return false;
}

function tentarBloquear() {
    for (let l = 0; l < 3; l++) {
        for (let j = 0; j < 3; j++) {
            if (!casas_preenchidas[l][j]) {
                casas_preenchidas[l][j] = "O";
                if (temVitoria("O")) {
                    casas_preenchidas[l][j] = "";
                    marcarX(l, j);
                    return true;
                }
                casas_preenchidas[l][j] = "";
            }
        }
    }
    return false;
}

function jogadaAleatoria() {
    while (true) {
        const linha_maquinha = Math.floor(Math.random() * 3)
        const coluna_maquina = Math.floor(Math.random() * 3)
        if (!casas_preenchidas[linha_maquinha][coluna_maquina]) {
            marcarX(linha_maquinha, coluna_maquina)
            break
        }
    }
}

function jogadaMaquina() {
    if (vitorias >= 2) {
        if (tentarGanhar()) {
            return;
        }
    }

    if (vitorias >= 1) {
        if (tentarBloquear()) {
            return;
        }
    }

    jogadaAleatoria()
}


function perdeu(){
    mensagem.textContent = "Que pena, parece que você perdeu.";
    botao.style.display = "block";
}

function ganhou() {
    vitorias++;
    localStorage.setItem("vitorias", vitorias)
    score.textContent = `Score: ${vitorias}/3`
    if (vitorias == 3) {
        botao2.style.display = "block";
    }
    mensagem.textContent = "Que incrível, você ganhou!";
    botao.style.display = "block";
}

function temVitoria(simbolo){
    for (let m = 0; m < 3; m++) {
        if (casas_preenchidas[m][0] === simbolo && casas_preenchidas[m][0] === casas_preenchidas[m][1] && casas_preenchidas[m][1] === casas_preenchidas[m][2]){
            return true;
        }
    }

    for (let m = 0; m < 3; m++) {
        if (casas_preenchidas[0][m] === simbolo && casas_preenchidas[0][m] === casas_preenchidas[1][m] && casas_preenchidas[1][m] === casas_preenchidas[2][m]) {
            return true;
        }
    }

    if (casas_preenchidas[0][2] === simbolo && casas_preenchidas[0][2] === casas_preenchidas[1][1] && casas_preenchidas[1][1] === casas_preenchidas[2][0]) {
        return true;
    }

    if (casas_preenchidas[0][0] === simbolo && casas_preenchidas[0][0] === casas_preenchidas[1][1] && casas_preenchidas[1][1] === casas_preenchidas[2][2]) {
        return true;
    }

    return false;
}

function verificarVitoria() {
    for (let m = 0; m < 3; m++) {
        if (casas_preenchidas[m][0] !== "" && casas_preenchidas[m][0] === casas_preenchidas[m][1] && casas_preenchidas[m][1] === casas_preenchidas[m][2]){
            if (casas_preenchidas[m][0] == "X") {
                perdeu();
                return true;
            }
            else if (casas_preenchidas[m][0] == "O") {
                ganhou();
                return true;
            }
        }
    }

    for (let m = 0; m < 3; m++) {
        if (casas_preenchidas[0][m] !== "" && casas_preenchidas[0][m] === casas_preenchidas[1][m] && casas_preenchidas[1][m] === casas_preenchidas[2][m]) {
            if (casas_preenchidas[0][m] == "X") {
                perdeu();
                return true;
            }
            else if (casas_preenchidas[0][m] == "O") {
                ganhou()
                return true;
            }
        }
    }

    if (casas_preenchidas[0][2] !== "" && casas_preenchidas[0][2] === casas_preenchidas[1][1] && casas_preenchidas[1][1] === casas_preenchidas[2][0]) {
        if (casas_preenchidas[0][2] == "X") {
            perdeu();
            return true;
        }
        else if (casas_preenchidas[0][2] == "O") {
            ganhou()
            return true;
        }
    }

    if (casas_preenchidas[0][0] !== "" && casas_preenchidas[0][0] === casas_preenchidas[1][1] && casas_preenchidas[1][1] === casas_preenchidas[2][2]) {
        if (casas_preenchidas[0][0] == "X") {
            perdeu();
            return true;
        }
        else if (casas_preenchidas[0][0] == "O") {
            ganhou()
            return true;
        }
    }
    

    if (preenchidas === 9) {
        mensagem.textContent = "Eita, empatou";
        botao.style.display = "block";
        return true;
    }

    return false;
}

function aoClicar(linha, coluna) {
    
    if (casas_preenchidas[linha][coluna]) {
        return;
    }

    if (!turno_jogador) {
        return;
    }

    const circulo = document.createElement("img");
    circulo.src = "/static/images/circulo.png";
    circulo.classList.add("simbolo");
    abscissas[linha][coluna].appendChild(circulo);
    casas_preenchidas[linha][coluna] = "O";
    preenchidas++;

    if (verificarVitoria()) {
        return;
    }

    turno_jogador = false;
    turno.textContent = "Turno da máquina";

    setTimeout(() => {
        jogadaMaquina();
        if (verificarVitoria()) {
            return;
        }

        turno_jogador = true;
        turno.textContent = "Seu turno";
    }, 3000)
}

for (let o = 0; o < 3; o++) {
    const ordenadas = [];
    for (let i = 0; i < 3; i++) {
        const quadrado = document.createElement("div");
        quadrado.classList.add("quadrado");
        quadrado.addEventListener("click", function() {
            aoClicar(o, i);
        })
        ordenadas.push(quadrado);
        tabuleiro_da_velha.appendChild(quadrado);
    }
    abscissas.push(ordenadas);
}

botao.addEventListener("click", function() {
    botao.style.display = "none";
    mensagem.textContent = "";
    turno.textContent = "Seu turno";
    turno_jogador = true;

    for (let o = 0; o < 3; o++) {
        for (let i = 0; i < 3; i++) {
            abscissas[o][i].innerHTML = "";
            casas_preenchidas[o][i] = "";
        }
    }

    preenchidas = 0
})