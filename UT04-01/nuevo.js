const DOM = {
    frm: document.getElementById("frm"),
    nombreUsuario: document.getElementById("UserName"),
    nombre: document.getElementById("nombre"),
    apellidos: document.getElementById("apellidos"),
    cp: document.getElementById("codigo_postal"),
    tel: document.getElementById("telephone"),
    dniNie: document.getElementById("DniNie"),
    aficiones: document.getElementById("aficiones"),
    passwordInput: document.getElementById("password"),
    showPassCheckbox: document.getElementById("showPasswd"),
    anio: document.getElementById("anio"),
    validationMessages: document.getElementById('mensajesSistema'),
    titulo: document.getElementById('titulo'),
    descripcion: document.getElementById('descripcion'),
    checkboxes: document.querySelectorAll('.Aficiones input[type="checkbox"]'),
    tipoDocumento: document.getElementById('TipoDocumento'),
    inputs: document.querySelectorAll('input, select, textarea'),


}


//-------------------------------------------------------------
//              FUNCIONES ENCAPSULADAS 
//------------------------------------------------------------


// Funcion encapsulada para mostrar/ocultar contraseña
const mostrarPassword = () => {
    DOM.passwordInput.type = DOM.showPassCheckbox.checked ? "text" : "password";
};



// Funcion encapsulada para contar los caracteres de los campos titulo y descrpcion
//Actualizar Contador de Caracteres
const actualizarCaracteres = (fieldId, maxLength) => {
    const field = document.getElementById(fieldId);
    const counter = document.getElementById(`${fieldId}-counter`);
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
};



// Funcion encapsulada para actualizar las aficiones
const actualizarAficiones = () => {
    const AficionesSeleccionadas = Array.from(DOM.checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id.slice(0, 2).toUpperCase());

    DOM.aficiones.value = AficionesSeleccionadas.join(', ');
    DOM.aficiones.setCustomValidity(
        AficionesSeleccionadas.length >= 2
            ? '' // Correcto
            : 'Debes seleccionar al menos dos aficiones.'
    );
};





// Funcion encapsulada para validar el dni/nie
const validarDniNie = (value) => {
    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const str = value.toString().toUpperCase(); //Convertimos el valor a mayúsculas

    // Validar el formato con las expresiones regulares
    if (nifRexp.test(str)) {

        // Es un DNI
        const numero = str.slice(0, 8);
        const letra = str.slice(-1);
        const index = parseInt(numero) % 23;
        return validChars[index] === letra; // Validar la letra


    } else if (nieRexp.test(str)) {

        // Es un NIE
        // Transformar NIE (X -> 0, Y -> 1, Z -> 2)
        const nie = str
            .replace(/^X/, '0')
            .replace(/^Y/, '1')
            .replace(/^Z/, '2');

        const numero = nie.slice(0, 8); // Primeros 8 dígitos
        const letra = nie.slice(-1); // Última letra
        const index = parseInt(numero, 10) % 23;
        return validChars[index] === letra; // Validar la letra
    }

    // Si no es un DNI ni un NIE válido
    return false;
};










//
const updateValidationMessages = () => {
    updateAficiones(); // Validar aficiones primero

    DOM.validationMessages.innerHTML = ''; // Limpiar mensajes
    DOM.inputs.forEach(element => {
        if (element.name) {
            element.checkValidity(); // Verificar la validez del elemento
            const li = document.createElement('li');
            li.textContent = element.validationMessage
                ? `${element.name}: ${element.validationMessage}` // Mostrar mensaje de error
                : `${element.name}: Correcto`; // Mostrar mensaje de éxito
            DOM.validationMessages.appendChild(li);
        }
    });
};













//-------------------------------------------------------------
//            USO DE LAS FUNCIONES ENCAPSULADAS  
//------------------------------------------------------------

// Inicializar el formulario
document.addEventListener('DOMContentLoaded', () => {


    //Mostrar/Ocultar Contraseña
    DOM.showPassCheckbox.addEventListener('change', mostrarPassword);





    //actualizar los caracteres titulo y descrpcion 
    DOM.titulo.addEventListener('input', () => actualizarCaracteres('titulo', 15));
    DOM.descripcion.addEventListener('input', () => actualizarCaracteres('descripcion', 120));




    // Escuchar cambios en las casillas de verificación
    DOM.checkboxes.forEach(checkbox =>
        checkbox.addEventListener('change', updateValidationMessages)
    );



    //actualizar formulario
    DOM.frm.addEventListener('submit', (event) => {
        actualizarAficiones(); // Validar las aficiones



        const dniNieInput = document.getElementById('DniNie');
        const dniNieValue = dniNieInput.value.trim(); // Obtener el valor y eliminar espacios

        // Validar el valor del DNI/NIE
        if (!validarDniNie(dniNieValue)) {
            alert('Tu puta madre');
            event.preventDefault(); // Detener el envío del formulario
            return; // Terminar el flujo para evitar continuar con la validación general
        }



        // Verificar la validez general del formulario
        if (!DOM.frm.checkValidity()) {
            alert('Hola');
            event.preventDefault(); // Evitar envío si hay errores
            updateValidationMessages(); // Mostrar mensajes
        }

    });

    // Escuchar eventos de entrada para validar

    DOM.frm.addEventListener('input', updateValidationMessages);
});


