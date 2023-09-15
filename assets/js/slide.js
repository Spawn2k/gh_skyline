'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgContainerEl = document.querySelector('.image-track');
  DOM.imgEls = document.querySelectorAll('.image-track .image');
  DOM.btnEls = document.querySelectorAll('.sec-6 button');
  DOM.mainImgEl = document.querySelector('.sec-6-main-img');
  DOM.modalEl = document.querySelector('.modal');
  let mouseDownCord = 0;
  // console.log(DOM);
  // === INIT =============
  const init = () => {
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    DOM.btnEls.forEach((btn) => {
      btn.addEventListener('click', onClickBtn);
    });
    DOM.imgEls.forEach((img) => {
      img.addEventListener('click', onClickImg);
    });
    DOM.mainImgEl.addEventListener('click', onClickImgModal);
  };

  // === EVENTHANDLER =====

  const onMouseDown = (e) => {
    DOM.imgContainerEl.dataset.mouseDownAt = e.clientX;
    mouseDownCord = e.clientX;
  };

  const onMouseMove = (e) => {
    // console.log(mouseDownCord);
    if (DOM.imgContainerEl.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(DOM.imgContainerEl.dataset.mouseDownAt) - e.clientX;

    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(DOM.imgContainerEl.dataset.prevPercentage) + percentage;

    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -100);

    DOM.imgEls.forEach((img) => {
      moveImage(img, nextPercentage);
    });

    DOM.imgContainerEl.dataset.percentage = nextPercentage;

    moveContainer(nextPercentage);
  };

  const onMouseUp = (e) => {
    DOM.imgContainerEl.dataset.mouseDownAt = '0';
    DOM.imgContainerEl.dataset.prevPercentage = DOM.imgContainerEl.dataset.percentage;
  };

  const onClickBtn = (e) => {
    let prevPercentage = Number(DOM.imgContainerEl.dataset.prevPercentage);
    const btnDataset = e.currentTarget.dataset.btn;
    if (btnDataset === 'forwards') {
      if (Number(prevPercentage) <= -100) return;

      moveContainer(prevPercentage, -25);

      DOM.imgEls.forEach((img) => {
        moveImage(img, prevPercentage, -25);
      });
      DOM.imgContainerEl.dataset.prevPercentage = +Number(prevPercentage - 25);
      DOM.imgContainerEl.dataset.percentage = +Number(prevPercentage - 25);
    }

    if (btnDataset === 'backwards') {
      if (prevPercentage >= 0) return;
      moveContainer(prevPercentage, 25);

      DOM.imgEls.forEach((img) => {
        moveImage(img, prevPercentage, 25);
      });

      DOM.imgContainerEl.dataset.prevPercentage = +Number(prevPercentage + 25);
      DOM.imgContainerEl.dataset.percentage = +Number(prevPercentage + 25);
    }
  };

  const onClickImg = (e) => {
    if (mouseDownCord !== e.clientX) {
      return;
    }
    const imgSrc = e.currentTarget.src.replace('http://127.0.0.1:5501/', '');
    DOM.mainImgEl.src = imgSrc;
    DOM.modalEl.classList.add('hide');
    setTimeout(() => {
      DOM.modalEl.style.display = 'none';
    }, 300);
  };

  const onClickImgModal = (e) => {
    // e.stopPropagation();
    console.log('click');
    DOM.modalEl.classList.remove('hide');
    DOM.modalEl.style.zIndex = '0';
    setTimeout(() => {
      DOM.modalEl.style.display = 'initial';
      DOM.modalEl.classList.add('show');
    }, 300);
    // DOM.modalEl.classList.add('show');
    // DOM.modalEl.animate(
    //   {
    //     opacity: 1,
    //     zIndex: 0,
    //   },
    //   {
    //     duration: 300,
    //     fill: 'forwards',
    //     easing: 'ease-in-out',
    //   }
    // );
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const moveContainer = (percent, offset = 0) => {
    DOM.imgContainerEl.animate(
      {
        transform: `translate(${percent + offset}%, -50%)`,
      },
      {
        duration: 1200,
        fill: 'forwards',
        easing: 'ease-out',
      }
    );
  };

  const moveImage = (el, percent, offset = 0) => {
    el.animate(
      {
        objectPosition: `${100 + percent + offset}% center`,
      },
      { duration: 1200, fill: 'forwards' }
    );
  };

  init();
})();
