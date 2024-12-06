const DOM = {
    frm: document.getElementById("frm"),
    nombreUsuario: document.getElementById("UserName"),
    nombre: document.getElementById("nombre"),
    apellidos: document.getElementById("apellidos"),
    cp: document.getElementById("codigo_postal"),
    tel: document.getElementById("telephone"),
    dniNie: document.getElementById("DniNie"),
    aficionesOutput: document.getElementById("aficiones"),
    passwordInput: document.getElementById("password"),
    showPassCheckbox: document.getElementById("showPasswd"),
    anio: document.getElementById("anio"),
};



// Función Reutilizable para Validar Campos

function validarCampo(campo, mensajeErrorId, customValidationFn = null) {
    const mensajeError = document.getElementById(mensajeErrorId);

    if (customValidationFn) {
        customValidationFn(campo);
    }

    if (campo.validationMessage) {
        campo.classList.add("error");
        campo.classList.remove("valid");
        mensajeError.textContent = campo.validationMessage;
        mensajeError.classList.add("active");
    } else {
        campo.classList.remove("error");
        campo.classList.add("valid");
        mensajeError.textContent = "";
        mensajeError.classList.remove("active");
    }
}




//Validaciones en Tiempo Real

DOM.nombreUsuario.addEventListener("input", () => {
    validarCampo(DOM.nombreUsuario, "errorUserName", (campo) => {
        if (campo.validity.valueMissing) campo.setCustomValidity("Por favor, introduce tu nombre.");
        else if (campo.validity.tooShort) campo.setCustomValidity("Tu nombre debe tener al menos 4 caracteres.");
        else if (campo.validity.tooLong) campo.setCustomValidity("Tu nombre no puede tener más de 20 caracteres.");
        else campo.setCustomValidity("");
    });
});



//Nombre
DOM.nombre.addEventListener("input", () => {
    validarCampo(DOM.nombre, "errorNombre", (campo) => {
        if (campo.validity.valueMissing) campo.setCustomValidity("Por favor, introduce tu nombre.");
        else if (campo.validity.tooShort) campo.setCustomValidity("Tu nombre debe tener al menos 4 caracteres.");
        else if (campo.validity.tooLong) campo.setCustomValidity("Tu nombre no puede tener más de 20 caracteres.");
        else campo.setCustomValidity("");
    });
});


//Apellidos
DOM.apellidos.addEventListener("input", () => {
    validarCampo(DOM.apellidos, "errorApellidos", (campo) => {
        if (campo.validity.valueMissing) campo.setCustomValidity("Por favor, introduce tus apellidos.");
        else if (campo.validity.tooShort) campo.setCustomValidity("Tus apellidos deben tener al menos 4 caracteres.");
        else if (campo.validity.tooLong) campo.setCustomValidity("Tus apellidos no pueden tener más de 50 caracteres.");
        else campo.setCustomValidity("");
    });
});


//Código Postal
DOM.cp.addEventListener("input", () => {
    validarCampo(DOM.cp, "errorCP", (campo) => {
        if (campo.validity.valueMissing) campo.setCustomValidity("Por favor, introduce un código postal.");
        else if (!/^38\d{3}$/.test(campo.value)) campo.setCustomValidity("El código postal debe comenzar con 38 y tener 5 dígitos.");
        else campo.setCustomValidity("");
    });
});


//Contraseña
DOM.passwordInput.addEventListener("input", () => {
    validarCampo(DOM.passwordInput, "errorPasswd", (campo) => {
        if (campo.validity.valueMissing) campo.setCustomValidity("Por favor, introduce una contraseña.");
        else if (!/^\d{8}$/.test(campo.value)) campo.setCustomValidity("La contraseña debe ser un número de 8 dígitos.");
        else campo.setCustomValidity("");
    });
});


//Año
DOM.anio.addEventListener("input", () => {
    validarCampo(DOM.anio, "errorAnio", (campo) => {
        if (campo.validity.valueMissing) campo.setCustomValidity("Por favor, introduce un año.");
        else if (!/^\d{4}$/.test(campo.value)) campo.setCustomValidity("Por favor, introduce un año válido (en formato YYYY).");
        else campo.setCustomValidity("");
    });
});





