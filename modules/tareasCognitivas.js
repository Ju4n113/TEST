const tareasCognitivas = {
    respuestasMemoria: {},
    respuestasStroop: {},
    audio: new Audio(),
    
    cargar: function (contenedor, callback) {
        this.mostrarInstrucciones(contenedor, 1, callback);
    },

    mostrarInstrucciones: function (contenedor, version, callback) {
        if (version > 1) {
            this.audio.pause();
        }

        contenedor.innerHTML = `
            <h2>Instrucciones</h2>
            <p class="pregunta">Se realizará una tarea de memoria y luego un test de Stroop mientras se escucha un estímulo sonoro.</p>
            <button id="btn-iniciar">Comenzar</button>
        `;

        document.getElementById("btn-iniciar").addEventListener("click", () => {
            this.iniciarMusica(version);
            this.mostrarInstruccionesMemoria(contenedor, version, callback);  // Asegurarse de pasar el callback aquí
        });
    },

    mostrarInstruccionesMemoria: function (contenedor, version, callback) {  // Agregar el callback aquí
        contenedor.innerHTML = `
            <h2>Tarea de Memoria (Versión ${version}/3)</h2>
            <p class="pregunta">Memoriza las palabras que aparecerán en la pantalla. Habrá un tiempo limitado para recordar.</p>
            <button id="btn-comenzar-memoria">Comenzar Tarea de Memoria</button>
        `;

        document.getElementById("btn-comenzar-memoria").addEventListener("click", () => {
            this.iniciarTareaMemoria(contenedor, version, callback);  // Pasar el callback
        });
    },

    iniciarMusica: function (version) {
        const estimulos = [
            { nombre: "Música instrumental", archivo: "assets/musica_instrumental.mp3" },
            { nombre: "Música con letra", archivo: "assets/musica_con_letra.mp3" },
            { nombre: "Ruido blanco", archivo: "assets/ruido_blanco.mp3" }
        ];

        this.audio.src = estimulos[version - 1].archivo;
        this.audio.play();
    },

    iniciarTareaMemoria: function (contenedor, version, callback) {  // Pasar el callback
        tareaMemoria.iniciar(contenedor, version, (respuestasMemoria) => {
            this.respuestasMemoria[version] = respuestasMemoria;  // Guardar las respuestas de memoria
            this.mostrarInstruccionesStroop(contenedor, version, callback);  // Pasar el callback aquí también
        });
    },

    mostrarInstruccionesStroop: function (contenedor, version, callback) {  // Asegurarse de incluir el callback
        contenedor.innerHTML = `
            <h2>Tarea de Stroop (Versión ${version}/3)</h2>
            <p class="pregunta">En esta tarea, deberás indicar el color de la fuente en la que aparece cada palabra, no la palabra escrita. Puedes presionar Enter para enviar tu respuesta una vez que hayas escrito el color. ¡Buena suerte!</p>
            <button id="btn-comenzar-stroop">Comenzar Tarea de Stroop</button>
        `;

        document.getElementById("btn-comenzar-stroop").addEventListener("click", () => {
            this.iniciarTareaStroop(contenedor, version, callback);  // Pasar el callback
        });
    },

    iniciarTareaStroop: function (contenedor, version, callback) {
        tareaStroop.iniciar(contenedor, version, (respuestasStroop) => {
            this.respuestasStroop[version] = respuestasStroop;  // Guardar las respuestas de Stroop
            if (version < 3) {
                this.mostrarInstrucciones(contenedor, version + 1, callback);  // Asegurar que el callback se pase
            } else {
                this.audio.pause();
                this.mostrarMensajeFinalizacion(contenedor);  // Mostrar el mensaje de finalización en lugar de alert                if (callback) callback('finalizar');  // Asegurar que el callback esté definido
                this.guardarResultados();  // Guardar resultados al finalizar todas las tareas
            }
        });
    },
    
    mostrarMensajeFinalizacion: function (contenedor) {
        contenedor.innerHTML = `
            <h2>Tareas Completadas</h2>
            <p class="pregunta">Las tareas cognitivas han finalizado. Gracias por participar.</p>
        `;
    },

    guardarResultados: function () {
        const respuestas = {
            memoria: this.respuestasMemoria,
            stroop: this.respuestasStroop
        };

        let contenidoTxt = "Resultados de las tareas cognitivas:\n\n";

        contenidoTxt += "Tarea de Memoria:\n";
        for (const [version, respuestasMemoria] of Object.entries(respuestas.memoria)) {
            contenidoTxt += `Versión ${version}:\n`;
            respuestasMemoria.forEach((respuesta, index) => {
                contenidoTxt += `Palabra ${index + 1}: ${respuesta}\n`;
            });
            contenidoTxt += "\n";
        }

        contenidoTxt += "Tarea de Stroop:\n";
        for (const [version, respuestasStroop] of Object.entries(respuestas.stroop)) {
            contenidoTxt += `Versión ${version}:\n`;
            respuestasStroop.forEach((respuesta, index) => {
                const [palabra, color, respuestaUsuario] = respuesta;
                contenidoTxt += `Palabra ${index + 1}: ${palabra} (Color: ${color}, Respuesta: ${respuestaUsuario})\n`;
            });
            contenidoTxt += "\n";
        }

        const blob = new Blob([contenidoTxt], { type: 'text/plain' });
        const enlaceDescarga = document.createElement('a');
        enlaceDescarga.href = URL.createObjectURL(blob);
        enlaceDescarga.download = 'resultados_tareas_cognitivas.txt';
        enlaceDescarga.click();
    }
};
