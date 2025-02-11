$(document).ready(function () {
  //phone mask
  $('input[type="tel"]').mask("+375 (99) 999-99-99");
});

document.addEventListener("DOMContentLoaded", function () {
  //burger
  const burger = document.querySelector(".burger");
  const headerClose = document.querySelector(".header-close");
  const menuWrap = document.querySelector(".menu-wrap");
  const body = document.body;

  burger.addEventListener("click", () => {
    menuWrap.classList.add("menu-active");
    body.classList.add("modal-open");
  });

  headerClose.addEventListener("click", () => {
    menuWrap.classList.remove("menu-active");
    body.classList.remove("modal-open");
  });

  // menu-mobile
  if (window.innerWidth <= 960) {
    const headerLinks = document.querySelectorAll("header a");
    headerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuWrap.classList.remove("menu-active");
        body.classList.remove("modal-open");
      });
    });
  }

  //header-fixed-active (background)
  !(function () {
    const e = document.querySelector(".header");
    window.onscroll = () => {
      window.pageYOffset > 50
        ? e.classList.add("header-active")
        : e.classList.remove("header-active");
    };
  })();

  // validation of form
  document.getElementById('parthner-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const requiredFields = this.querySelectorAll('.req');
    let allFieldsFilled = true;

    // validate - all req fields
    requiredFields.forEach(function (field) {
      if (!field.value.trim()) {
        allFieldsFilled = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });

    // delete error
    requiredFields.forEach(function (field) {
      field.addEventListener('input', function () {
        if (field.value.trim()) {
          field.classList.remove('error');
        }
      });
    });

    // validate - consentCheckbox
    const consentCheckbox = this.querySelector('input[name="consent"]');
    const consentChecked = consentCheckbox.checked;
    if (!consentChecked) {
      consentCheckbox.classList.add('error');
    } else {
      consentCheckbox.classList.remove('error');
    }

    // validate all fields
    if (allFieldsFilled && consentChecked) {
      const successPopup = document.querySelector('[data-popup-id="popup-form-success"]');
      successPopup.classList.add('opened');
      document.body.classList.add('modal-open');
    } else {
      const errorPopup = document.querySelector('[data-popup-id="popup-form-error"]');
      errorPopup.classList.add('opened');
      document.body.classList.add('modal-open');
    }
  });

  // function close popup
  document.addEventListener("click", function (e) {
    let target = e.target;
    if (
      target.classList.contains("popup-close") ||
      target.classList.contains("popup__inner")
    ) {
      document.querySelectorAll(".popup").forEach((popup) => {
        popup.classList.remove("opened");
      });
      document.body.classList.remove("modal-open");
    }
  });
});
