'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgSubEls = document.querySelectorAll('.sec-1-img-mini');

  // === INIT =============
  const init = () => {
    const myObserver = new IntersectionObserver(
      (elements) => {
        elements.forEach((element) => {
          if (element.isIntersecting) {
            showImg(element.target, element.intersectionRatio);
            if (element.intersectionRatio >= 1) {
              myObserver.unobserve(element.target);
            }
          }
        });
      },
      {
        root: window.document,
        rootMargin: '-150px',
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
