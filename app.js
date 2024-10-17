// app.js

document.addEventListener("DOMContentLoaded", function () {
    const appContainer = document.getElementById("app-container");

    // Función para cargar un módulo en el contenedor principal
    function cargarModulo(modulo) {
        console.log("Intentando cargar módulo: ", modulo); // Para ver si el módulo es accesible
        appContainer.innerHTML = ""; // Limpiar el contenedor
        if (typeof modulo.cargar === 'function') {
            modulo.cargar(appContainer, siguienteModulo);
        } else {
            console.error("El módulo no tiene una función cargar definida.");
        }
    }
    

    // Funciones para la navegación entre módulos
    function siguienteModulo(moduloSiguiente) {
        console.log("Navegando a: ", moduloSiguiente); // Para rastrear la navegación
        switch (moduloSiguiente) {
            case 'personalidad':
                cargarModulo(questionarioCBP);
                break;
            case 'preguntasEstimulo':
                cargarModulo(preguntasEstimulo);
                break;
            case 'tareasCognitivas':
                console.log("Cargando tareasCognitivas...");
                cargarModulo(tareasCognitivas);
                break;
            case 'finalizar':
                // alert("El experimento ha terminado. ¡Gracias por participar!");
                appContainer.innerHTML = `
                                        <h2>Experimento finalizado.</h2>
                                        <p class="pregunta">Las tareas han finalizado. Gracias por participar.</p>
                                        `;
                break;
            default:
                console.log("Cargando cuestionario inicial...");
                cargarModulo(questionarioInicial); // Iniciar con el cuestionario inicial
                break;
        }
    }

    // Iniciar el test con el cuestionario inicial
    cargarModulo(questionarioInicial);
});
