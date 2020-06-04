// https://www.dropbox.com/s/llz5f262xcqr5vd/yalta.jpg?dl=1
// Render initial cards
const cardsContainer = document.querySelector('.cards');
const initialPlaces = [
    {
        name: 'Алтай',
        link: 'https://www.dropbox.com/s/00pzwwq9rpezzin/altai.jpg?dl=1'
    },
    {
        name: 'Байкал',
        link: 'https://www.dropbox.com/s/asvpi3wqpsnodro/baikal.jpg?dl=1'
    },
    {
        name: 'Мурманск',
        link: 'https://www.dropbox.com/s/2ewzcc0s03xjfyp/murmansk.jpg?dl=1'
    },
    {
        name: 'Архыз',
        link: 'https://www.dropbox.com/s/8z4b3o8h05cgvbo/arkhyz.jpg?dl=1'
    },
    {
        name: 'Камчатка',
        link: 'https://www.dropbox.com/s/y49ue6n41ftk47z/kamchatka.jpg?dl=1'
    },
    {
        name: 'Никола-Ленивец',
        link: 'https://www.dropbox.com/s/xcuoshuljlqo6wn/nikola.jpg?dl=1'
    }
];

function addCard(placeName, placeUrl){
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.card__name').textContent = placeName;
    newCard.querySelector('.card__image').src = placeUrl;
    newCard.querySelector('.card__image').alt = placeName;
    newCard.querySelector('.card__heart').addEventListener('click', function (evt) { 
        evt.target.classList.toggle('card__heart_active');
      });
    newCard.querySelector('.card__delete').addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    });
    cardsContainer.prepend(newCard);
}

initialPlaces.forEach(function (place) {
    addCard(place.name, place.link);
});

// Handle edit profile popup
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');

const editPopup = document.querySelector('#editprofilepopup');
const closeEditButton = document.querySelector('#closeeditbutton');
const saveEditButton = document.querySelector('#saveeditbutton');
const nameInput = document.querySelector('#profilename');
const captionInput = document.querySelector('#profilecaption');

function toggleEditPopup() {
    if (editPopup.classList.contains('popup_shown')) {
        editPopup.classList.remove('popup_shown');
        return;
    } 
    editPopup.classList.add('popup_shown');
    nameInput.value = profileName.textContent;
    captionInput.value = profileCaption.textContent;
}

function saveEdited(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    toggleEditPopup();
}

editButton.addEventListener('click', toggleEditPopup);
closeEditButton.addEventListener('click', toggleEditPopup);
saveEditButton.addEventListener('click', saveEdited);


// Handle popup that adds place card
const placePopup = document.querySelector('#placepopup');
const addButton = document.querySelector('.profile__add-button');
const closePlaceButton = document.querySelector('#closeplacebutton');
const savePlaceButton = document.querySelector('#saveplacebutton');
const placeNameInput = document.querySelector('#placename');
const placeUrlInput = document.querySelector('#placeurl');

function togglePlacePopup() {
    if (placePopup.classList.contains('popup_shown')) {
        placePopup.classList.remove('popup_shown');
        return;
    }
    placePopup.classList.add('popup_shown');
    placeNameInput.value = '';
    placeUrlInput.value = '';
}

function createPlaceCard(event) {
    event.preventDefault();
    if (placeNameInput.value && placeUrlInput.value) {
        addCard(placeNameInput.value, placeUrlInput.value);
        togglePlacePopup();
    }
}

addButton.addEventListener('click', togglePlacePopup);
closePlaceButton.addEventListener('click', togglePlacePopup);
savePlaceButton.addEventListener('click', createPlaceCard);
