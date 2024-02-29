 /*86 + 54*/

function createCard(element, deleteCard, imgPopup, userId, handleLikeCard, deleteApiCard) {
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
  if (element.owner._id != userId) {
    garb.style.display = 'none';
  }
  const like = cardElement.querySelector(".card__like-button");

  element.likes.forEach((res) => {
    if (res._id == userId) {
      like.classList.add('card__like-button_is-active');
    }
  });

  img.src = element.link;
  img.alt = element.name;
  imgTitle.textContent = element.name;

  garb.addEventListener("click", function () {
    deleteCard(cardElement, element, deleteApiCard);
  });
  likeButton.addEventListener("click", function () {
    handleLikeCard(checkStatusLike(like), cardElement, element);
  });

  img.addEventListener("click", function () {
    imgPopup(img, imgTitle.textContent);
  });

  return cardElement;
}
/////////////////

function checkStatusLike(like) {
  return (like.classList.contains('card__like-button_is-active'));
};

 function deleteCard(card, element, deleteApiCard) {
  deleteApiCard(element)
    .then(() => {
      removeCard(card);
    })
    .catch((err) => {
      console.log(err);
    });
};

function removeCard(card) {
  card.remove();
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
};


///////////////////////


export { createCard,deleteCard,changeLike };
