'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgEls = document.querySelectorAll('.header-pic img');
  DOM.headerEl = document.querySelector('header');
  DOM.headerPicEl = document.querySelectorAll('.header-pic');

  console.log();
  const mql1380 = window.matchMedia('screen and (max-width:1380px)');
  const mql1381 = window.matchMedia('screen and (min-width:1381px)');
  const mql590 = window.matchMedia('screen and (min-width:590px)');
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
    let percent = (mouseDelter / maxDelta) * -100;

    let nextPercentage = parseFloat(DOM.headerPicEl[0].dataset.prevPercent) + percent;
    if (mql1380.matches && mql590.matches) {
      nextPercentage = Math.min(nextPercentage, 11);
      nextPercentage = Math.max(nextPercentage, -20);
      DOM.headerPicEl.forEach((img) => {
        moveImage(img, nextPercentage);
      });
    } else if (mql1381.matches) {
      nextPercentage = Math.min(nextPercentage, 35);
      nextPercentage = Math.max(nextPercentage, -20);
      DOM.headerPicEl.forEach((img) => {
        moveImage(img, nextPercentage);
      });
    }

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

    if (mql1380.matches) {
      DOM.headerPicEl[0].dataset.startPos = 89;
    }

    let startPos = Number(el.dataset.startPos);

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
