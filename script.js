const page = document.querySelector('.page');
const editProfile = page.querySelector('.edit-profile');
const editButton = page.querySelector('.profile__edit-button');
const closeButton = page.querySelector('.edit-profile__close-button');
const saveButton = page.querySelector('.edit-profile__submit-button');

function showEdit() {
    editProfile.classList.add('edit-profile_shown');
}

function hideEdit() {
    editProfile.classList.remove('edit-profile_shown');
}

function saveEdited(event) {
    event.preventDefault();

    let profileName = page.querySelector('.profile__name');
    let profileCaption = page.querySelector('.profile__caption');
    let nameInput = page.querySelector('#profilename');
    let captionInput = page.querySelector('#profilecaption');

    profileName.textContent = nameInput.value;
    profileCaption.textContent = captionInput.value;
    hideEdit();
}

editButton.addEventListener('click', showEdit);
closeButton.addEventListener('click', hideEdit);
saveButton.addEventListener('click', saveEdited);
