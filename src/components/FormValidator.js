export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputsList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(input) {
    const errorText = this._form.querySelector(`#${input.id}-error-text`);
    input.classList.add(this._inputErrorClass);
    errorText.textContent = input.validationMessage;
    errorText.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorText = this._form.querySelector(`#${input.id}-error-text`);
    input.classList.remove(this._inputErrorClass);
    errorText.textContent = "";
    errorText.classList.remove(this._errorClass);
  }

  _hideAllErrors() {
    this._inputsList.forEach((input) => {
      this._hideInputError(input);
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    this._submitButton.disabled = this._hasInvalidInput(this._inputsList);
  }

  _setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._inputsList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }

  clearValidation() {
    this._toggleButtonState();
    this._hideAllErrors();
  }
}
