import { initialCards } from "./cards";

function createCard(element, deleteCard, likeCard, imgPopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  console.log(initialCards.indexOf(element));
  const garb = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const img = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;

  garb.addEventListener("click", function () {
    deleteCard(cardElement, element);
  });

  likeButton.addEventListener("click", function () {
    likeCard(cardElement);
  });

  img.addEventListener("click", function () {
    imgPopup(cardElement);
  });

  return cardElement;
}

function deleteCard(card, element) {
  card.remove();
  initialCards.splice(initialCards.indexOf(element), 1);
}

function likeCard(card) {
  const like = card.querySelector(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
