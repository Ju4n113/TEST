// const tareaStroop = {
//     respuestas: {},
//     colores: ["red", "blue", "green", "yellow"],
//     palabrasVersionesStroop: {
//         1: ["rojo", "azul", "verde", "amarillo"],
//         2: ["rojo", "azul", "verde", "amarillo"],
//         3: ["rojo", "azul", "verde", "amarillo"]
//     },

//     iniciar: function (contenedor, version, siguienteFuncion) {
//         // Inicializar respuestas si no existe para esta versión
//         if (!this.respuestas[version]) {
//             this.respuestas[version] = [];
//         }
        
//         contenedor.innerHTML = `
//             <h2>Tarea Stroop: Di el color de la fuente, no la palabra escrita.</h2>
//             <div id="label-palabra-stroop"></div>
//             <input type="text" id="input-respuesta" placeholder="Escribe tu respuesta..." style="display: none;"/>
//             <button id="btn-enviar" style="display: none;">Enviar</button>
//         `;

//         const labelPalabra = document.getElementById("label-palabra-stroop");
//         const inputRespuesta = document.getElementById("input-respuesta");
//         const btnEnviar = document.getElementById("btn-enviar");
//         let tiempoRestante = 30; // 30 segundos

//         // Temporizador para finalizar la tarea
//         const temporizador = setInterval(() => {
//             if (tiempoRestante <= 0) {
//                 clearInterval(temporizador);
//                 siguienteFuncion(this.respuestas[version]); // Pasar las respuestas al callback
//             } else {
//                 tiempoRestante -= 1;
//             }
//         }, 1000); // Actualizar cada segundo

//         const mostrarPalabrasStroop = () => {
//             const palabras = this.palabrasVersionesStroop[version];

//             const mostrarPalabra = () => {
//                 if (tiempoRestante <= 0) return; // No mostrar más palabras si el tiempo se ha acabado

//                 const palabra = palabras[Math.floor(Math.random() * palabras.length)];
//                 const color = this.colores[Math.floor(Math.random() * this.colores.length)];

//                 labelPalabra.textContent = palabra;
//                 labelPalabra.style.color = color;

//                 // Mostrar la palabra por 1.5 segundos
//                 setTimeout(() => {
//                     labelPalabra.textContent = ''; // Ocultar la palabra
//                     inputRespuesta.style.display = 'block'; // Mostrar el campo de respuesta
//                     btnEnviar.style.display = 'inline-block'; // Mostrar el botón enviar
//                     inputRespuesta.focus(); // Enfocar el campo de respuesta

//                     // Limpiar eventos anteriores para evitar duplicados
//                     inputRespuesta.removeEventListener('keydown', this.handleEnter);
//                     btnEnviar.removeEventListener('click', this.handleClick);

//                     // Definir la función para manejar el evento Enter
//                     this.handleEnter = (event) => {
//                         if (event.key === 'Enter') {
//                             this.enviarRespuesta(version, palabra, color, inputRespuesta.value, mostrarPalabra);
//                             inputRespuesta.value = ''; // Limpiar el campo
//                         }
//                     };

//                     // Definir la función para manejar el evento click
//                     this.handleClick = () => {
//                         this.enviarRespuesta(version, palabra, color, inputRespuesta.value, mostrarPalabra);
//                         inputRespuesta.value = ''; // Limpiar el campo
//                     };

//                     // Añadir eventos de nuevo
//                     inputRespuesta.addEventListener('keydown', this.handleEnter);
//                     btnEnviar.addEventListener('click', this.handleClick);
//                 }, 1000); // Mostrar la palabra por 1 segundos
//             };

//             mostrarPalabra(); // Llamar a la función para mostrar la palabra
//         };

//         mostrarPalabrasStroop(); // Iniciar el proceso
//     },

//     enviarRespuesta: function (version, palabra, color, respuesta, mostrarPalabra) {
//         if (respuesta.trim()) { // Asegurarse de que la respuesta no esté vacía
//             this.respuestas[version].push([palabra, color, respuesta]); // Guardar la respuesta
//         }
        
//         const inputRespuesta = document.getElementById("input-respuesta");
//         const btnEnviar = document.getElementById("btn-enviar");
        
