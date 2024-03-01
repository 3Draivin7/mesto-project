// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу imgPopup
// index.js

import {
  getInitialCard,
  changeAvatarLinkFunction,
  getApiNameDescription,
  postNewCard,
  patchNameDescription,
  putApiLike,
  deleteApiCard,
  deleteApiLike,
} from "./scripts/api";

import "./pages/index.css";

import { createCard, deleteCard,changeLike } from "./scripts/card";
import {
  openPopup,
  closePopup,
  escClosePopup,
  overlayClosePopup,
} from "./scripts/modal";

import { enableValidation, resetForm, buttonInactive } from "./scripts/validation";

const avatar = document.querySelector(".profile__image");
const avatarChangeButton = document.querySelector(".profile__image");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const formAvatar = document.forms.editAvatar;

avatarChangeButton.addEventListener("click", () => {
  openPopup(popupNewAvatar);
});

formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  popupNewAvatar.querySelector(".popup__button").textContent = "Cохранение...";
  const avatarLink = formAvatar.elements.avatar.value;
  changeAvatarLinkFunction(avatarLink)
    .then(() => {
      avatar.style.backgroundImage = `url(${avatarLink})`;
      closePopup(popupNewAvatar);
      resetForm(formAvatar);
      buttonInactive(popupNewAvatar.querySelector(".popup__button"));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupNewAvatar.querySelector(".popup__button").textContent = "Cохранить";
    })
});

let userId;

Promise.all([getApiNameDescription(), getInitialCard()])
.then(([user, cards]) => {
    userProfileTitle.textContent = user.name;
    userProfileDescription.textContent = user.about;
    userName.value = user.name;
    userDescription.value = user.about;
    avatar.style.backgroundImage = `url(${user.avatar})`;
    userId = user._id;
    cards.forEach(function (item) {
      const card = createCard(
        item,
        deleteCard,
        openImgPopup,
        userId,
        handleLikeCard,
        deleteApiCard
      );
      cardsContainer.append(card);
})})
  .catch((err) => {
    console.log(err);
  });

const cardsContainer = document.querySelector(".places__list");

function openImgPopup(cardImage, cardTitle) {
  openPopup(popupTypeImage);
  popupTypeImageSrc.src = cardImage.src;
  popupTypeImageAlt.alt = cardImage.alt;
  popupTypeImageText.textContent = cardTitle;
}

////////////////////////////////////////////
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeImageSrc = popupTypeImage.querySelector(".popup__image");
const popupTypeImageAlt = popupTypeImage.querySelector(".popup__image");
const popupTypeImageText = popupTypeImage.querySelector(".popup__caption");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupCloses = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const butonAdd = document.querySelector(".profile__add-button");
const popupNew = document.querySelector(".popup_type_new-card");
const userName = document.querySelector(".popup__input_type_name");
const userDescription = document.querySelector(
  ".popup__input_type_description"
);
const formElementTypeEdit = document.querySelector(".popup_type_edit");
userName.value = document.querySelector(".profile__title").textContent;
userDescription.value = document.querySelector(
  ".profile__description"
).textContent;
const userProfileTitle = document.querySelector(".profile__title");
const userProfileDescription = document.querySelector(".profile__description");
const formCard = document.forms.newPlace;

buttonProfileEdit.addEventListener("click", () => openPopup(popupTypeEdit));

popups.forEach(function (item) {
  item.addEventListener("click", (evt) => overlayClosePopup(evt));
});

popupCloses.forEach(function (item) {
  item.addEventListener("click", () => closePopup(item));
});
butonAdd.addEventListener("click", () => openPopup(popupNew));
function handleForSubmitUserProfile(evt) {
  evt.preventDefault();
  popupTypeEdit.querySelector(".popup__button").textContent = "Cохранение...";
  patchNameDescription(userName, userDescription)
    .then(() => {
      userProfileTitle.textContent = userName.value;
      userProfileDescription.textContent = userDescription.value;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupTypeEdit.querySelector(".popup__button").textContent = "Cохранить";
    });
}
formElementTypeEdit.addEventListener("submit", handleForSubmitUserProfile);

function createNewCardSubmit(evt) {
  evt.preventDefault();
  popupNew.querySelector(".popup__button").textContent = "Cохранение...";
  const cardName = formCard.elements.placeName.value;
  const pictureLink = formCard.elements.link.value;
  postNewCard(cardName, pictureLink)
    .then((data) => {
      closePopup(popupNew);
      const card = createCard(
        data,
        deleteCard,
        openImgPopup,
        userId,
        handleLikeCard,
        deleteApiCard
      );
      cardsContainer.prepend(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupNew.querySelector(".popup__button").textContent = "Cохранить";
    })
  resetForm(formCard);
  buttonInactive(popupNew.querySelector(".popup__button"));
}

function handleLikeCard(status, card, element) {
  if (!status) {
    putApiLike(element)
      .then(() => {
        changeLike(card, true);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteApiLike(element)
      .then(() => {
        changeLike(card, false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}



formCard.addEventListener("submit", createNewCardSubmit);

const enableValidationconst = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};



enableValidation(enableValidationconst.formSelector);
