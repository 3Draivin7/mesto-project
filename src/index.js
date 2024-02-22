// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу imgPopup
// index.js

const avatar = document.querySelector('.profile__image');
const avatarChangeButton = document.querySelector('.profile__image');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');
const inputAvatar = document.forms.editAvatar;

avatarChangeButton.addEventListener('click', ()=> {
   openPopup(popupNewAvatar);
});

inputAvatar.addEventListener('submit', changeAvatarFunction)

function changeAvatarFunction(evt){
  evt.preventDefault();
  const avatarLink = inputAvatar.elements.avatar.value;
  avatar.style.backgroundImage = `url(${avatarLink})`;
  fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: avatarLink
  })
})
.then((res) => {res.json()})
.then((res) => { console.log(res)})
  closePopup(popupNewAvatar);
  inputAvatar.reset();
}


////////////////////////////////////////

fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
  method: 'GET',
  headers: {
    authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
    avatar.style.backgroundImage = `url(${result.avatar})`;
  })

  fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
  method: 'GET',
  headers: {
    authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4'
  }
})
  .then(res => res.json())
  .then((result) => {
    userProfileTitle.textContent = result.name;
  userProfileDescription.textContent = result.about;
  userName.value =  result.name;
  userDescription.value = result.about;
  })

  fetch('https://nomoreparties.co/v1/wff-cohort-6/cards', {
  method: 'GET',
  headers: {
    authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4'
  }
})
  .then(res => res.json())
  .then((result) => {
   result.forEach(function (item) {
    const card = createCard(item, deleteCard, likeCard, openImgPopup);
    cardsContainer.append(card);
  });
  })


import "./pages/index.css"; // добавьте импорт главного файла стилей
/*import { initialCards } from "./scripts/cards";*/
import { createCard, deleteCard, likeCard } from "./scripts/card";
import {
  openPopup,
  closePopup,
  escClosePopup,
  overlayClosePopup,
} from "./scripts/modal";
/*import { json } from "body-parser";*/
const cardsContainer = document.querySelector(".places__list");

/*initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, likeCard, openImgPopup);
  cardsContainer.append(card);
});*/

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
/*function handleForSubmitUserProfile(evt) {
  evt.preventDefault();
  userProfileTitle.textContent = userName.value;
  userProfileDescription.textContent = userDescription.value;
  closePopup(popupTypeEdit);
}*/

function handleForSubmitUserProfile(evt) {
  evt.preventDefault();
  const popupOpen = document.querySelector('.popup_is-opened');
  popupOpen.querySelector('.popup__button').textContent = 'Cохранение...'
  fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: userName.value,
    about: userDescription.value
  })
});
setTimeout(() =>{
popupOpen.querySelector('.popup__button').textContent = 'Cохранить'; 
closePopup(popupTypeEdit);}, 3000);
}
////////////////////////////////////////
/*const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    console.log('пишу хуйню');
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    console.log('пишу no хуйню');
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = () => {
  const formElement = document.querySelector('.popup_is-opened');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

setEventListeners()*/

/*function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.popup__form'));;
formList.forEach((formElement) => {
  formElementTypeEdit.addEventListener("submit", handleForSubmitUserProfile);
setEventListeners(formElement);
});
}*/
/*enableValidation();*//*вместе с функцией открытия*/ 

//////////////////////////////////////////////////////


/*function createNewCardSubmit(evt) {
  evt.preventDefault();
  popupNew.classList.remove("popup_is-opened");
  const cardName = formCard.elements.placeName.value;
  const pictureLink = formCard.elements.link.value;
  const cardInformation = { name: cardName, link: pictureLink };
  const card = createCard(cardInformation, deleteCard, likeCard, openImgPopup);
  cardsContainer.prepend(card);
  formCard.reset();
}*/

function createNewCardSubmit(evt) {
  evt.preventDefault();
  popupNew.classList.remove("popup_is-opened");
  const cardName = formCard.elements.placeName.value;
  const pictureLink = formCard.elements.link.value;
  fetch('https://nomoreparties.co/v1/wff-cohort-6/cards', {
    method: 'POST',
    headers: {
      authorization: '7aea75e6-a33e-44c8-8785-1d85f354cab4',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name:  cardName,
      link: pictureLink
    })
  })
    .then ((res) => res.json())
    .then ((data) => {
      const cardInformation = { name: data.name, link: data.link };
      const card = createCard(cardInformation, deleteCard, likeCard, openImgPopup);
      cardsContainer.prepend(card);
    });
  formCard.reset();
}


formCard.addEventListener("submit", createNewCardSubmit);
