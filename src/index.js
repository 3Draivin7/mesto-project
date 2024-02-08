// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу imgPopup
// index.js
console.log(createCard, deleteCard, likeCard);

import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import {
  openPopup,
  closePopup,
  escClosePopup,
  overlayClosePopup,
} from "./scripts/modal";
const cardsContainer = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, likeCard, openImgPopup);
  cardsContainer.append(card);
});

function openImgPopup(cardImageSrc, cardImageAlt, cardTitle) {
  openPopup(popupTypeImg);
  popupTypeImg.querySelector(".popup__image").src = cardImageSrc;
  popupTypeImg.querySelector(".popup__image").alt = cardImageAlt;
  popupTypeImg.querySelector(".popup__caption").textContent = cardTitle;
}

////////////////////////////////////////////
const popupTypeImg = document.querySelector(".popup_type_image");
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
/*const imgTypePopup = document.querySelector(".popup_type_image");*/
const formCard = document.forms.newPlace;

buttonProfileEdit.addEventListener("click", () => openPopup(popupTypeEdit));

popups.forEach(function (item) {
  item.addEventListener("click", (evt) => overlayClosePopup(evt));
});

popupCloses.forEach(function (item) {
  item.addEventListener("click", () => closePopup(item));
});

/*popups[0].addEventListener("click", (evt) =>
overlayClosePopup(evt)
);
popups[1].addEventListener("click", (evt) =>
overlayClosePopup(evt)
);
popups[2].addEventListener("click", (evt) =>
overlayClosePopup(evt)
);
*/

////////////////////////////////

butonAdd.addEventListener("click", () => openPopup(popupNew));

///////////////////
function handleForSubmitUserProfile(evt) {
  evt.preventDefault();
  userProfileTitle.textContent = userName.value;
  userProfileDescription.textContent = userDescription.value;
  closePopup(popupTypeEdit);
}

formElementTypeEdit.addEventListener("submit", handleForSubmitUserProfile);

function createNewCardSubmit(evt) {
  evt.preventDefault();
  popupNew.classList.remove("popup_is-opened");
  const cardName = formCard.elements.placeName.value;
  const pictureLink = formCard.elements.link.value;
  const cardInformation = { name: cardName, link: pictureLink };
  const card = createCard(cardInformation, deleteCard, likeCard, openImgPopup);
  cardsContainer.prepend(card);
  formCard.reset();
}

formCard.addEventListener("submit", createNewCardSubmit);
