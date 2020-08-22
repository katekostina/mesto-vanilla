import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialPlaces} from '../utils/initialcards.js';


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
const imagePopup = new PopupWithImage('#imagepopup', '.popup__image', '.popup__caption');
imagePopup.setEventListeners();

// Function that creates new card
const createCard = (name, url) => {
    const newCard = new Card(
        name,
        url,
        cardSelector,
        (cardname, cardurl) => {
            imagePopup.open(cardname, cardurl);
        }  
    );
    cardsSection.addItem(newCard.render());
};


const newPlacePopup = new PopupWithForm(
    '#placepopup', 
    {
        handleSubmit: (evt, { placename, placeurl }) => {
            evt.preventDefault();
            createCard(placename, placeurl);
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
            createCard(item.name, item.url);
        }
    },
    cardsContainerSelector
);
cardsSection.renderItems();

console.log("%c+", 'font-size: 1px; padding: 150px 126px; line-height: 0; background: url("https://www.dropbox.com/s/wlkqq5rtdwjpzqu/meu.jpg?dl=1"); background-size: 252px 300px; color: transparent;');
