const MAX_WIDTH = 1920;
const WIDTH_NAV = 345;
const WIDTH_NAV_MIN = 250;

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
    if (window.innerWidth < 767) {
      setMinWidth(popupNavBlock, WIDTH_NAV_MIN);
    } else {
      setMinWidth(
        popupNavBlock,
        getWindowSizeAboveInLeft(MAX_WIDTH) + WIDTH_NAV
      );
    }
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
  if (window.innerWidth < 767) {
    setMinWidth(popupNavBlock, WIDTH_NAV_MIN);
  }
});

class FormsValidation {
  selectors = {
    form: "[data-js-form]",
    fieldErrors: "[data-field-errors]",
    fieldSuccess: "[data-field-success]",
  };

  errorMessages = {
    valueMissing: () => "Пожалуйста, заполните это поле",
    patternMismatch: ({ title }) => title || "Данные не соответствуют формату",
  };

  constructor() {
    this.bindEvents();
  }

  manageErrors(fieldControlElement, errorMessages) {
    const fieldErrorsElement = fieldControlElement.parentElement.querySelector(
      this.selectors.fieldErrors
    );

    fieldErrorsElement.innerHTML = errorMessages
      .map((message) => `<span class="field__error">${message}</span>`)
      .join("");
  }

  manageSuccess() {
    const fieldSuccessElement = document.querySelector(
      this.selectors.fieldSuccess
    );

    fieldSuccessElement.textContent = "Cообщение успешно отправлено";
    setTimeout(() => {
      fieldSuccessElement.textContent = "";
    }, 3000);
  }

  validateField(fieldControlElement) {
    const errors = fieldControlElement.validity;
    const errorMessages = [];

    Object.entries(this.errorMessages).forEach(
      ([errorType, getErrorMessage]) => {
        if (errors[errorType]) {
          errorMessages.push(getErrorMessage(fieldControlElement));
        }
      }
    );

    this.manageErrors(fieldControlElement, errorMessages);

    const isValid = errorMessages.length === 0;

    fieldControlElement.ariaInvalid = !isValid;

    return isValid;
  }

  onBlur(event) {
    const { target } = event;
    const isFormField = target.closest(this.selectors.form);
    const isRequired = target.required;

    if (isFormField && isRequired) {
      this.validateField(target);
    }
  }

  onSubmit(event) {
    const isFormElement = event.target.matches(this.selectors.form);
    if (!isFormElement) {
      return;
    }

    const requiredControlElements = [...event.target.elements].filter(
      ({ required }) => required
    );
    let isFormValid = true;
    let firstInvalidFieldControl = null;

    requiredControlElements.forEach((element) => {
      const isFieldValid = this.validateField(element);

      if (!isFieldValid) {
        isFormValid = false;

        if (!firstInvalidFieldControl) {
          firstInvalidFieldControl = element;
        }
      }
    });

    if (!isFormValid) {
      event.preventDefault();
      firstInvalidFieldControl.focus();
    } else {
      event.preventDefault();

      const form = document.querySelector([this.selectors.form]);

      const formData = new FormData(form);
      fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          this.setClearInputs(form);
          this.manageSuccess();
          res.json().then((json) => console.log(json));
        }
      });
    }
  }
  onChange(event) {
    const { target } = event;
    const isRequired = target.required;
    if (isRequired) {
      this.validateField(target);
    }
  }

  setClearInputs(form) {
    [...form.elements].forEach((element) => {
      element.value = "";
    });
  }

  bindEvents() {
    document.addEventListener(
      "blur",
      (event) => {
        this.onBlur(event);
      },
      { capture: true }
    );
    document.addEventListener("change", (event) => this.onChange(event));
    document.addEventListener("submit", (event) => this.onSubmit(event));
  }
}

new FormsValidation();
