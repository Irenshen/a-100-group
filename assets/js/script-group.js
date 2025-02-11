$(document).ready(function () {
  //phone mask
  $('input[type="tel"]').mask("+375 (99) 999-99-99");
});

document.addEventListener("DOMContentLoaded", function () {
  //side-panel
  const sidePanels = document.querySelectorAll("[data-side-panel-id]");

  if (document.querySelector(".side-panel")) {
    sidePanels.forEach((sidePanel) => {
      const sidePanelId = sidePanel.getAttribute("data-side-panel-id");
      const openSidePanelButtons = document.querySelectorAll(
        `[data-side-panel-open="${sidePanelId}"]`
      );

      openSidePanelButtons.forEach((button) => {
        button.addEventListener("click", () => {
          sidePanels.forEach((panel) => {
            panel.classList.remove("opened");
            panel.classList.remove("closing");
          });
          sidePanel.classList.add("opened");
          document.body.classList.add("modal-open");
        });
      });
    });

    document.addEventListener("click", function (e) {
      let target = e.target;
      if (
        target.classList.contains("side-panel-close")
      ) {
        sidePanels.forEach((sidePanel) => {
          sidePanel.classList.add("closing");
          setTimeout(() => {
            sidePanel.classList.remove("opened");
            sidePanel.classList.remove("closing");
          }, 300);//время анимации как по стилям
        });
        document.body.classList.remove("modal-open");
      }
    });
  }


  const forms = document.querySelectorAll('.focus-group-form');

  forms?.forEach(form => {
    const anonymousCheckbox = form.querySelector('input[name="anonym"]');
    const consentCheckbox = form.querySelector('input[name="consent"]');
    const requiredInputs = form.querySelectorAll('input[required], textarea[required]');

    // Обработчик события для чекбокса "Заполнить анонимно"
    anonymousCheckbox.addEventListener('change', function () {
      if (this.checked) {
        requiredInputs.forEach(input => {
          input.removeAttribute('required');
        });
      } else {
        requiredInputs.forEach(input => {
          input.setAttribute('required', 'required');
        });
      }
    });

    // Обработчик события для чекбокса согласия
    consentCheckbox.addEventListener('change', function () {
      if (this.checked) {
        this.classList.remove('error');
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const consentCheckbox = form.querySelector('input[name="consent"]');

      // Проверяем, отмечен ли чекбокс согласия
      if (!consentCheckbox.checked) {
        consentCheckbox.classList.add('error');
        return;
      } else {
        consentCheckbox.classList.remove('error');
      }

      // Проверяем обязательные поля только если чекбокс "Заполнить анонимно" не отмечен
      if (!anonymousCheckbox.checked) {
        let allFieldsFilled = true;

        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            allFieldsFilled = false;
          }
        });

        if (!allFieldsFilled) {
          return;
        }
      }

      // Если все проверки пройдены, открываем панель успеха
      const sidePanel = document.querySelector('[data-side-panel-id="side-panel-success"]');
      sidePanels.forEach((panel) => {
        panel.classList.remove("opened");
        panel.classList.remove("closing");
      });
      sidePanel.classList.add("opened");
      document.body.classList.add("modal-open");
    });
  });
});
