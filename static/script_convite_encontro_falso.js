const botao_nao = document.getElementById("nao");

function numeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function desviar() {
    const larguraJanela = window.innerWidth;
    const alturaJanela = window.innerHeight;

    const novaEsquerda = numeroAleatorio(10, larguraJanela - 150);
    const novaAltura = numeroAleatorio(10, alturaJanela - 80);

    botao_nao.style.position = "fixed";
    botao_nao.style.left = `${novaEsquerda}px`;
    botao_nao.style.top = `${novaAltura}px`;
}

botao_nao.addEventListener("mouseover", desviar);
botao_nao.addEventListener("touchstart", desviar);
