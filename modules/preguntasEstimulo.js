// modules/preguntasEstimulo.js

const preguntasEstimulo = {
    cargar: function (contenedor, mostrarTareas) {
        const estimulos = [
            { nombre: "Música instrumental", archivo: "assets/musica_instrumental.mp3" },
            { nombre: "Música con letra", archivo: "assets/musica_con_letra.mp3" },
            { nombre: "Ruido blanco", archivo: "assets/ruido_blanco.mp3" }
        ];

        const preguntas = [
            "¿Te pareció molesto este estímulo?",
            "¿Te resultó relajante?",
            "¿Sientes que este sonido te ayudaría a concentrarte en una tarea?",
            "¿Te generó ansiedad o incomodidad?"
        ];

        let indiceEstimulo = 0;
        let indicePreguntaEstimulo = 0;
        let respuestasPreguntas = [];
        let audio = new Audio();

        function guardarRespuestasEstimulo(estimulo, respuestas) {
            const respuestasTexto = `Estímulo: ${estimulo}\n` + respuestas.map(([pregunta, respuesta]) => `${pregunta}: ${respuesta}`).join('\n') + '\n\n';
            const blob = new Blob([respuestasTexto], { type: 'text/plain' });
            const enlace = document.createElement('a');
            enlace.href = URL.createObjectURL(blob);
            enlace.download = 'respuestas_estimulos.txt';
            enlace.click();
        }

        function mostrarPreguntasEstimulo() {
            const respuestaAnterior = respuestasPreguntas[indicePreguntaEstimulo] ? respuestasPreguntas[indicePreguntaEstimulo][1] : null;
            contenedor.innerHTML = `
                <h2>Preguntas sobre el estímulo: ${estimulos[indiceEstimulo].nombre}</h2>
                <p class="pregunta">${preguntas[indicePreguntaEstimulo]}</p>
                <form id="form-respuesta">
                    <label><input type="radio" name="respuesta" value="1" ${respuestaAnterior === 1 ? 'checked' : ''}> Muy en desacuerdo</label><br>
                    <label><input type="radio" name="respuesta" value="2" ${respuestaAnterior === 2 ? 'checked' : ''}> En desacuerdo</label><br>
                    <label><input type="radio" name="respuesta" value="3" ${respuestaAnterior === 3 ? 'checked' : ''}> Ni de acuerdo ni en desacuerdo</label><br>
                    <label><input type="radio" name="respuesta" value="4" ${respuestaAnterior === 4 ? 'checked' : ''}> De acuerdo</label><br>
                    <label><input type="radio" name="respuesta" value="5" ${respuestaAnterior === 5 ? 'checked' : ''}> Muy de acuerdo</label><br>
                </form>
                <p id="mensaje-error" style="color: red; display: none;">Debes seleccionar una respuesta.</p>
                <div class="botones-navegacion">
                    <button type="button" id="btn-anterior" ${indicePreguntaEstimulo === 0 ? 'disabled' : ''}>Anterior</button>
                    <button type="button" id="btn-siguiente">Siguiente</button>
                </div>
            `;

            const btnSiguiente = document.getElementById("btn-siguiente");
            const btnAnterior = document.getElementById("btn-anterior");
            const mensajeError = document.getElementById("mensaje-error");

            btnSiguiente.addEventListener("click", () => {
                const form = document.getElementById("form-respuesta");
                const respuesta = parseInt(form.respuesta.value, 10);

                if (!respuesta) {
                    mensajeError.style.display = 'block';
                    return;
                }
                mensajeError.style.display = 'none';

                // Guardar respuesta
                respuestasPreguntas[indicePreguntaEstimulo] = [preguntas[indicePreguntaEstimulo], respuesta];

                if (indicePreguntaEstimulo < preguntas.length - 1) {
                    indicePreguntaEstimulo++;
                    mostrarPreguntasEstimulo();
                } else {
                    // Guardar respuestas del estímulo actual
                    guardarRespuestasEstimulo(estimulos[indiceEstimulo].nombre, respuestasPreguntas);
                    respuestasPreguntas = []; // Reiniciar para el siguiente estímulo
                    indiceEstimulo++;

                    if (indiceEstimulo < estimulos.length) {
                        // Mostrar botón para escuchar el siguiente estímulo
                        mostrarBotonEscucharSiguiente();
                    } else {
                        audio.pause(); // Detener el audio al final
                        mostrarMensajeFinal(); // Mostrar mensaje y botón para comenzar las tareas
                    }
                }
            });

            // Botón anterior
            btnAnterior.addEventListener("click", () => {
                if (indicePreguntaEstimulo > 0) {
                    indicePreguntaEstimulo--;
                    mostrarPreguntasEstimulo();
                }
            });
        }

        function mostrarBotonEscucharSiguiente() {
            contenedor.innerHTML = `
                <h2>Escuchar Siguiente Estímulo</h2>
                <button id="btn-escuchar">Escuchar ${estimulos[indiceEstimulo].nombre}</button>
            `;

            // Pausar audio antes de comenzar un nuevo estímulo
            audio.pause();

            document.getElementById("btn-escuchar").addEventListener("click", () => {
                audio.src = estimulos[indiceEstimulo].archivo;
                audio.play();
                indicePreguntaEstimulo = 0; // Reiniciar preguntas
                respuestasPreguntas = []; // Reiniciar respuestas para el nuevo estímulo
                mostrarPreguntasEstimulo(); // Mostrar las preguntas del siguiente estímulo
            });
        }

        function mostrarMensajeFinal() {
            contenedor.innerHTML = `
                <h2>Estímulos completados</h2>
                <p class="pregunta">Ahora comienzan las tareas cognitivas.</p>
                <button id="btn-escuchar">Comenzar Tareas</button>
            `;

            document.getElementById("btn-escuchar").addEventListener("click", () => {
                mostrarTareas('tareasCognitivas'); // Pasar a tareasCognitivas
            });
        }

        // Botón para comenzar a escuchar el primer estímulo
        mostrarBotonEscucharSiguiente();
    }
};
