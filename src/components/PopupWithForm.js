import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { handleSubmit, clearValidation },
    submitButtonText
  ) {
    super(popupSelector);
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._clearValidation = clearValidation;
    this._handleSubmit = handleSubmit;
    this._submitButtonText = submitButtonText;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  _setInitialValues(initialValues) {
    this._inputList.forEach((input) => {
      if (initialValues[input.name]) {
        input.value = initialValues[input.name];
      }
    });
  }

  open(initialValues, card, cardId) {
    if (initialValues) {
      this._setInitialValues(initialValues);
    }
    this._card = card;
    this._cardId = cardId;
    this._submitButton.textContent = this._submitButtonText;
    super.open();
  }

  setEventListeners() {
    this._submitButton.addEventListener("click", (evt) => {
      this._handleSubmit(evt, this._getInputValues(), this._card, this._cardId);
    });
    super.setEventListeners();
  }

  close() {
    this._inputList.forEach((input) => (input.value = ""));
    this._clearValidation();
    super.close();
  }

  renderLoading(isLoading, message) {
    if (isLoading) {
      this._submitButton.textContent = message;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
