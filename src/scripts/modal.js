export function createPopup(pop) {
  pop.classList.add("popup_is-opened");
}

export function buttonClosePopup(pop) {
  pop.classList.remove("popup_is-opened");
}

export function escClosePopup(pop, evt) {
  if (evt.key == "Escape") {
    pop.classList.remove("popup_is-opened");
  }
}

export function overlayClosePopup(pop, evt, i) {
  if (!evt.composedPath().includes(div[i])) {
    pop.classList.remove("popup_is-opened");
  }
}
