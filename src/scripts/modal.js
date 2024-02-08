export function openPopup(pop) {
  pop.classList.add("popup_is-opened");
  window.addEventListener("keydown", escClosePopup);
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
