let encontrados = 0;
const porquinho = document.getElementById("porquinho");
const contador = document.getElementById("contador");

function moverporquinho() {
    // Define limites para o porquinho não sumir pelas bordas da tela
    let larguraLimite = window.innerWidth - 100;
    let alturaLimite = window.innerHeight - 100;

    let x = Math.random() * larguraLimite;
    let y = Math.random() * alturaLimite;

    // Evita que o porquinho apareça grudado demais no topo (atrás do placar flutuante)
    if (y < 140) {
        y += 130; 
    }

    porquinho.style.left = x + "px";
    porquinho.style.top = y + "px";
    
    // Adiciona uma rotaçãozinha aleatória charmosa para o porquinho parecer confuso
    let angulo = (Math.random() * 40) - 20; // Entre -20deg e 20deg
    porquinho.style.transform = `rotate(${angulo}deg)`;
}

porquinho.addEventListener("click", function() {
    encontrados++;
    contador.textContent = `Encontrados: ${encontrados}/10`;
    
    // Pequeno efeito visual de clique
    porquinho.style.transform = "scale(0.5)";

    if (encontrados >= 10) {
        window.location.href = "/porquinho/agradecimento";
    } else {
        // Um timer curtinho para dar tempo da animação do clique acontecer antes de mover
        setTimeout(moverporquinho, 100);
    }
});

// Inicializa a primeira posição
moverporquinho();