let palabras = [
    { pregunta: "¿Cómo me gusta decirte :3?", palabra: "gordito", pista: "g______" },
    { pregunta: "¿Qué me encanta de tus ojos?", palabra: "Lunar", pista: "l____", mensaje: "Me encanta todo de tus ojos radiantes, solo que tu lunar los hace únicos." },
    { pregunta: "¿Te van a rapar👿?", palabra: "no", pista: "n_" },
    { pregunta: "¿Cuál es el mejor país del mundo por razones muy chéveres?", palabra: "irlanda", pista: "i______", mensaje: "Sí o ne mi matete lindo" },
    { pregunta: "Amamos nuestra....", palabra: "quimica", pista: "q______" },
    { pregunta: "Hay que darnos un ....", palabra: "piquito", pista: "p______", mensaje: "Mwwak <3. Btw ignora la tilde" },
    { pregunta: "¿Dónde nos dimos muchos piquitos?", palabra: "bus", pista: "b__" },
    { pregunta: "¿Dónde nos dimos más que piquitos? jjsjsj (escribe todo junto)", palabra: "cuartodejuegos", pista: "c_____________" },
    { pregunta: "¿Cuál es nuestro número favorito? (q meme)", palabra: "seis", pista: "s___" },
    { pregunta: "Seis qué?", palabra: "minutos", pista: "m______", mensaje: "JAJAJAJAA te amo mi vidaaa" }
];

let indicePalabra = 0;
let palabraActual = "";
let palabraOculta = "";
let intentos = 6;

function iniciarJuego() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    intentos = 6;
    indicePalabra = 0;
    cargarPalabra();
}

function mostrarOpcionElegir() {
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-elegir").style.display = "block";
}

function volverInicio() {
    document.getElementById("pantalla-elegir").style.display = "none";
    document.getElementById("pantalla-inicio").style.display = "block";
}

function cargarPalabra() {
    let obj = palabras[indicePalabra];
    palabraActual = obj.palabra.toLowerCase(); // Convertimos a minúscula
    palabraOculta = obj.pista;

    document.getElementById("pregunta").innerText = obj.pregunta;
    document.getElementById("palabra-oculta").innerText = palabraOculta;
    document.getElementById("intentos").innerText = intentos;

    generarTeclado();
}

function generarTeclado() {
    let teclado = document.getElementById("teclado");
    teclado.innerHTML = "";
    
    let letras = "abcdefghijklmnopqrstuvwxyz".split("");
    letras.forEach(letra => {
        let boton = document.createElement("button");
        boton.innerText = letra;
        boton.classList.add("letra");
        boton.onclick = function() { verificarLetra(letra, boton); };
        teclado.appendChild(boton);
    });
}

function verificarLetra(letra, boton) {
    boton.disabled = true;

    let nuevaPalabraOculta = "";
    let acierto = false;

    for (let i = 0; i < palabraActual.length; i++) {
        if (palabraActual[i] === letra || palabraOculta[i] !== "_") {
            nuevaPalabraOculta += palabraActual[i];
        } else {
            nuevaPalabraOculta += "_";
        }
    }

    if (palabraOculta === nuevaPalabraOculta) {
        intentos--;
    }

    palabraOculta = nuevaPalabraOculta;
    document.getElementById("palabra-oculta").innerText = palabraOculta;
    document.getElementById("intentos").innerText = intentos;

    if (palabraOculta === palabraActual) {
        if (palabras[indicePalabra].mensaje) {
            mostrarMensajeEspecial(palabras[indicePalabra].mensaje);
        } else {
            pasarASiguientePalabra();
        }
    } else if (intentos === 0) {
        alert("¡Perdiste! Inténtalo de nuevo.");
        reiniciarJuego();
    }
}

function mostrarMensajeEspecial(mensaje) {
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("mensaje-especial").style.display = "block";
    document.getElementById("mensaje").innerText = mensaje;
}

function continuarJuego() {
    document.getElementById("mensaje-especial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    pasarASiguientePalabra();
}

function pasarASiguientePalabra() {
    indicePalabra++;
    if (indicePalabra < palabras.length) {
        cargarPalabra();
    } else {
        mostrarCarta();
    }
}

function mostrarCarta() {
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("mensaje-especial").style.display = "none";
    document.getElementById("pantalla-carta").style.display = "block"; // AHORA SE MUESTRA BIEN
}

function reiniciarJuego() {
    iniciarJuego();
}
