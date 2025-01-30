const MAX_WIDTH = 1920;
const WIDTH_NAV = 345;

const selectors = {
  burgerMenuButton: ".burger-menu__button",
  popupNav: ".popup-nav",
  popupNavBlock: ".popup-nav__navigation",
  closeButton: ".popup-nav__button-close",
};

const burgerMenuButton = document.querySelector(selectors.burgerMenuButton);
const popupNav = document.querySelector(selectors.popupNav);
const popupNavBlock = document.querySelector(selectors.popupNavBlock);
const closeButton = document.querySelector(selectors.closeButton);
burgerMenuButton.addEventListener("click", (e) => togglePopup(e));
popupNav.addEventListener("click", (e) => togglePopup(e));

function togglePopup(event) {
  const { target } = event;
  if (!burgerMenuButton && !popupNav && !popupNavBlock) return;

  function toggleClassActive() {
    popupNav.classList.toggle("popup-nav--active");
    burgerMenuButton.classList.toggle("burger-menu__button--active");
    document.body.classList.toggle("lock");
  }
  if (
    target.closest(selectors.burgerMenuButton) === burgerMenuButton ||
    target === popupNav ||
    target.closest(selectors.closeButton) === closeButton ||
    target.closest("a")
  ) {
    toggleClassActive();
    setMinWidth(popupNavBlock, getWindowSizeAboveInLeft(MAX_WIDTH) + WIDTH_NAV);
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
