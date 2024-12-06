// -----------------------------------
// 1. Selección de elementos del DOM
// -----------------------------------
const DOM = {
    frm: document.getElementById("frm"),
    nombre: document.getElementById("UserName"),
    cp: document.getElementById("codigo_postal"),
    tel: document.getElementById("telephone"),
    dniNie: document.getElementById("DniNie"),
    aficionesOutput: document.getElementById("aficiones"),
    passwordInput: document.getElementById("password"),
    showPassCheckbox: document.getElementById("showPasswd"),
    anio: document.getElementById("anio"),
};

// -----------------------------------
// 2. Validaciones específicas
// -----------------------------------

// Validar el nombre
function validarNombre() {
    if (!DOM.nombre.validationMessage == "") {
        alert(DOM.nombre.validationMessage);
        DOM.nombre.focus();
        return false;
    }
    return true;
}

// Validar el código postal (debe comenzar con 38)
function validarCodigoPostal() {
    const cpValue = DOM.cp.value.trim();
    if (!/^38\d{3}$/.test(cpValue)) {
        alert("El código postal debe comenzar con 38 y tener 5 dígitos.");
        DOM.cp.focus();
        return false;
    }
    return true;
}

// Validar el teléfono (debe comenzar con +34)
function validarTelefono() {
    const telValue = DOM.tel.value.trim();
    if (!/^\(+34)\d{9}$/.test(telValue)) {
        alert("El número de teléfono debe comenzar con +34 y contener 9 dígitos adicionales.");
        DOM.tel.focus();
        return false;
    }
    return true;
}

// Validar DNI/NIE
function validarDniNie() {
    const dniNieValue = DOM.dniNie.value.trim();
    if (!validar(dniNieValue)) {
        alert("El DNI/NIE ingresado no es válido.");
        DOM.dniNie.focus();
        return false;
    }
    return true;
}

// Validar aficiones (mínimo 2 seleccionadas)
function validarAficiones() {
    const aficionesSeleccionadas = Array.from(
        document.querySelectorAll('.Aficiones input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.id.slice(0, 2).toUpperCase());

    if (aficionesSeleccionadas.length < 2) {
        alert("Debes seleccionar al menos 2 aficiones.");
        return false;
    }
    DOM.aficionesOutput.value = aficionesSeleccionadas.join(", ");
    return true;
}

// -----------------------------------
// 3. Funciones auxiliares
// -----------------------------------

// Validar DNI/NIE según el algoritmo
function validar(value) {
    const validChars = "TRWAGMYFPDXBNJZSQVHLCKET";
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    const str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    const nie = str
        .replace(/^X/, "0")
        .replace(/^Y/, "1")
        .replace(/^Z/, "2");

    const letter = str.slice(-1);
    const charIndex = parseInt(nie.slice(0, 8), 10) % 23;

    return validChars[charIndex] === letter;
}

// Mostrar u ocultar contraseña
DOM.showPassCheckbox.addEventListener("change", () => {
    DOM.passwordInput.type = DOM.showPassCheckbox.checked ? "text" : "password";
});

//funcion para contar el numero de caracteres de los campos 
function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    const counter = document.getElementById(`${fieldId}-counter`);
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
}

// -----------------------------------
// 4. Manejador del envío del formulario
// -----------------------------------
DOM.frm.addEventListener("submit", (e) => {
    // Realizar todas las validaciones
    const validNombre = validarNombre();
    const validCP = validarCodigoPostal();
    const validTel = validarTelefono();
    const validDNI = validarDniNie();
    const validAficiones = validarAficiones();

    // Si alguna validación falla, detener el envío
    if (!validNombre || !validCP || !validTel || !validDNI || !validAficiones) {
        e.preventDefault();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const select = anio;
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1920; year--) {
        let option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    }
});