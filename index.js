const MAX_WIDTH = 1920;
const WIDTH_NAV = 345;

const burgerMenuButton = document.querySelector(".burger-menu__button");
const popupNav = document.querySelector(".popup-nav");
const popupNavBlock = document.querySelector(".popup-nav__navigation");
burgerMenuButton.addEventListener("click", togglePopup);
popupNav.addEventListener("click", togglePopup);

function togglePopup() {
  if (!burgerMenuButton && !popupNav && !popupNavBlock) return;
  if (burgerMenuButton.classList.contains("burger-menu__button--active")) {
    popupNav.classList.remove("popup-nav--active");
    burgerMenuButton.classList.remove("burger-menu__button--active");
  } else {
    setMinWidth(popupNavBlock, getWindowSizeAboveInLeft(MAX_WIDTH) + WIDTH_NAV);
    popupNav.classList.add("popup-nav--active");
    burgerMenuButton.classList.add("burger-menu__button--active");
  }
}

function getWindowSizeAboveInLeft(maxWidth) {
  return window.innerWidth > maxWidth ? (window.innerWidth - maxWidth) / 2 : 0;
}

function setMinWidth(node, minWidth) {
  node.style.minWidth = minWidth + "px";
}

window.addEventListener("resize", () => {
  if (window.innerWidth > MAX_WIDTH) {
    setMinWidth(popupNavBlock, getWindowSizeAboveInLeft(MAX_WIDTH) + WIDTH_NAV);
  }
});
