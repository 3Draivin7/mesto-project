/*import { initialCards } from "./cards";*/

function createCard(element, deleteCard, likeCard, imgPopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const garb = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const img = cardElement.querySelector(".card__image");
  const imgTitle = cardElement.querySelector(".card__title");

  img.src = element.link;
  img.alt = element.name;
  imgTitle.textContent = element.name;

  garb.addEventListener("click", function () {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", function () {
    likeCard(cardElement);
  });

  img.addEventListener("click", function () {
    imgPopup(img, imgTitle.textContent);
  });

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(card) {
  const like = card.querySelector(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
