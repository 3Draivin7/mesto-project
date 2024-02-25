// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу imgPopup
// index.js
console.log(document.querySelector(".popup__input_type_name").value);
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

import { createCard } from "./scripts/card";
import {
  openPopup,
  closePopup,
  escClosePopup,
  overlayClosePopup,
} from "./scripts/modal";

import { enableValidation } from "./scripts/validation";

const avatar = document.querySelector(".profile__image");
const avatarChangeButton = document.querySelector(".profile__image");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const formAvatar = document.forms.editAvatar;

avatarChangeButton.addEventListener("click", () => {
  openPopup(popupNewAvatar);
});

formAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarLink = formAvatar.elements.avatar.value;
  changeAvatarLinkFunction(avatarLink)
    .then(() => {
      avatar.style.backgroundImage = `url(${avatarLink})`;
      closePopup(popupNewAvatar);
    })
    .catch((err) => {
      console.log(err);
      closePopup(popupNewAvatar);
    });
});

var userId;

Promise.all([getApiNameDescription, getInitialCard])
  .then(() => console.log("ok"))
  .catch((err) => {
    console.log(err);
  });

getApiNameDescription()
  .then((result) => {
    userProfileTitle.textContent = result.name;
    userProfileDescription.textContent = result.about;
    userName.value = result.name;
    userDescription.value = result.about;
    avatar.style.backgroundImage = `url(${result.avatar})`;
    userId = result._id;
  })
  .catch((err) => {
    console.log(err);
  });

getInitialCard()
  .then((result) => {
    result.forEach(function (item) {
      const card = createCard(
        item,
        deleteCard,
        openImgPopup,
        userId,
        handleLikeCard
      );
      cardsContainer.append(card);
    });
  })
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
  popupNew.classList.remove("popup_is-opened");
  const cardName = formCard.elements.placeName.value;
  const pictureLink = formCard.elements.link.value;
  postNewCard(cardName, pictureLink)
    .then((data) => {
      const cardInformation = { name: data.name, link: data.link };
      const card = createCard(
        cardInformation,
        deleteCard,
        openImgPopup,
        userId,
        handleLikeCard
      );
      cardsContainer.prepend(card);
    })
    .catch((err) => {
      console.log(err);
    });
  formCard.reset();
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

function deleteCard(card, element) {
  deleteApiCard(element)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function changeLike(card, check) {
  const like = card.querySelector(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
  if (check) {
    card.querySelector(".sum-likes").textContent =
      Number(card.querySelector(".sum-likes").textContent) + 1;
  } else {
    card.querySelector(".sum-likes").textContent =
      Number(card.querySelector(".sum-likes").textContent) - 1;
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

console.log(enableValidation.formSelector);

enableValidation(enableValidationconst.formSelector);
