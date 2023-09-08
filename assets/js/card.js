'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.cardWrapperEl = document.querySelector('.cards');
  DOM.cardEls = document.querySelectorAll('.card');

  // === INIT =============
  const init = () => {
    DOM.cardWrapperEl.addEventListener('mousemove', onMouseMove);
  };

  // === EVENTHANDLER =====
  const onMouseMove = (e) => {
    DOM.cardEls.forEach((card) => {
      const rect = card.getBoundingClientRect();

      const xCord = e.clientX - rect.left;
      const yCord = e.clientY - rect.top;

      card.style.setProperty('--xPos', `${xCord}px`);
      card.style.setProperty('--yPos', `${yCord}px`);
    });
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
