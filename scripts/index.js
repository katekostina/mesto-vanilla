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


// Pop-ups' shared functions >>>
const closePopupOnEsc = (event) => {
    const popupOpened = document.querySelector('.popup_shown');
    if (event.code === 'Escape') {
        closePopup(popupOpened);
    }
}

const closePopup = (popup) => {
    popup.classList.remove('popup_shown');
    document.removeEventListener('keydown', closePopupOnEsc);
}

const openPopup = (popup) => {
    popup.classList.add('popup_shown');
    document.addEventListener('keydown', closePopupOnEsc);
}
// <<< 


// Handle image popup
const imagePopup = document.querySelector('#imagepopup');
const imagePopupImage = document.querySelector('#imagepopupimage');
const imagePopupCaption = document.querySelector('#imagepopupcaption');
const closeImageButton = document.querySelector('#closeimagebutton');
const imagePopupOverlay = imagePopup.querySelector('.popup__overlay');

// Open/close image popup
export function openImagePopup(placeName, placeUrl) {
    // Clear popup before opening
    imagePopupImage.src = '';
    imagePopupImage.alt = '';
    imagePopupCaption.textContent = '';

    
    imagePopupImage.src = placeUrl;
    imagePopupImage.alt = placeName;
    imagePopupCaption.textContent = placeName;
    openPopup(imagePopup);
}

closeImageButton.addEventListener('click', () => {closePopup(imagePopup)});
imagePopupOverlay.addEventListener('click', () => {closePopup(imagePopup)});

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

function openEditPopup() {
    nameInput.value = profileName.textContent;
    captionInput.value = profileCaption.textContent;
    editProfileFormValidator.clearValidation();
    openPopup(editPopup);
}

function saveEdited(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    closePopup(editPopup);
}

editButton.addEventListener('click', openEditPopup);
closeEditButton.addEventListener('click', () => {closePopup(editPopup)});
editPopupOverlay.addEventListener('click', () => {closePopup(editPopup)});
saveEditButton.addEventListener('click', saveEdited);


// Handle popup that adds place card
const placePopup = document.querySelector('#placepopup');
const addButton = document.querySelector('.profile__add-button');
const closePlaceButton = document.querySelector('#closeplacebutton');
const savePlaceButton = document.querySelector('#saveplacebutton');
const placeNameInput = document.querySelector('#placename');
const placeUrlInput = document.querySelector('#placeurl');
const placePopupOverlay = placePopup.querySelector('.popup__overlay');

function openPlacePopup() {
    placeNameInput.value = '';
    placeUrlInput.value = '';
    placeFormValidator.clearValidation();
    openPopup(placePopup);
}

function createPlaceCard(event) {
    event.preventDefault();
    const newCard = new Card(placeNameInput.value, placeUrlInput.value, cardSelector);
    cardsContainer.prepend(newCard.render());
    closePopup(placePopup);
}

addButton.addEventListener('click', openPlacePopup);
closePlaceButton.addEventListener('click', () => {closePopup(placePopup)});
placePopupOverlay.addEventListener('click', () => {closePopup(placePopup)});
savePlaceButton.addEventListener('click', createPlaceCard);

// Render initial cards
initialPlaces.forEach(function (place) {
    const newCard = new Card(place.name, place.url, cardSelector);
    cardsContainer.prepend(newCard.render());
});

console.log("%c+", 'font-size: 1px; padding: 150px 126px; line-height: 0; background: url("https://www.dropbox.com/s/wlkqq5rtdwjpzqu/meu.jpg?dl=1"); background-size: 252px 300px; color: transparent;');
