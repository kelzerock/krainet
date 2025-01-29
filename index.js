const burgerMenuButton = document.querySelector(".burger-menu__button");
burgerMenuButton.addEventListener("click", () => {
  burgerMenuButton.classList.toggle("burger-menu__button--active");
});
