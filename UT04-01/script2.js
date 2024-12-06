//DOM static selector
const DOM = {
    frm: document.getElementById("frm"),
    nombreUsuario: document.getElementById("UserName"),
    nombre:document.getElementById("nombre"),
    apellidos:document.getElementById("apellidos"),
    cp: document.getElementById("codigo_postal"),
    tel: document.getElementById("telephone"),
    dniNie: document.getElementById("DniNie"),
    aficionesOutput: document.getElementById("aficiones"),
    passwordInput: document.getElementById("password"),
    showPassCheckbox: document.getElementById("showPasswd"),
    anio: document.getElementById("anio"),
};

// -----------------------------------
// 3. Validación en tiempo real para cada campo
// -----------------------------------

DOM.nombreUsuario.addEventListener("input", () => {
    validarCampo(DOM.nombreUsuario, "errorUserName", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce tu nombre.");
        } else if (campo.validity.tooShort) {
            campo.setCustomValidity("Tu nombre debe tener al menos 4 caracteres.");
        } else if (campo.validity.tooLong) {
            campo.setCustomValidity("Tu nombre no puede tener más de 20 caracteres.");
        } else {
            campo.setCustomValidity("");
        }
    });
});



// Nombre
DOM.nombre.addEventListener("input", () => {
    validarCampo(DOM.nombre, "errorNombre", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce tu nombre.");
        } else if (campo.validity.tooShort) {
            campo.setCustomValidity("Tu nombre debe tener al menos 4 caracteres.");
        } else if (campo.validity.tooLong) {
            campo.setCustomValidity("Tu nombre no puede tener más de 20 caracteres.");
        } else {
            campo.setCustomValidity("");
        }
    });
});

// Apellidos
DOM.apellidos.addEventListener("input", () => {
    validarCampo(DOM.apellidos, "errorApellidos", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce tus apellidos.");
        } else if (campo.validity.tooShort) {
            campo.setCustomValidity("Tus apellidos deben tener al menos 4 caracteres.");
        } else if (campo.validity.tooLong) {
            campo.setCustomValidity("Tus apellidos no pueden tener más de 50 caracteres.");
        } else {
            campo.setCustomValidity("");
        }
    });
});

// Código Postal
DOM.cp.addEventListener("input", () => {
    validarCampo(DOM.cp, "errorCP", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce un código postal.");
        } else if (!/^38\d{3}$/.test(campo.value)) {
            campo.setCustomValidity("El código postal debe comenzar con 38 y tener 5 dígitos.");
        } else {
            campo.setCustomValidity("");
        }
    });
});

// Teléfono
DOM.tel.addEventListener("input", () => {
    validarCampo(DOM.tel, "errorTel", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce un número de teléfono.");
        } else if (!/^\+34\d{9}$/.test(campo.value)) {
            campo.setCustomValidity("El número de teléfono debe comenzar con +34 y contener 9 dígitos adicionales.");
        } else {
            campo.setCustomValidity("");
        }
    });
});

// DNI/NIE
DOM.dniNie.addEventListener("input", () => {
    validarCampo(DOM.dniNie, "errorDoc", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce un número de identificación.");
        } else if (!/^[XYZ]?\d{7}[A-Z]$/.test(campo.value)) {
            campo.setCustomValidity("El DNI/NIE ingresado no es válido.");
        } else {
            campo.setCustomValidity("");
        }
    });
});

// Contraseña
DOM.passwordInput.addEventListener("input", () => {
    validarCampo(DOM.passwordInput, "errorPasswd", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce una contraseña.");
        } else if (!/^\d{8}$/.test(campo.value)) {
            campo.setCustomValidity("La contraseña debe ser un número de 8 dígitos.");
        } else {
            campo.setCustomValidity("");
        }
    });
});

// Año
DOM.anio.addEventListener("input", () => {
    validarCampo(DOM.anio, "errorAnio", (campo) => {
        if (campo.validity.valueMissing) {
            campo.setCustomValidity("Por favor, introduce un año.");
        } else if (!/^\d{4}$/.test(campo.value)) {
            campo.setCustomValidity("Por favor, introduce un año válido (en formato YYYY).");
        } else {
            campo.setCustomValidity("");
        }
    });
});

// -----------------------------------
// 4. Validación al enviar el formulario
// -----------------------------------
DOM.frm.addEventListener("submit", (e) => {
    // Validar todos los campos al enviar el formulario
    validarCampo(DOM.nombre, "errorNombre");
    validarCampo(DOM.apellidos, "errorApellidos");
    validarCampo(DOM.cp, "errorCP");
    validarCampo(DOM.tel, "errorTel");
    validarCampo(DOM.dniNie, "errorDoc");
    validarCampo(DOM.passwordInput, "errorPasswd");
    validarCampo(DOM.anio, "errorAnio");

    // Si algún campo tiene error, prevenir el envío
    if (!DOM.frm.checkValidity()) {
        e.preventDefault();
    }
});
