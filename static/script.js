let encontrados = 0;
const porquinho = document.getElementById("porquinho")
const contador = document.getElementById("contador")

function moverporquinho() {
    let x = Math.random() * (window.innerWidth - 120);
    let y = Math.random() * (window.innerHeight - 120);

    porquinho.style.left = x + "px";
    porquinho.style.top = y + "px";
};

moverporquinho();

porquinho.addEventListener("click", function(){
    encontrados++;
    contador.textContent = `Encontrados = ${encontrados}/10`;
    if (encontrados >= 10) {
        window.location.href="/porquinho/agradecimento"
    }
    else {
        moverporquinho();
    }
});

moverporquinho();