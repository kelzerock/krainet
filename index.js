const burgerMenuButton = document.querySelector(".burger-menu__button");
const popupNav = document.querySelector(".popup-nav");
burgerMenuButton.addEventListener("click", togglePopup);
popupNav.addEventListener("click", togglePopup);

function togglePopup() {
  if (burgerMenuButton.classList.contains("burger-menu__button--active")) {
    popupNav.classList.remove("popup-nav--active");
    burgerMenuButton.classList.remove("burger-menu__button--active");
  } else {
    popupNav.classList.add("popup-nav--active");
    burgerMenuButton.classList.add("burger-menu__button--active");
  }
}
