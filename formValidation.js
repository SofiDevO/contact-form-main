document.addEventListener("DOMContentLoaded", ()=>{
    const d = document;
    const form = d.getElementById("contactForm");
    const nameInput = d.getElementById("name");
    const lastNameInput = d.getElementById("lastName");
    const emailInput = d.getElementById("email");
    const generalQueryInput = d.getElementById("generalQuery");
    const supportQueryInput = d.getElementById("supportQuery");
    const messageInput = d.getElementById("message");
    const confirmationMessage = d.getElementById("successModal")
    const radioInputs = d.querySelectorAll("input[type='radio']");
    const radioError = d.getElementById("radioError");
    const consentCheckbox = d.getElementById("consent");
    const consentError = d.getElementById("consentError");

    // Expresiones regulares(REGEX)
    const nameLastNameRegex = /^[A-Za-z-áéíóúÁÉÍÓÚñÑüÜ\s]/; //solo acepta letras en español y espacios
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Formato para email

    //Función para validar  los inputs
    function validateField(input, regex, errorMessage){
        const value = input.value.trim(); //Es para quitarle los espacios del inicio y del final
        if(value === ""){
            input.classList.add(".error-border");
            input.classList.remove(".success-border");
            input.nextElementSibling.textContent="Este campo es requerido";
            return false;
        }else if(!regex.test(value)){
            input.classList.add(".error-border");
            input.classList.remove(".success-border");
            input.nextElementSibling.textContent = errorMessage;
            return false;
        }else{
            input.classList.remove(".error-border");
            input.classList.add(".success-border");
            input.nextElementSibling.textContent = "";
            return true;
        }
    }

// Función para detectar cuando se salió del input sin llenarlo(Evento Blur)
function handlerBlur(input, regex, errorMessage) {
    input.addEventListener("blur", ()=>{
        validateField(input, regex, errorMessage);
    })
}
handlerBlur(nameInput,nameLastNameRegex,"El nombre no es valido 🥹" );
handlerBlur(lastNameInput,nameLastNameRegex,"El apellido no es valido🥹" );
handlerBlur(emailInput,emailRegex,"Este no es un email  valido🥹" );
handlerBlur(messageInput, /.+/ ,"El mensaje no puede estar vacío 😡" );

// Validar los checkboxes
    radioInputs.forEach((radio)=>{
        radio.addEventListener("change", ()=>{
            if(generalQueryInput.checked || supportQueryInput.checked){
                radioError.textContent = "" ;
            }
        })
    })

    //Validar si el usuario aceptó el consentiemiento (checkbox )
    consentCheckbox.addEventListener("change",()=>{
        if(consentCheckbox.checked){
            consentError.textContent = "" ;
        }
    })

    //función para el evento submit
        form.addEventListener("submit", (e)=>{
            e.preventDefault();

            const isNameValid =  validateField(nameInput,nameLastNameRegex,"El nombre no es valido 🥹" );
            const isLastNameValid = validateField(lastNameInput,nameLastNameRegex,"El apellido no es valido 🥹" );
            const isEmailValid = validateField(emailInput,emailRegex,"El email no es valido 🥹" );
            const isMessageValid = validateField(messageInput,/.+/,"El mensaje es requerido 🥹" );
            const isQueryValid =  generalQueryInput.checked || supportQueryInput.checked;
            const isConsentValid = consentCheckbox.checked;

            // condicion para mostrar errores en submit
            if(!isQueryValid){
                radioError.textContent = "Debes seleccionar al menos una opción";
            }else{
                radioError.textContent = "";
            }
            if(!isConsentValid){
                consentError.textContent = "Debes aceptar el consentimiento para ser contactado por soporte";
            }else{
                consentError.textContent = "";
            }

            if(isNameValid && isLastNameValid && isEmailValid && isMessageValid && isQueryValid && isConsentValid){
                form.reset();
                confirmationMessage.showModal();
                setTimeout(() => {
                    confirmationMessage.close();
                }, "7000");
            }
        })


})