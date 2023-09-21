'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgContainerEls = document.querySelectorAll('.sec-2-img-container');
  DOM.imgTriggerEl = document.querySelector('.img-trigger');
  DOM.pEls = document.querySelectorAll('.sec-2-info');
  const body = document.body;
  let lastScroll = 0;
  // console.log(DOM);
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
    // navOnScrollReveal(e)
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

  // const navOnScrollReveal = (e) => {
  //   const currentScroll = window.pageYOffset;
  //   if (currentScroll <= 0) {
  //     body.classList.remove('scroll-up');
  //     return;
  //   }

  //   if (currentScroll > lastScroll && !body.classList.contains('scroll-down')) {
  //     body.classList.remove('scroll-up');
  //     body.classList.add('scroll-down');
  //   } else if (currentScroll < lastScroll && body.classList.contains('scroll-down')) {
  //     body.classList.remove('scroll-down');
  //     body.classList.add('scroll-up');
  //   }
  //   lastScroll = currentScroll;
  // };

  init();
})();
