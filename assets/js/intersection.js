'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.els = document.querySelectorAll('.element');

  // === INIT =============
  const init = () => {
    const myObserver = new IntersectionObserver(
      (elements) => {
        elements.forEach((el) => {
          if (isTrigger(el.target, 'first')) {
            startMove(el.target, el.intersectionRatio);
          }
          if (isTrigger(el.target, 'second')) {
            startAnimation(el.target, el.isIntersecting);
          }
        });
      },
      {
        root: window.document,
        rootMargin: '0px',
        threshold: generateThresholds(),
      }
    );
    DOM.els.forEach((el) => {
      myObserver.observe(el);
    });

    console.log(generateThresholds());
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const isTrigger = (el, className) => {
    return el.classList.contains(className);
  };

  const generateThresholds = () => {
    const threshold = [];

    for (let i = 1; i <= 101; i++) {
      threshold.push((i - 1) / 100);
    }

    return threshold;
  };

  const startAnimation = (el, status) => {
    if (status) {
      el.classList.add('animation');
    } else {
      el.classList.remove('animation');
    }
  };

  const startMove = (el, ratio) => {
    el.style.opacity = ratio;
    el.style.transform = `rotate(${45 * ratio}deg)`;
  };

  init();
})();
