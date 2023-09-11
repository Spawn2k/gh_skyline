'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgGeishaEl = document.querySelector('.sec-3-img-geisha');
  DOM.imgCherry = document.querySelector('.sec-3-img-cherry');
  DOM.sec3El = document.querySelector('.sec-3');
  DOM.sec4ImgEls = document.querySelectorAll('.sec-4 .card');
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
      DOM.imgGeishaEl.style.setProperty('--yCord', `${10 + percent * 0.5}%`);
      DOM.imgCherry.style.setProperty('--yCord', `${percent * 0.3}%`);
    }

    DOM.sec4ImgEls.forEach((img, idx) => {
      let top = window.scrollY;
      let height = img.offsetHeight;
      let offset = img.offsetTop - height + 500;
      // console.log(img.offsetTop);
      if (top >= offset && top < offset + height) {
        console.log('log', idx);
      }
    });
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
