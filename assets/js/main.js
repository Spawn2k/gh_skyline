'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgEls = document.querySelectorAll('.header-pic img');
  DOM.headerEl = document.querySelector('header');
  // console.log(DOM);
  let xValue = 0;
  let yValue = 0;

  // === INIT =============
  const init = () => {
    DOM.headerEl.addEventListener('mousemove', onMouseMove);
  };

  // === EVENTHANDLER =====

  const onMouseMove = (e) => {
    const { clientX } = e;
    const { clientY } = e;
    const percent = calcPercent(clientX);
    let max = percent;
    max = Math.max(percent, 40);
    if (percent > 40) {
      max = Math.min(percent, 80);
    }
    xValue = clientX - window.innerWidth / 2;
    // yValue = clientY - window.innerHeight / 2;

    DOM.imgEls.forEach((img, idx) => {
      moveImageBackground(img, max, -35);
      if (idx === 1) {
        moveImageBackground(img, max, 20);
      }
    });
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const calcPercent = (coordX) => {
    const percent = (coordX / window.innerWidth) * 100;

    if (percent > 70 || percent < 20) return percent;
    // console.log(percent);

    return percent;
  };

  const moveImageBackground = (img, percent, offset = 0) => {
    img.style.setProperty('--cordX', `${percent + offset}%`);
    // img.animate(
    //   {
    //     objectPosition: `${percent}% 0%`,
    //   },
    //   { fill: 'forwards', duration: 250, easing: 'ease-in' }
    // );
  };

  init();
})();
