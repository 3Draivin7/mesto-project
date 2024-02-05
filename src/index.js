// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// index.js
console.log(createCard, deleteCard, likeCard);

import "./pages/index.css"; // добавьте импорт главного файла стилей
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import {
  createPopup,
  buttonClosePopup,
  escClosePopup,
  overlayClosePopup,
} from "./scripts/modal";
const cardsContainer = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, likeCard, imgPopup);
  cardsContainer.append(card);
});

function imgPopup(card) {
  var popupTypeImg = document.querySelector(".popup_type_image");
  popupTypeImg.classList.add("popup_is-opened");
  popupTypeImg.querySelector(".popup__image").src =
    card.querySelector(".card__image").src;
  popupTypeImg.querySelector(".popup__image").alt =
    card.querySelector(".card__image").alt;
  popupTypeImg.querySelector(".popup__caption").textContent =
    card.querySelector(".card__title").textContent;
}

////////////////////////////////////////////

const popup = document.querySelector(".profile__edit-button");
const popupOpen = document.querySelector(".popup_type_edit");
const popupClose = document.querySelectorAll(".popup__close");
const div = document.querySelectorAll(".popup__content");
const popups = document.querySelectorAll(".popup");
const butonAdd = document.querySelector(".profile__add-button");
const popupNew = document.querySelector(".popup_type_new-card");
const bodyMain = document.querySelector(".page");
const userName = document.querySelector(".popup__input_type_name");
const userDescription = document.querySelector(
  ".popup__input_type_description"
);
const formElement = document.querySelector(".popup_type_edit");
userName.value = document.querySelector(".profile__title").textContent;
userDescription.value = document.querySelector(
  ".profile__description"
).textContent;
const imPopup = document.querySelector(".popup_type_image");
const formCard = document.forms.newPlace;

popup.addEventListener("click", () => createPopup(popupOpen));

popups[0].addEventListener("click", (evt) =>
  overlayClosePopup(popupOpen, evt, 0)
);
popupClose[0].addEventListener("click", () => buttonClosePopup(popupOpen));

bodyMain.addEventListener("keydown", (evt) => escClosePopup(popupOpen, evt));
////////////////////////////////

butonAdd.addEventListener("click", () => createPopup(popupNew));

bodyMain.addEventListener("keydown", (evt) => escClosePopup(popupNew, evt));

popupClose[1].addEventListener("click", () => buttonClosePopup(popupNew));

popups[1].addEventListener("click", (evt) =>
  overlayClosePopup(popupNew, evt, 1)
);
///////////////////////

bodyMain.addEventListener("keydown", (evt) => escClosePopup(imPopup, evt));

popups[2].addEventListener("click", (evt) =>
  overlayClosePopup(imPopup, evt, 2)
);
popupClose[2].addEventListener("click", () => buttonClosePopup(imPopup));

///////////////////
function handleForSubmit(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = userName.value;
  document.querySelector(".profile__description").textContent =
    userDescription.value;
  popupOpen.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", handleForSubmit);

function cardForSubmit(evt) {
  evt.preventDefault();
  const cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }
  const cardName = formCard.elements.placeName.value;
  const pictureLink = formCard.elements.link.value;
  const b = { name: cardName, link: pictureLink };
  initialCards.unshift(b);
  formCard.reset();
  popupNew.classList.remove("popup_is-opened");
  initialCards.forEach(function (item) {
    const card = createCard(item, deleteCard, likeCard, imgPopup);
    cardsContainer.append(card);
  });
}

formCard.addEventListener("submit", cardForSubmit);
