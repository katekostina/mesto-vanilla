import './pages/index.css';
import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import {initialPlaces} from './scripts/initialcards.js';


// Global constants
const cardsContainerSelector = '.cards';
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
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

// Profile
const userInfo = new UserInfo('.profile__name', '.profile__caption');

// Creating popup handlers
const imagePopup = new PopupWithImage('#imagepopup');
imagePopup.setEventListeners();

const newPlacePopup = new PopupWithForm(
    '#placepopup', 
    {
        handleSubmit: (evt, { placename, placeurl }) => {
            evt.preventDefault();
            const newCard = new Card(
                placename,
                placeurl,
                cardSelector, 
                () => {
                    imagePopup.open(placename, placeurl);
                });
            cardsSection.addItem(newCard.render());
            newPlacePopup.close();
        },
        clearValidation: () => {
            newPlaceFormValidator.clearValidation();
        }
    }
);
newPlacePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
    '#editprofilepopup',
    {
        handleSubmit: (evt, { profilename, profilecaption }) => {
            evt.preventDefault();
            userInfo.setUserInfo(profilename, profilecaption);
            editProfilePopup.close();
        },
        clearValidation: () => {
            editProfileFormValidator.clearValidation();
        }
    }
);
editProfilePopup.setEventListeners();


// Creating form validators
const newPlaceFormValidator = new FormValidator(validationConfig, placeForm);
newPlaceFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();


// Hanging popups' calls on the buttons
addButton.addEventListener('click', () => { newPlacePopup.open() });
editButton.addEventListener('click', () => { editProfilePopup.open(userInfo.getUserInfo()) });


// Render initial cards
const cardsSection = new Section(
    {
        items: initialPlaces,
        renderer: (item) => {
            const newCard = new Card(
                item.name, 
                item.url, 
                cardSelector, 
                () => {
                    imagePopup.open(item.name, item.url);
                });
            cardsSection.addItem(newCard.render());
        }
    },
    cardsContainerSelector
);
cardsSection.renderItems();

console.log("%c+", 'font-size: 1px; padding: 150px 126px; line-height: 0; background: url("https://www.dropbox.com/s/wlkqq5rtdwjpzqu/meu.jpg?dl=1"); background-size: 252px 300px; color: transparent;');