//         // Ocultar el campo de respuesta y el botón
//         inputRespuesta.style.display = 'none';
//         btnEnviar.style.display = 'none';

//         mostrarPalabra(); // Mostrar la siguiente palabra
//     }
// };


const tareaStroop = {
    respuestas: {},
    colores: ["red", "blue", "green", "yellow"],
    palabrasVersionesStroop: {
        1: ["rojo", "azul", "verde", "amarillo"],
        2: ["rojo", "azul", "verde", "amarillo"],
        3: ["rojo", "azul", "verde", "amarillo"]
    },

    iniciar: function (contenedor, version, siguienteFuncion) {
        if (!this.respuestas[version]) {
            this.respuestas[version] = [];
        }

        contenedor.innerHTML = `
            <h2>Tarea Stroop: Di el color de la fuente, no la palabra escrita.</h2>
            <div id="label-palabra-stroop"></div>
            <input type="text" id="input-respuesta" placeholder="Escribe tu respuesta..." style="display: none;"/>
            <button id="btn-enviar" style="display: none;">Enviar</button>
            <p id="timer">Tiempo restante: 30</p>
        `;

        const labelPalabra = document.getElementById("label-palabra-stroop");
        const inputRespuesta = document.getElementById("input-respuesta");
        const btnEnviar = document.getElementById("btn-enviar");
        const timerElement = document.getElementById("timer");

        let tiempoRestante = 30; // 30 segundos

        // Temporizador
        const temporizador = setInterval(() => {
            tiempoRestante -= 1;
            timerElement.textContent = `Tiempo restante: ${tiempoRestante}`;
            if (tiempoRestante <= 0) {
                clearInterval(temporizador);
                inputRespuesta.style.display = 'none';
                btnEnviar.style.display = 'none';
                siguienteFuncion(this.respuestas[version]);
            }
        }, 1000);

        // Función para mostrar palabras
        const mostrarPalabrasStroop = () => {
            const palabras = this.palabrasVersionesStroop[version];

            const mostrarPalabra = () => {
                if (tiempoRestante <= 0) return; // Detener si se acaba el tiempo

                const palabra = palabras[Math.floor(Math.random() * palabras.length)];
                const color = this.colores[Math.floor(Math.random() * this.colores.length)];

                labelPalabra.textContent = palabra;
                labelPalabra.style.color = color;

                setTimeout(() => {
                    labelPalabra.textContent = ''; // Ocultar palabra después de 1.5 segundos
                    inputRespuesta.style.display = 'block';
                    btnEnviar.style.display = 'inline-block';
                    inputRespuesta.focus(); // Poner foco en el input

                    inputRespuesta.removeEventListener('keydown', this.handleEnter);
                    btnEnviar.removeEventListener('click', this.handleClick);

                    // Evento para enviar por "Enter"
                    this.handleEnter = (event) => {
                        if (event.key === 'Enter') {
                            this.enviarRespuesta(version, palabra, color, inputRespuesta.value, mostrarPalabra);
                        }
                    };

                    // Evento para enviar por botón
                    this.handleClick = () => {
                        this.enviarRespuesta(version, palabra, color, inputRespuesta.value, mostrarPalabra);
                    };

                    inputRespuesta.addEventListener('keydown', this.handleEnter);
                    btnEnviar.addEventListener('click', this.handleClick);
                }, 1500); // Mostrar la palabra por 1.5 segundos
            };

            mostrarPalabra(); // Mostrar la primera palabra
        };

        mostrarPalabrasStroop(); // Iniciar
    },

    enviarRespuesta: function (version, palabra, color, respuesta, mostrarPalabra) {
        if (respuesta.trim()) {
            this.respuestas[version].push([palabra, color, respuesta.trim()]); // Guardar la respuesta
        }

        const inputRespuesta = document.getElementById("input-respuesta");
        const btnEnviar = document.getElementById("btn-enviar");

        inputRespuesta.style.display = 'none';
        btnEnviar.style.display = 'none';
        inputRespuesta.value = ''; // Limpiar el campo de texto

        mostrarPalabra(); // Mostrar la siguiente palabra
    }
};
