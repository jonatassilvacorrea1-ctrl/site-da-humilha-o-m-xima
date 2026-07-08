let encontrados = 0;
const porquinho = document.getElementById("porquinho");
const contador = document.getElementById("contador");

function moverporquinho() {
    let larguraLimite = window.innerWidth - 100;
    let alturaLimite = window.innerHeight - 100;

    let x = Math.random() * larguraLimite;
    let y = Math.random() * alturaLimite;

    if (y < 140) {
        y += 130; 
    }

    porquinho.style.left = x + "px";
    porquinho.style.top = y + "px";
    
    let angulo = (Math.random() * 40) - 20;
    porquinho.style.transform = `rotate(${angulo}deg)`;
}

porquinho.addEventListener("click", function() {
    encontrados++;
    console.log(`${encontrados}/10`)
    contador.textContent = `Encontrados: ${encontrados}/10`;
    
    porquinho.style.transform = "scale(0.5)";

    if (encontrados >= 10) {
        window.location.href = "/porquinho/agradecimento";
    } else {
        setTimeout(moverporquinho, 100);
    }
});

moverporquinho();
