'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgGeishaEl = document.querySelector('.sec-3-img-geisha');
  DOM.imgCherry = document.querySelector('.sec-3-img-cherry');
  DOM.sec3El = document.querySelector('.sec-3');
  DOM.sec4ImgEls = document.querySelectorAll('.sec-4 .card');
  DOM.cityEl = DOM.sec4ImgEls[0].querySelector('p');
  let oldValue = 0;
  let up = '';
  let animation = false;
  // console.log(DOM);
  // === INIT =============
  const init = () => {
    window.addEventListener('scroll', onScroll);
    DOM.cityEl.addEventListener('animationend', (e) => {
      animation = true;
    });
  };

  // === EVENTHANDLER =====
  const onScroll = (e) => {
    // let top = window.scrollY;
    // let height = DOM.sec3El.offsetHeight;
    // let offset = DOM.sec3El.offsetTop - height + 550;
    // console.log(offset);
    getScrollDirection();

    // DOM.imgGeishaEl.style.setProperty('--yCord', `${(percent - 60) * 0.5}%`);
    // moveImg(DOM.imgGeishaEl, 0, 0.5);
    // DOM.imgCherry.style.setProperty('--yCord', `${percent * 0.4}%`);

    const mql700 = window.matchMedia('screen and (max-width:700px)');
    const mql1320 = window.matchMedia('screen and (min-width:701px)');

    if (mql1320.matches) {
      moveImg(DOM.imgGeishaEl, 600, 0.5);
      moveImg(DOM.imgCherry, 600, 0.5);
    }
    if (mql700.matches) {
      moveImg(DOM.imgGeishaEl, 1350, 0.5);
      moveImg(DOM.imgCherry, 1900, 0.5);
    }

    DOM.sec4ImgEls.forEach((img, idx) => {
      // let top = window.scrollY;
      // let height = img.offsetHeight;
      // let offset = img.offsetTop - height;

      const city = img.dataset.city;
      const cord = img.getBoundingClientRect();
      const offsetTop = cord.top;
      if (idx === 1) {
        changeCityTextScrollDown(img, idx);
        changeCityTextScrollUp(img);
      }
      if (idx === 2) {
        changeCityTextScrollDown(img, idx);
        changeCityTextScrollUp(img);
      }
      if (idx === 3) {
        changeCityTextScrollDown(img, idx);
        changeCityTextScrollUp(img);
      }
      if (idx === 4) {
        changeCityTextScrollDown(img, idx);
        changeCityTextScrollUp(img);
      }
    });
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const changeCityTextScrollUp = (el) => {
    const city = el.dataset.city;
    const cord = el.getBoundingClientRect();
    const offsetTop = cord.top;
    if (up !== 'up') return;
    if (offsetTop < 50) return;

    // console.log(el);
    if (offsetTop < 680) {
      if (DOM.cityEl.textContent === city) return;

      DOM.cityEl.classList.add('hide');
    }
    if (offsetTop < 570) {
      DOM.cityEl.classList.remove('hide');

      if (DOM.cityEl.textContent === city) return;

      DOM.cityEl.classList.add('reset');
    }

    if (offsetTop < 510) {
      DOM.cityEl.textContent = city;
      DOM.cityEl.classList.remove('reset');
    }
  };

  const changeCityTextScrollDown = (el, idx) => {
    const city = el.dataset.city;
    const prevCity = DOM.sec4ImgEls[idx - 1].dataset.city;
    const cord = el.getBoundingClientRect();
    const offsetTop = cord.top;
    // console.log(cord.height);
    if (up !== 'down') return;

    if (offsetTop > 150 && offsetTop < cord.height) {
      // if (DOM.cityEl.textContent === prevCity) return;
      DOM.cityEl.classList.add('hide');
    }

    if (offsetTop > 250 && offsetTop < cord.height) {
      DOM.cityEl.textContent = '';
      DOM.cityEl.classList.remove('hide');
      if (!DOM.cityEl.classList.contains('reset')) {
        DOM.cityEl.classList.add('reset');
      }
    }
    if (offsetTop > 350 && offsetTop < cord.height) {
      DOM.cityEl.textContent = prevCity;
      DOM.cityEl.classList.remove('reset');
    }
  };

  const getScrollDirection = () => {
    let newValue = 0;
    newValue = window.scrollY;

    //Subtract the two and conclude
    if (oldValue - newValue < 0) {
      up = 'up';
    } else if (oldValue - newValue > 0) {
      up = 'down';
    }
    // Update the old value
    oldValue = newValue;
  };

  const moveImg = (img, pos = 0, speed) => {
    let top = window.scrollY;
    let height = DOM.sec3El.offsetHeight;
    let offset = DOM.sec3El.offsetTop - height + pos;
    const percent = (top - offset) / 10;
    if (top >= offset && top < offset + height) {
      img.style.setProperty('--yCord', `${percent * speed}%`);
    }
  };

  init();
})();
