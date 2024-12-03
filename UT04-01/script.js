//DOM static selector
const DOM = {
    frm:document.getElementById("frm"),
    nombre:document.getElementById("nombre"),
    titulo:document.getElementById("titulo"),
}


// (function(){ 
//     DOM.frm.addEventListener("submit", (e) => {
//         e.preventDefault();  // Usa punto y coma, no coma
//         alert(DOM.titulo.validationMessage);  // Usa punto y coma, no coma
//     })
// })()


//funcion para contar el numero de caracteres de los campos 
function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    const counter = document.getElementById(`${fieldId}-counter`);
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
}



//funcion para mostrar contraseña
//la funcion que se autoejecuta se ve que no permite que esta funcione por eso la comenté 
const checkbox = document.getElementById('showPasswd');
        const passwordInput = document.getElementById('password');

    checkbox.addEventListener('change', () => {
        passwordInput.type = checkbox.checked ? 'text' : 'password';
    });




//funcion para manipular las aficiones que marque el usuario


