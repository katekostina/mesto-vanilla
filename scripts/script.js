const editProfile = document.querySelector('.edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.edit-profile__close-button');
const saveButton = document.querySelector('.edit-profile__submit-button');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const nameInput = document.querySelector('#profilename');
const captionInput = document.querySelector('#profilecaption');

function toggleEdit() {
    let popupShown = editProfile.classList.contains('edit-profile_shown'); 
    if (popupShown) {
        editProfile.classList.remove('edit-profile_shown');
        return;
    } else {
        editProfile.classList.add('edit-profile_shown');
        nameInput.value = profileName.textContent;
        captionInput.value = profileCaption.textContent;
        return;
    }
}

function saveEdited(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    toggleEdit();
}

editButton.addEventListener('click', toggleEdit)
closeButton.addEventListener('click', toggleEdit);
saveButton.addEventListener('click', saveEdited);
