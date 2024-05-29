document.addEventListener("DOMContentLoaded", function() {
    // Captura de selectores
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const generalQueryInput = document.getElementById("generalQuery");
    const supportQueryInput = document.getElementById("supportQuery");
    const messageInput = document.getElementById("message");
    const consentCheckbox = document.getElementById("consent");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const radioError = document.getElementById("radioError");
    const consentError = document.getElementById("consentError");
    const radioInputs = document.querySelectorAll("input[type='radio']");

    // Expresiones regulares para validar campos
    const nameLastNameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para validar un campo
    function validateField(input, regex, errorMessage) {
        const value = input.value.trim();
        if (value === "") {
            input.classList.add("error-border");
            input.nextElementSibling.textContent = "El campo es requerido";
            return false;
        } else if (!regex.test(value)) {
            input.classList.add("error-border");
            input.nextElementSibling.textContent = errorMessage;
            return false;
        } else {
            input.classList.remove("error-border");
            input.nextElementSibling.textContent = "";
            return true;
        }
    }

    // Validación en eventos "blur" para cada campo de entrada
    [nameInput, lastNameInput, emailInput, messageInput].forEach(function(input) {
        input.addEventListener("blur", function() {
            const regex = input === emailInput ? emailRegex : nameLastNameRegex;
            const errorMessage = input === emailInput ? "El email no es válido 💀" : "El nombre no es válido 💀";
            validateField(input, regex, errorMessage);
        });
    });

    // Mensaje para campos de tipo radio
    radioInputs.forEach(function(radio) {
        radio.addEventListener("change", function() {
            if (generalQueryInput.checked || supportQueryInput.checked) {
                radioError.textContent = "";
            } else {
                radioError.textContent = "Debes seleccionar al menos una opción";
            }
        });
    });

    // Mensaje para el checkbox de consentimiento
    consentCheckbox.addEventListener("change", function() {
        if (consentCheckbox.checked) {
            consentError.textContent = "";
        } else {
            consentError.textContent = "Debes aceptar el consentimiento para ser contactado por el equipo";
        }
    });

    // Validación del formulario al enviar
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Validar cada campo del formulario
        const isNameValid = validateField(nameInput, nameLastNameRegex, "El nombre no es válido 💀");
        const isLastNameValid = validateField(lastNameInput, nameLastNameRegex, "El apellido no es válido 💀");
        const isEmailValid = validateField(emailInput, emailRegex, "El email no es válido 💀");
        const isMessageValid = validateField(messageInput, /.+/, "");
        const isQueryValid = generalQueryInput.checked || supportQueryInput.checked;
        const isConsentValid = consentCheckbox.checked;

        if (isNameValid && isLastNameValid && isEmailValid && isMessageValid && isQueryValid && isConsentValid) {
            // Si todos los campos son válidos, mostrar mensaje de confirmación y enviar el formulario
            confirmationMessage.textContent = "El mensaje fue enviado";
            form.reset();
        }
    });
});
