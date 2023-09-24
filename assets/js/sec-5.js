'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgEls = document.querySelectorAll('.sec-5-img');
  DOM.infoEl = document.querySelector('.sec-5-info');
  DOM.fadeInEls = document.querySelectorAll('.sec-5-fade-in');
  DOM.japEl = document.querySelector('.jap');
  DOM.sec5ContentEl = document.querySelector('.sec-5 .content-wraper');
  DOM.bushidoEngTextEls = document.querySelectorAll('.bushido-eng');
  DOM.bushidoJapTextEls = document.querySelectorAll('.bushido-jap');

  // console.log(DOM);

  // === INIT =============
  const init = () => {
    const myObserver = new IntersectionObserver(
      (elements) => {
        elements.forEach((element) => {
          let ratio = element.intersectionRatio;

          if (element.isIntersecting) {
            element.target.classList.add('active');

            // if (DOM.imgEls[DOM.imgEls.length - 1] === element.target) {
            //   showEl(DOM.japEl, ratio);
            // }
            // console.log(elements[elements.length - 1]);
          }
        });
      },
      {
        root: window.document,
        rootMargin: '-150px',
        threshold: [0, 1],
      }
    );

    DOM.imgEls.forEach((img) => {
      myObserver.observe(img);
    });

    const myObserverInfoText = new IntersectionObserver(
      (elements) => {
        elements.forEach((element, idx) => {
          let ratio = element.intersectionRatio;

          if (element.isIntersecting) {
            if (element.target === DOM.fadeInEls[0]) {
              console.log('first');
              showEl(DOM.japEl, ratio);
            }

            // console.log(element.target);
            showEl(element.target, ratio);

            if (ratio >= 1) {
              if (idx === 0) {
                DOM.sec5ContentEl.addEventListener('mouseover', onMouseOver);
              }
              myObserverInfoText.unobserve(element.target);
            }
          }
        });
      },
      {
        root: window.document,
        rootMargin: '0px',
        threshold: generateThresholds(),
      }
    );

    DOM.fadeInEls.forEach((el) => {
      myObserverInfoText.observe(el);
    });
  };

  // === EVENTHANDLER =====

  const onMouseOver = (e) => {
    DOM.bushidoEngTextEls.forEach((el) => el.classList.add('show'));
    DOM.bushidoJapTextEls.forEach((el) => el.classList.add('hide'));
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const showEl = (el, ratio) => {
    el.style.opacity = ratio;
  };

  const generateThresholds = () => {
    const threshold = [];
    for (let i = 1; i <= 101; i++) {
      threshold.push((i - 1) / 100);
    }

    return threshold;
  };

  init();
})();
