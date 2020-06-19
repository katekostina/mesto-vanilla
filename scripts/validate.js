const hasInvalidInput = (inputsList) => {
    return inputsList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputsList, submitButton) => {
    submitButton.disabled = hasInvalidInput(inputsList);
};

const showInputError = (form, input, validationMessage, config) => {
    const errorText = form.querySelector(`#${input.id}-error-text`);
    input.classList.add(config.inputErrorClass);
    errorText.textContent = validationMessage;
    errorText.classList.add(config.errorClass);
};

const hideInputError = (form, input, config) => {
    const errorText = form.querySelector(`#${input.id}-error-text`);
    input.classList.remove(config.inputErrorClass);
    errorText.textContent = '';
    errorText.classList.remove(config.errorClass);
};

const checkInputValidity = (form, input, config) => {
    if (!input.validity.valid) {
        showInputError(form, input, input.validationMessage, config);
    } else {
        hideInputError(form, input, config);
    }
};

const setFormEventListeners = (form, config) => {
    const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    toggleButtonState(inputsList, submitButton);
    inputsList.forEach((input) => {
        input.addEventListener('input', function () {
          checkInputValidity(form, input, config);
          toggleButtonState(inputsList, submitButton);
        });
      });
};

const enableFormsValidation = (config) => {
    const formsList = Array.from(document.querySelectorAll(config.formSelector));
    formsList.forEach((form) => {
        form.addEventListener('submit', function (evt) {
          evt.preventDefault();
        });
        setFormEventListeners(form, config);
      });
};

const clearFormValidation = (popup, config) => {
    const form = popup.querySelector(config.formSelector);
    const submitButton = form.querySelector(config.submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    toggleButtonState(inputList, submitButton);
    inputList.forEach((input) => {
        hideInputError(form, input, config);
    })
}
