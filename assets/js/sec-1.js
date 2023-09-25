'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgSubEls = document.querySelectorAll('.sec-1-img-mini');
  const mql = window.matchMedia('screen and (max-width:600px)');
  let offset = -150;
  if (mql.matches) {
    offset = -20;
  } else {
    offset = 0;
  }

  // === INIT =============
  const init = () => {
    const myObserver = new IntersectionObserver(
      (elements) => {
        elements.forEach((element) => {
          if (element.isIntersecting) {
            console.log(offset);
            showImg(element.target, element.intersectionRatio);
            if (element.intersectionRatio >= 1) {
              myObserver.unobserve(element.target);
            }
          }
        });
      },
      {
        root: window.document,
        rootMargin: `${offset}px`,
        threshold: generateThresholds(),
      }
    );

    DOM.imgSubEls.forEach((img) => {
      myObserver.observe(img);
    });
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const generateThresholds = () => {
    const threshold = [];
    for (let i = 1; i <= 101; i++) {
      threshold.push((i - 1) / 100);
    }
    return threshold;
  };

  const showImg = (el, ratio) => {
    el.style.opacity = ratio;
    el.style.transform = `rotateY(${-35 + ratio * 35}deg)`;
  };

  init();
})();
