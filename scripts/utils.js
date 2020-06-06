// Handle image popup
const imagePopup = document.querySelector('#imagepopup');
const imagePopupImage = document.querySelector('#imagepopupimage');
const imagePopupCaption = document.querySelector('#imagepopupcaption');
const closeImageButton = document.querySelector('#closeimagebutton');

function toggleImagePopup(placeName, placeUrl) {
    if (imagePopup.classList.contains('image-popup_shown')) {
        imagePopup.classList.remove('image-popup_shown');
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
}
closeImageButton.addEventListener('click', toggleImagePopup);

// Add new card 
const cardsContainer = document.querySelector('.cards');

function addCard(placeName, placeUrl){
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.cloneNode(true);
    const cardImage = newCard.querySelector('.card__image');
    newCard.querySelector('.card__name').textContent = placeName;
    newCard.querySelector('.card__heart').addEventListener('click', function (evt) { 
        evt.target.classList.toggle('card__heart_active');
      });
    newCard.querySelector('.card__delete').addEventListener('click', function (evt) {
        evt.target.parentElement.remove();
    });
    cardImage.src = placeUrl;
    cardImage.alt = placeName;
    cardImage.addEventListener('click', function(){
        toggleImagePopup(placeName, placeUrl);
    });
    cardsContainer.prepend(newCard);
}

// Render initial cards
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
    placePopup.classList.toggle('popup_shown');
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
