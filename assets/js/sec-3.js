'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgEl = document.querySelector('.sec-3-img');
  DOM.sec3El = document.querySelector('.sec-3');
  console.log(DOM);
  // === INIT =============
  const init = () => {
    window.addEventListener('scroll', onScroll);
  };

  // === EVENTHANDLER =====
  const onScroll = (e) => {
    let top = window.scrollY;
    let height = DOM.sec3El.offsetHeight;
    let offset = DOM.sec3El.offsetTop - height + 350;
    // console.log(offset);
    if (top >= offset && top < offset + height) {
      const percent = (top - offset) / 10;
      DOM.imgEl.style.setProperty('--yCord', `${10 + percent * 0.5}%`);
      console.log(percent);
    }
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
