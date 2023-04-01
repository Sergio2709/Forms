export function valida(input){
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if (input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput,input);
    }
}

const tipoDeErrores = ["valueMissing","typeMismatch","patternMismatch","customError"]

const mensajesError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener 1 letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    telefono:{
        valueMissing: "El campo telefono no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    direccion:{
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 5 a 20 caracteres"
    },
    ciudad:{
        valueMissing: "El campo telefono no puede estar vacio",
         patternMismatch: "La ciudad debe contener entre 5 a 20 caracteres"
    },
    estado:{
        valueMissing: "El campo telefono no puede estar vacio",
        patternMismatch: "El formato requerido es XXX XXX XXXX"
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajesError[tipoInput][error]);
            mensaje = mensajesError[tipoInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaUsuario = new Date(input.value);
    let mensaje = ""
        if (!MayorDeEdad(fechaUsuario)){
            mensaje = "Debes tener al menos 18 años de edad";
        }
        input.setCustomValidity(mensaje)
}

function MayorDeEdad (fecha) {
    const fechaActual = new Date();
    const diferenciafechas = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(),fecha.getUTCDate());
    return diferenciafechas <= fechaActual;
}