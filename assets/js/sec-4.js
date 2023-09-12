'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgEls = document.querySelectorAll('.sec-4 .card img');
  DOM.textEl = document.querySelector('.sec-4-city-text');
  console.log(DOM);
  // === INIT =============
  const init = () => {
    DOM.imgEls.forEach((img) => img.addEventListener('click', onClickImg));
  };

  // === EVENTHANDLER =====

  const onClickImg = (e) => {
    DOM.textEl.classList.toggle('hide');
  };
  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
