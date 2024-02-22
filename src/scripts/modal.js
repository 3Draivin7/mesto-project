export function openPopup(pop) {
  pop.classList.add("popup_is-opened");
  window.addEventListener("keydown", escClosePopup);
  setEventListeners();
}

export function closePopup(pop) {
  pop.classList.remove("popup_is-opened");
  window.removeEventListener("keydown", escClosePopup);
}

export function escClosePopup(evt) {
  if (evt.key == "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closePopup(popupOpen);
  }
}

export function overlayClosePopup(evt) {
  const popupOpen = document.querySelector(".popup_is-opened");
  if (evt.target === evt.currentTarget) {
    closePopup(popupOpen);
  }
}
/////////////////////////
const showInputError = (formElement, inputElement, errorMessage) => {
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
  console.log(inputElement.validity.patternMismatch);
  if (inputElement.validity.patternMismatch) {
inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
inputElement.setCustomValidity("");
}
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);}
    else{
         hideInputError(formElement, inputElement);
}};

const setEventListeners = () => {
  const formElement = document.querySelector('.popup_is-opened');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
  return (!inputElement.validity.valid);
});
}

function toggleButtonState(inputList,buttonElement){
if (hasInvalidInput(inputList)){
  buttonElement.classList.add('button_inactive');
}else{
  buttonElement.classList.remove('button_inactive');
};
}