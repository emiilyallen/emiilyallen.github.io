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
// Función reutilizable para validar campos
// -----------------------------------
function validarCampo(campo, mensajeErrorId, customValidationFn = null) {
    const mensajeError = document.getElementById(mensajeErrorId);

    // Aplicar una validación personalizada, si existe
    if (customValidationFn) {
        customValidationFn(campo);
    }

    // Usar validationMessage para gestionar el estado
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

// // Teléfono
// DOM.tel.addEventListener("input", () => {
//     validarCampo(DOM.tel, "errorTel", (campo) => {
//         if (campo.validity.valueMissing) {
//             campo.setCustomValidity("Por favor, introduce un número de teléfono.");
//         } else if (!/^(\+34)?\d{9}$/.test(campo.value)) {
//             campo.setCustomValidity(
//                 "El número de teléfono debe ser un número válido con o sin el prefijo +34."
//             );
//         } else {
//             campo.setCustomValidity("");
//         }
//     });
// });


// // DNI/NIE
// DOM.dniNie.addEventListener("input", () => {
//     validarCampo(DOM.dniNie, "errorDoc", (campo) => {
//         if (campo.validity.valueMissing) {
//             campo.setCustomValidity("Por favor, introduce un número de identificación.");
//         } else if (!/^[XYZ]?\d{7}[A-Z]$/.test(campo.value)) {
//             campo.setCustomValidity("El DNI/NIE ingresado no es válido.");
//         } else {
//             campo.setCustomValidity("");
//         }
//     });
// });



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
    validarCampo(DOM.nombreUsuario, "errorUserName");    
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

















//-------------------------------------------------MENSAJES DE ALERTA PARA LOS CAMPOS------------------------------------------------------------------

// Selección de los campos
const inputs = document.querySelectorAll('input');

// Función para manejar los estilos de validación de los campos
function handleInputValidation() {
    inputs.forEach(input => {
        // Si el campo es válido, se le pone la clase 'valid'
        if (input.validity.valid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            // Si el campo es inválido, se le pone la clase 'invalid'
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    });
}



    
// // Evento de envío del formulario
// //esto hace que salga un mensaje de alerta que indica que hay que rellenar los campos
// DOM.frm.addEventListener("submit", (e) => {

//     // Evitar el envío si hay errores
//     e.preventDefault();

//     // Aplicar la validación visual a los inputs
//     handleInputValidation();

//     // Validar si el formulario es completamente válido
//     if (form.checkValidity()) {
//         // Si es válido, enviamos el formulario
//         form.submit();
//     }
// });








//ESTO ES PARA QUE ME MUESTRE EL MENSAJE DE ERROR DEL CODIGO POSTAL (SI NO EMPIEZA POR 38, ME SALE EL MENSAJE Y NO SE ENVÍA)

DOM.frm.addEventListener("submit", (e) => {
    if(!DOM.cp.validationMessage == ""){
        e.preventDefault();
        alert(DOM.cp.validationMessage);  
    }    
})








//ESTO ES PARA QUE ME MUESTRE EL MENSAJE DE ERROR DEL NUMERO DE TELEFONO (SI NO EMPIEZA POR (+34), ME SALE EL MENSAJE Y NO SE ENVÍA)
DOM.frm.addEventListener("submit", (e) => {
    if(!DOM.tel.validationMessage == ""){
        e.preventDefault();
        alert(DOM.tel.validationMessage);  
    }    
})















// //funcion para mostrar contraseña
const checkbox = document.getElementById('showPasswd');
        const passwordInput = document.getElementById('password');

    checkbox.addEventListener('change', () => {
        passwordInput.type = checkbox.checked ? 'text' : 'password';
    });













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
    

















// -------------------------------------------------
//              Validaciones específicas
// -------------------------------------------------

// Validación del Nombre de Usuario
if (!DOM.nombreUsuario.validity.valid) {
    document.getElementById('errorUserName').textContent = DOM.nombreUsuario.validationMessage;
}

// Validación del Nombre
if (!DOM.nombre.validity.valid) {
    document.getElementById('errorNombre').textContent = DOM.nombre.validationMessage;
}

// Validación del Código Postal
if (!DOM.cp.validity.valid) {
    document.getElementById('errorCP').textContent = DOM.cp.validationMessage;
}

// Validación de Apellidos
if (!DOM.apellidos.validity.valid) {
    document.getElementById('errorApellidos').textContent = DOM.apellidos.validationMessage;
}

// Validación del Teléfono
if (!DOM.tel.validity.valid) {
    document.getElementById('errorTel').textContent = DOM.tel.validationMessage;
}

// Validación de la Contraseña
if (!DOM.passwordInput.validity.valid) {
    document.getElementById('errorPasswd').textContent = DOM.passwordInput.validationMessage;
}

// Validación del DNI/NIE
if (!DOM.dniNie.validity.valid) {
    document.getElementById('errorDoc').textContent = DOM.dniNie.validationMessage;
}

// Validación del Año
if (!DOM.anio.validity.valid) {
    document.getElementById('errorAnio').textContent = DOM.anio.validationMessage;
}

























// Validación de Nombre de Usuario
// if (!DOM.nombreUsuario.validity.valid) {
//     if (DOM.nombreUsuario.validity.valueMissing) {
//         document.getElementById('errorUserName').textContent = 'Por favor, introduce un nombre de usuario.';
//     } else if (DOM.nombreUsuario.validity.tooShort) {
//         document.getElementById('errorUserName').textContent = 'El nombre de usuario debe tener al menos 4 caracteres.';
//     } else if (DOM.nombreUsuario.validity.tooLong) {
//         document.getElementById('errorUserName').textContent = 'El nombre de usuario no puede tener más de 20 caracteres.';
//     }
// }

// // Validación del Nombre
// if (!DOM.nombre.validity.valid) {
//     if (DOM.nombre.validity.valueMissing) {
//         document.getElementById('errorNombre').textContent = 'Por favor, introduce tu nombre.';
//     } else if (DOM.nombre.validity.tooShort) {
//         document.getElementById('errorNombre').textContent = 'Tu nombre debe tener al menos 4 caracteres.';
//     } else if (DOM.nombre.validity.tooLong) {
//         document.getElementById('errorNombre').textContent = 'Tu nombre no puede tener más de 20 caracteres.';
//     }
// }

// // Validación del Código Postal
// if (!DOM.cp.validity.valid) {
//     if (DOM.cp.validity.valueMissing) {
//         document.getElementById('errorCP').textContent = 'Por favor, introduce un código postal.';
//     } else if (DOM.cp.validity.tooShort) {
//         document.getElementById('errorCP').textContent = 'El código postal debe tener al menos 5 caracteres.';
//     } else if (DOM.cp.validity.tooLong) {
//         document.getElementById('errorCP').textContent = 'El código postal no puede tener más de 5 caracteres.';
//     }
// }

// // Validación de Apellidos
// if (!DOM.apellidos.validity.valid) {
//     if (DOM.apellidos.validity.valueMissing) {
//         document.getElementById('errorApellidos').textContent = 'Por favor, introduce tus apellidos.';
//     } else if (DOM.apellidos.validity.tooShort) {
//         document.getElementById('errorApellidos').textContent = 'Tus apellidos deben tener al menos 4 caracteres.';
//     } else if (DOM.apellidos.validity.tooLong) {
//         document.getElementById('errorApellidos').textContent = 'Tus apellidos no pueden tener más de 50 caracteres.';
//     }
// }

// // Validación del Teléfono
// if (!DOM.tel.validity.valid) {
//     if (DOM.tel.validity.valueMissing) {
//         document.getElementById('errorTel').textContent = 'Por favor, introduce un número de teléfono.';
//     } else if (DOM.tel.validity.patternMismatch) {
//         document.getElementById('errorTel').textContent = 'El número de teléfono debe comenzar con +34 y contener 9 dígitos adicionales.';
//     }
// }

// // Validación de la Contraseña
// if (!DOM.passwordInput.validity.valid) {
//     if (DOM.passwordInput.validity.valueMissing) {
//         document.getElementById('errorPasswd').textContent = 'Por favor, introduce una contraseña.';
//     } else if (DOM.passwordInput.validity.tooShort) {
//         document.getElementById('errorPasswd').textContent = 'La contraseña debe tener exactamente 8 caracteres.';
//     } else if (DOM.passwordInput.validity.patternMismatch) {
//         document.getElementById('errorPasswd').textContent = 'La contraseña debe ser un número de 8 dígitos.';
//     }
// }

// // Validación del DNI/NIE
// if (!DOM.dniNie.validity.valid) {
//     if (DOM.dniNie.validity.valueMissing) {
//         document.getElementById('errorDoc').textContent = 'Por favor, introduce un número de identificación.';
//     } else if (DOM.dniNie.validity.patternMismatch) {
//         document.getElementById('errorDoc').textContent = 'El DNI/NIE ingresado no es válido.';
//     }
// }

// // Validación del Año
// if (!DOM.anio.validity.valid) {
//     if (DOM.anio.validity.valueMissing) {
//         document.getElementById('errorAnio').textContent = 'Por favor, introduce un año.';
//     } else if (DOM.anio.validity.patternMismatch) {
//         document.getElementById('errorAnio').textContent = 'Por favor, introduce un año válido (en formato YYYY).';
//     }
// }





//funcion para contar el numero de caracteres de los campos 
function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    const counter = document.getElementById(`${fieldId}-counter`);
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
}


DOM.frm.addEventListener('submit', function (event) {





    // Validar aficiones
    const aficiones = [];
    document.querySelectorAll('.Aficiones input[type="checkbox"]').forEach((checkbox) => {
        if (checkbox.checked) {
            aficiones.push(checkbox.id.slice(0, 2).toUpperCase());
        }
    });

    if (aficiones.length < 2) {
        alert('Debes seleccionar al menos 2 aficiones.');
        event.preventDefault();
    } else {
        document.getElementById('aficiones').value = aficiones.join(', ');
    }
















    // Validar DNI/NIE
    const dniNieInput = document.getElementById('DniNie');
    const dniNieValue = dniNieInput.value.trim(); // Obtener el valor y eliminar espacios

    // Validar el valor del DNI/NIE
    if (!validar(dniNieValue)) {
        alert('El DNI/NIE ingresado no es válido.');
        dniNieInput.focus(); // Enfocar el campo para que el usuario lo corrija
        event.preventDefault(); // Detener el envío del formulario
    }
});








































// //funcion para manipular las aficiones que marque el usuario



// //calcular el resto del DNI
// function ejercicio(){

//     let dividiendo = document.getElementById("DniNie").value;
//     const divisor = 23;

//     let resto = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
//     resto ['T',]


//     if ( dividiendo / divisor == letra){
//         document.querySelector("#resultado").innerHTML="No se puede realizar la division";
//     }

//     while(dividiendo >= divisor){ //<- Aquí hay que comparar con divisor, no con 0, para evitar restos negativos
//         contador++;
//         dividiendo -= divisor;
//     }

//     document.querySelector("#resultado").innerHTML= "El cociente de la division es "+contador+" y el resto es "+dividiendo;
// }

