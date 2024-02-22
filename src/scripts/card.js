/*import { initialCards } from "./cards";*/
length
function createCard(element, deleteCard, likeCard, imgPopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const garb = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const img = cardElement.querySelector(".card__image");
  const imgTitle = cardElement.querySelector(".card__title");
  const sumLike = cardElement.querySelector('.sum-likes');
  sumLike.textContent = element.likes.length; 
  if (element.owner._id != '0f0613de9a14448dd55de63f'){
    garb.style.display = 'none';
  }
  const like = cardElement.querySelector(".card__like-button");

element.likes.forEach((res) => {
  if (res._id == '0f0613de9a14448dd55de63f'){
    like.classList.add('card__like-button_is-active');
  }
});

  img.src = element.link;
  img.alt = element.name;
  imgTitle.textContent = element.name;

  garb.addEventListener("click", function () {
    deleteCard(cardElement,element);
  });

  likeButton.addEventListener("click", function () {
    likeCard(cardElement, element);
  });

  img.addEventListener("click", function () {
    imgPopup(img, imgTitle.textContent);
  });

  return cardElement;
}

function deleteCard(card,element) {
  fetch (`https://nomoreparties.co/v1/wff-cohort-6/cards/${element._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4'
    }
  });
  card.remove();
}


function likeCard(card, element) {
  const like = card.querySelector(".card__like-button");
  if (like.classList.contains('card__like-button_is-active')){
  fetch (`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${element._id}`, {
    method: 'DELETE',
    headers: {
      authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4'
    }
  })
} else{
  fetch (`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${element._id}`, {
    method: 'PUT',
    headers: {
      authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4'
    }
  })}
  like.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
