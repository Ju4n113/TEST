const tareaMemoria = {
    respuestas: {},
    palabrasVersionesMemoria: {
        1: ["gato", "casa", "árbol", "coche", "flor", "libro"],
        2: ["perro", "camino", "montaña", "río", "silla", "planta"], 
        3: ["viento", "playa", "nube", "estrella", "bosque", "cielo"],
    },
// const tareaMemoria = {
//     respuestas: {},
//     palabrasVersionesMemoria: {
//         1: ["gato"],
//         2: ["perro"], 
//         3: ["viento"],
//     },
    iniciar: function (contenedor, version, siguienteFuncion) {
        contenedor.innerHTML = `
            <h2>Tarea Simple ${version}: Memoriza las palabras que aparecerán a continuación.</h2>
            <div id="label-palabra"></div>
            <textarea id="cuadro-respuesta" rows="5" cols="40" style="display: none;" placeholder="Escribe aquí tus respuestas... (Presiona Escape si no recuerdas)"></textarea>
            <button id="btn-enviar" style="display: none;" disabled>Enviar respuestas</button>
            <p id="mensaje-error" style="color: red; display: none;">Por favor, escribe algo antes de continuar.</p>
        `;

        const labelPalabra = document.getElementById("label-palabra");
        const cuadroRespuesta = document.getElementById("cuadro-respuesta");
        const btnEnviar = document.getElementById("btn-enviar");
        const mensajeError = document.getElementById("mensaje-error");

        const mostrarPalabras = () => {
            const palabras = this.palabrasVersionesMemoria[version];
            let index = 0;

            const mostrarPalabra = () => {
                if (index < palabras.length) {
                    labelPalabra.textContent = palabras[index];
                    index++;
                    setTimeout(mostrarPalabra, 2000); // Mostrar la siguiente palabra después de 2 segundos
                } else {
                    labelPalabra.textContent = "Escribe todas las palabras que recuerdes:";
                    cuadroRespuesta.style.display = "block";
                    btnEnviar.style.display = "inline-block";
                    cuadroRespuesta.focus(); // Para que el usuario pueda empezar a escribir
                }
            };

            mostrarPalabra(); // Llamar a la función que inicia la secuencia de palabras
        };

        cuadroRespuesta.addEventListener("input", () => {
            if (cuadroRespuesta.value.trim()) {
                btnEnviar.disabled = false; // Habilitar el botón si hay texto
                mensajeError.style.display = "none"; // Ocultar mensaje de error
            } else {
                btnEnviar.disabled = true; // Deshabilitar el botón si no hay texto
            }
        });

        btnEnviar.addEventListener("click", () => {
            if (cuadroRespuesta.value.trim()) {
                const respuesta = cuadroRespuesta.value.trim().split(" ");
                this.respuestas[version] = respuesta;
                siguienteFuncion(respuesta); // Pasar las respuestas al callback
            } else {
                mensajeError.style.display = "block"; // Mostrar mensaje si no hay respuesta
            }
        });

        // Permitir presionar la tecla Escape solo si no hay texto
        document.addEventListener("keydown", (event) => {
            if (event.code === "Escape") {
                // Solo avanzar si el cuadro está vacío
                if (!cuadroRespuesta.value.trim()) {
                    this.respuestas[version] = [];
                    siguienteFuncion([]); // Pasar una lista vacía si se presiona Escape
                }
            }
        });

        mostrarPalabras(); // Llamar a la función que inicia la secuencia de palabras
    }
};
