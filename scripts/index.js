// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard);
  cardsContainer.append(card);
});

function createCard(element, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const garb = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;

  garb.addEventListener("click", function () {
    deleteCard(cardElement);
  });
  return cardElement;
}

function deleteCard(card) {
  card.remove();
}
