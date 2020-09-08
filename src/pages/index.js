import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// Global constants
const cardsContainerSelector = ".cards";
const cardSelector = "#card-template";
const editProfileForm = document.querySelector(
  "#editprofilepopup .popup__form"
);
const placeForm = document.querySelector("#placepopup .popup__form");
const editAvatarForm = document.querySelector("#editavatarpopup .popup__form");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__error-text_shown",
};
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__edit-avatar-button");

// Create object with my token and base server url
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "4ae30d7d-6481-4bd9-8c0e-4ec6c8bc77e4",
    "Content-Type": "application/json",
  },
});

// Profile handler
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__caption",
  ".profile__avatar"
);

// Function that creates new card and renders it to the section
const createCard = (name, link, likes, cardOwnerId, userId, cardId, likesArray) => {
  const newCard = new Card(
    name,
    link,
    cardSelector,
    {
      handleCardClick: (cardname, cardurl) => {
        imagePopup.open(cardname, cardurl);
      },
      handleDelete: (card, cardId) => {
        confirmDeletePopup.open(null, card, cardId);
      },
      handleLike: (cardId, isLiked) => {
        if (isLiked) {
          api
            .deleteLikeOnCard(cardId)
            .then((result) => {
              newCard.updateLikes(result.likes.length);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          api
            .putLikeOnCard(cardId)
            .then((result) => {
              newCard.updateLikes(result.likes.length);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },
    },
    likes,
    cardOwnerId,
    userId,
    cardId,
    likesArray
  );
  cardsSection.addItem(newCard.render());
};

// Creating popup handlers >>
// Image popup
const imagePopup = new PopupWithImage(
  "#imagepopup",
  ".popup__image",
  ".popup__caption"
);
imagePopup.setEventListeners();

//  Adding new card popup form
const newPlacePopup = new PopupWithForm(
  "#placepopup",
  {
    handleSubmit: (evt, { placename, placeurl }) => {
      evt.preventDefault();

      // Post card to server
      newPlacePopup.renderLoading(true, "Сохранение...");
      api
        .postNewCard(placename, placeurl)
        .then((item) => {
          createCard(
            item.name,
            item.link,
            item.likes.length,
            item.owner._id,
            userInfo.getUserId(),
            item._id,
            item.likes
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          newPlacePopup.renderLoading(false);
          newPlacePopup.close();
        });
    },
    clearValidation: () => {
      newPlaceFormValidator.clearValidation();
    },
  },
  "Создать"
);
newPlacePopup.setEventListeners();

// Editing profile information popup form
const editProfilePopup = new PopupWithForm(
  "#editprofilepopup",
  {
    handleSubmit: (evt, { profilename, profilecaption }) => {
      evt.preventDefault();

      // Edit profile info on server
      editProfilePopup.renderLoading(true, "Загрузка...");
      api
        .patchUserProfile(profilename, profilecaption)
        .then((result) => {
          userInfo.setUserInfo(result.name, result.about);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          editProfilePopup.renderLoading(false);
          editProfilePopup.close();
        });
    },
    clearValidation: () => {
      editProfileFormValidator.clearValidation();
    },
  },
  "Сохранить"
);
editProfilePopup.setEventListeners();

// Editing profile avatar popup form
const editAvatarPopup = new PopupWithForm(
  "#editavatarpopup",
  {
    handleSubmit: (evt, { avatarurl }) => {
      evt.preventDefault();

      // Edit avatar info on server
      editAvatarPopup.renderLoading(true, "Сохранение...");
      api
        .patchUserAvatar(avatarurl)
        .then((result) => {
          userInfo.setAvatar(result.avatar);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          editAvatarPopup.renderLoading(false);
          editAvatarPopup.close();
        });
    },
    clearValidation: () => {
      editAvatarFormValidator.clearValidation();
    },
  },
  "Сохранить"
);
editAvatarPopup.setEventListeners();

// Popup that confims if you want to delete card
const confirmDeletePopup = new PopupWithForm(
  "#confirmdeletepopup",
  {
    handleSubmit: (evt, inputValues, card, cardId) => {
      evt.preventDefault();
      // Delete card on server
      confirmDeletePopup.renderLoading(true, "Удаление...");
      api.deleteCard(cardId)
        .then(() => {
          // Remove card element from DOM
          card.remove();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          confirmDeletePopup.renderLoading(false);
          confirmDeletePopup.close();
        });
    },
    clearValidation: () => {},
  },
  "Да"
);
confirmDeletePopup.setEventListeners();
// <<

// Creating form validators
const newPlaceFormValidator = new FormValidator(validationConfig, placeForm);
newPlaceFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
editProfileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(
  validationConfig,
  editAvatarForm
);
editAvatarFormValidator.enableValidation();

// Hanging popups' calls on the buttons
addButton.addEventListener("click", () => {
  newPlacePopup.open();
});
editButton.addEventListener("click", () => {
  editProfilePopup.open(userInfo.getUserInfo());
});
editAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

//  Get profile info from server render cards from server
let cardsSection;
Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);
    userInfo.setUserId(userData._id);
    cardsSection = new Section(
      {
        items: initialCards.reverse(),
        renderer: (item) => {
          createCard(
            item.name,
            item.link,
            item.likes.length,
            item.owner._id,
            userInfo.getUserId(),
            item._id,
            item.likes
          );
        },
      },
      cardsContainerSelector
    );
    cardsSection.renderItems();
  })
  .catch((error) => {
    console.log(error);
  });

// console.log("%c+", 'font-size: 1px; padding: 150px 126px; line-height: 0; background: url("https://www.dropbox.com/s/wlkqq5rtdwjpzqu/meu.jpg?dl=1"); background-size: 252px 300px; color: transparent;');