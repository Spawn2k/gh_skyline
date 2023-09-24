'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgEls = document.querySelectorAll('.header-pic img');
  DOM.headerEl = document.querySelector('header');
  DOM.headerPicEl = document.querySelectorAll('.header-pic');

  console.log();
  // === INIT =============
  const init = () => {
    DOM.headerEl.addEventListener('mousemove', onMouseMove);
    DOM.headerEl.addEventListener('mouseenter', onMouseEnter);
    DOM.headerEl.addEventListener('mouseleave', onMouseLeave);
  };

  // === EVENTHANDLER =====

  const onMouseMove = (e) => {
    const mouseDelter = parseFloat(DOM.headerPicEl[0].dataset.mouseEnter) - e.clientX;

    const maxDelta = window.innerWidth / 2;
    const percent = (mouseDelter / maxDelta) * -100;

    let nextPercentage = parseFloat(DOM.headerPicEl[0].dataset.prevPercent) + percent;

    const mql2 = window.matchMedia('screen and (max-width:895px)');
    if (mql2.matches) {
      nextPercentage = Math.min(nextPercentage, 55);
      nextPercentage = Math.max(nextPercentage, -25);
    } else {
      nextPercentage = Math.min(nextPercentage, 17);
      nextPercentage = Math.max(nextPercentage, -25);
    }

    DOM.headerPicEl.forEach((img) => {
      moveImage(img, nextPercentage);
    });
    // console.log(nextPercentage)

    // DOM.headerPicEl[0].dataset.percent = nextPercentage;

    DOM.headerPicEl.forEach((img) => (img.dataset.percent = nextPercentage));
  };

  const onMouseEnter = (e) => {
    DOM.headerPicEl.forEach((el) => (el.dataset.mouseEnter = e.clientX));
  };

  const onMouseLeave = (e) => {
    DOM.headerPicEl.forEach((el) => {
      el.dataset.prevPercent = el.dataset.percent;
    });
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const moveImage = (el, percent) => {
    const image = el.querySelector('img');
    let startPos = Number(el.dataset.startPos);

    const mql = window.matchMedia('screen and (max-width:1585px)');
    if (mql.matches) {
      DOM.headerPicEl[0].dataset.startPos = 45;
    }

    image.animate(
      {
        objectPosition: `${startPos + percent}% 50%`,
      },
      {
        duration: 300,
        fill: 'forwards',
      }
    );
  };

  init();
})();
