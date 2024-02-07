export function openPopup(pop) {
  pop.classList.add("popup_is-opened");
}

export function closePopup(pop) {
  pop.classList.remove("popup_is-opened");
}

export function escClosePopup(evt) {
  if (evt.key == "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closePopup(popupOpen);
  }
}

export function overlayClosePopup(evt) {
  const popupOpen = document.querySelector(".popup_is-opened");
  const popupContent = popupOpen.querySelector(".popup__content");
  const buttonClose = popupContent.querySelector(".popup__close");
  console.log(evt.target, popupContent);
  if (
    !evt.composedPath().includes(popupContent) ||
    evt.composedPath().includes(buttonClose)
  ) {
    closePopup(popupOpen);
  }
}
