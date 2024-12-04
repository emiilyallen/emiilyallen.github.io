//DOM static selector
const DOM = {
    frm:document.getElementById("frm"),
    nombre:document.getElementById("UserName"),
    cp:document.getElementById("codigo_postal"),
    tel:document.getElementById("telephone"),
    // titulo:document.getElementById("titulo"),
}

//-------------------------------------------------MENSAJES DE ALERTA PARA LOS CAMPOS------------------------------------------------------------------



//esto hace que salga un mensaje de alerta que indica que hay que rellenar los campos
DOM.frm.addEventListener("submit", (e) => {
    if(!DOM.nombre.validationMessage == ""){
        e.preventDefault();
        alert(DOM.nombre.validationMessage);  
    }    
})


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


//funcion para contar el numero de caracteres de los campos 
function updateCounter(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    const counter = document.getElementById(`${fieldId}-counter`);
    const currentLength = field.value.length;
    counter.textContent = `${currentLength} / ${maxLength}`;
}



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

