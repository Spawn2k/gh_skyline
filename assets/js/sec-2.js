'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgContainerEls = document.querySelectorAll('.sec-2-img-container');
  DOM.imgTriggerEl = document.querySelector('.img-trigger');
  DOM.pEls = document.querySelectorAll('.sec-2-info');
  const body = document.body;
  let lastScroll = 0;
  // console.log(DOM);
  // === INIT =============
  const init = () => {
    window.addEventListener('scroll', onScroll);
  };

  // === EVENTHANDLER =====

  const onScroll = (e) => {
    let top = window.scrollY;
    let offset = DOM.imgTriggerEl.offsetTop - 700;
    let height = DOM.imgTriggerEl.offsetHeight;

    if (top >= offset && top < offset + height) {
      DOM.imgContainerEls.forEach((img) => img.classList.add('active'));
      DOM.pEls.forEach((el) => el.classList.add('active'));
    }
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
