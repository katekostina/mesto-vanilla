import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialPlaces} from './initialcards.js';

// Global constants
const cardsContainer = document.querySelector('.cards');
const cardSelector = '#card-template';
const editProfileForm = document.querySelector('#editprofilepopup .popup__form');
const placeForm = document.querySelector('#placepopup .popup__form');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error-text_shown'
};

// Creating form validators
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const placeFormValidator = new FormValidator(validationConfig, placeForm);
editProfileFormValidator.enableValidation();
placeFormValidator.enableValidation();


// Handle image popup
const imagePopup = document.querySelector('#imagepopup');
const imagePopupImage = document.querySelector('#imagepopupimage');
const imagePopupCaption = document.querySelector('#imagepopupcaption');
const closeImageButton = document.querySelector('#closeimagebutton');
const imagePopupOverlay = imagePopup.querySelector('.image-popup__overlay');

// Escape listener
const closeImagePopupOnEscape = (event) => {
    if (event.code === 'Escape') {
        toggleImagePopup();
    }
};

// Open/close image popup
export function toggleImagePopup(placeName, placeUrl) {
    if (imagePopup.classList.contains('image-popup_shown')) {
        imagePopup.classList.remove('image-popup_shown');
        document.removeEventListener('keydown', closeImagePopupOnEscape);
        return;
    }

    // Clear popup before opening
    imagePopupImage.src = '';
    imagePopupImage.alt = '';
    imagePopupCaption.textContent = '';

    imagePopup.classList.add('image-popup_shown');
    imagePopupImage.src = placeUrl;
    imagePopupImage.alt = placeName;
    imagePopupCaption.textContent = placeName;
    document.addEventListener('keydown', closeImagePopupOnEscape);
}

closeImageButton.addEventListener('click', toggleImagePopup);
imagePopupOverlay.addEventListener('click', toggleImagePopup);

// Handle edit profile popup
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const editPopup = document.querySelector('#editprofilepopup');
const closeEditButton = document.querySelector('#closeeditbutton');
const saveEditButton = document.querySelector('#saveeditbutton');
const nameInput = document.querySelector('#profilename');
const captionInput = document.querySelector('#profilecaption');
const editPopupOverlay = editPopup.querySelector('.popup__overlay');

const closeEditPopupOnEscape = (event) => {
    if (event.code === 'Escape') {
        toggleEditPopup();
    }
};

function toggleEditPopup() {
    if (editPopup.classList.contains('popup_shown')) {
        editPopup.classList.remove('popup_shown');
        document.removeEventListener('keydown', closeEditPopupOnEscape);
        return;
    } 
    editPopup.classList.add('popup_shown');
    nameInput.value = profileName.textContent;
    captionInput.value = profileCaption.textContent;
    editProfileFormValidator.clearValidation();
    document.addEventListener('keydown', closeEditPopupOnEscape);
}

function saveEdited(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    toggleEditPopup();
}

editButton.addEventListener('click', toggleEditPopup);
closeEditButton.addEventListener('click', toggleEditPopup);
editPopupOverlay.addEventListener('click', toggleEditPopup);
saveEditButton.addEventListener('click', saveEdited);


// Handle popup that adds place card
const placePopup = document.querySelector('#placepopup');
const addButton = document.querySelector('.profile__add-button');
const closePlaceButton = document.querySelector('#closeplacebutton');
const savePlaceButton = document.querySelector('#saveplacebutton');
const placeNameInput = document.querySelector('#placename');
const placeUrlInput = document.querySelector('#placeurl');
const placePopupOverlay = placePopup.querySelector('.popup__overlay');

const closePlacePopupOnEscape = (event) => {
    if (event.code === 'Escape') {
        togglePlacePopup();
    }
};

function togglePlacePopup() {
    if (placePopup.classList.contains('popup_shown')) {
        placePopup.classList.remove('popup_shown');
        document.removeEventListener('keydown', closePlacePopupOnEscape);
        return;
    }
    placePopup.classList.add('popup_shown');
    placeNameInput.value = '';
    placeUrlInput.value = '';
    placeFormValidator.clearValidation();
    document.addEventListener('keydown', closePlacePopupOnEscape);
}

function createPlaceCard(event) {
    event.preventDefault();
    const newCard = new Card(placeNameInput.value, placeUrlInput.value, cardSelector);
    cardsContainer.prepend(newCard.render());
    togglePlacePopup();
}

addButton.addEventListener('click', togglePlacePopup);
closePlaceButton.addEventListener('click', togglePlacePopup);
placePopupOverlay.addEventListener('click', togglePlacePopup);
savePlaceButton.addEventListener('click', createPlaceCard);

console.log("%c+", 'font-size: 1px; padding: 150px 126px; line-height: 0; background: url("https://www.dropbox.com/s/wlkqq5rtdwjpzqu/meu.jpg?dl=1"); background-size: 252px 300px; color: transparent;');


// Render initial cards
initialPlaces.forEach(function (place) {
    const newCard = new Card(place.name, place.url, cardSelector);
    cardsContainer.prepend(newCard.render());
});
