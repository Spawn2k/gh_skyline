'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgContainerEls = document.querySelectorAll('.sec-2-img-container');
  DOM.imgTriggerEl = document.querySelector('.img-trigger');
  DOM.pEls = document.querySelectorAll('.sec-2-info');
  console.log(DOM);
  // === INIT =============
  const init = () => {
    // DOM.imgContainerEls.forEach((img) => {
    //   img.addEventListener('click', onClickImg);
    // });

    window.addEventListener('scroll', onScroll);
  };

  // === EVENTHANDLER =====

  // const onClickImg = (e) => {
  //   const img = e.currentTarget;
  //   img.classList.add('active');
  // };

  const onScroll = (e) => {
    let top = window.scrollY;
    let offset = DOM.imgTriggerEl.offsetTop - 700;
    let height = DOM.imgTriggerEl.offsetHeight;
    // console.log(offset);
    if (top >= offset && top < offset + height) {
      DOM.imgContainerEls.forEach((img) => img.classList.add('active'));
      DOM.pEls.forEach((el) => el.classList.add('active'));
    }
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