//Validaciones al Enviar el Formulario

DOM.frm.addEventListener("submit", (e) => {
    validarCampo(DOM.nombreUsuario, "errorUserName");
    validarCampo(DOM.nombre, "errorNombre");
    validarCampo(DOM.apellidos, "errorApellidos");
    validarCampo(DOM.cp, "errorCP");
    validarCampo(DOM.tel, "errorTel");
    validarCampo(DOM.dniNie, "errorDoc");
    validarCampo(DOM.passwordInput, "errorPasswd");
    validarCampo(DOM.anio, "errorAnio");

    if (!DOM.frm.checkValidity()) e.preventDefault();
});







//Mostrar/Ocultar Contraseña
DOM.showPassCheckbox.addEventListener("change", () => {
    DOM.passwordInput.type = DOM.showPassCheckbox.checked ? "text" : "password";
});



//Actualizar Contador de Caracteres
function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    const counter = document.getElementById(`${fieldId}-counter`);
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
}



//Validación de Aficiones
DOM.frm.addEventListener("submit", (event) => {
    const aficiones = [];
    document.querySelectorAll('.Aficiones input[type="checkbox"]').forEach((checkbox) => {
        if (checkbox.checked) aficiones.push(checkbox.id.slice(0, 2).toUpperCase());
    });

    if (aficiones.length < 2) {
        alert("Debes seleccionar al menos 2 aficiones.");
        event.preventDefault();
    } else {
        DOM.aficionesOutput.value = aficiones.join(", ");
    }
});





//validar el dni
function validar(value) {
    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const str = value.toString().toUpperCase(); // Convertimos el valor a mayúsculas

    // Validar formato general para DNI o NIE
    if (!nifRexp.test(str) && !nieRexp.test(str)) {
        return false; // Formato inválido
    }

    // Transformar NIE (X -> 0, Y -> 1, Z -> 2)
    const nie = str
        .replace(/^X/, '0')
        .replace(/^Y/, '1')
        .replace(/^Z/, '2');

    // Obtener la letra calculada
    const letter = str.slice(-1); // Último carácter
    const charIndex = parseInt(nie.slice(0, 8), 10) % 23; // Índice según el número base

    // Comparar la letra calculada con la proporcionada
    return validChars[charIndex] === letter;
}


// Validar DNI/NIE
DOM.frm.addEventListener('submit', function (event) {

    const dniNieInput = document.getElementById('DniNie');
    const dniNieValue = dniNieInput.value.trim(); // Obtener el valor y eliminar espacios

    // Validar el valor del DNI/NIE
    if (!validar(dniNieValue)) {
        alert('El DNI/NIE ingresado no es válido.');
        dniNieInput.focus(); // Enfocar el campo para que el usuario lo corrija
        event.preventDefault(); // Detener el envío del formulario
    }
});




const formulario = document.querySelector('#frm');
const listaMensajes = document.querySelector('#mensajesSistema');

// Función para mostrar los mensajes de validación
function mostrarMensajesDeValidacion() {
    listaMensajes.innerHTML = ''; // Limpiar mensajes previos

    const elementos = formulario.elements;
    for (let elemento of elementos) {
        // Verifica si el elemento es un campo de entrada y si no es válido
        if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA' || elemento.tagName === 'SELECT') {
            if (!elemento.validity.valid) {
                const li = document.createElement('li');
                li.textContent = `${elemento.name || elemento.id}: ${elemento.validationMessage}`;
                listaMensajes.appendChild(li);
            }
        }
    }
}

// Escucha el evento de envío para mostrar los mensajes
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío real del formulario
    mostrarMensajesDeValidacion();

    // Si todo es válido, puedes proceder con el envío
    if (formulario.checkValidity()) {
        alert('Formulario enviado con éxito.');
        formulario.submit(); // Envío del formulario si todo está correcto
    }
});
