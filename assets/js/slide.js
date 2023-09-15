'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.imgContainerEl = document.querySelector('.image-track');
  DOM.imgEls = document.querySelectorAll('.image-track .image');
  DOM.btnEls = document.querySelectorAll('.sec-6 button');
  DOM.mainImgEl = document.querySelector('.sec-6-main-img');
  DOM.modalEl = document.querySelector('.modal');
  DOM.btnForwards = document.querySelector('[data-btn="forwards"]');
  DOM.btnBackwards = document.querySelector('[data-btn="backwards"]');

  let mouseDownCord = 0;
  // console.log(DOM);
  // === INIT =============
  const init = () => {
    DOM.modalEl.addEventListener('mousedown', onMouseDown);
    DOM.modalEl.addEventListener('mousemove', onMouseMove);
    DOM.modalEl.addEventListener('mouseup', onMouseUp);
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

    if (nextPercentage === 0) {
      DOM.btnBackwards.disabled = true;
    } else if (nextPercentage < 0) {
      DOM.btnBackwards.disabled = false;
    }

    if (nextPercentage <= -100) {
      DOM.btnForwards.disabled = true;
    } else if (nextPercentage > -100) {
      DOM.btnForwards.disabled = false;
    }
  };

  const onMouseUp = (e) => {
    DOM.imgContainerEl.dataset.mouseDownAt = '0';
    DOM.imgContainerEl.dataset.prevPercentage = DOM.imgContainerEl.dataset.percentage;
  };

  const onClickBtn = (e) => {
    let prevPercentage = Math.ceil(Number(DOM.imgContainerEl.dataset.prevPercentage));
    const btnDataset = e.currentTarget.dataset.btn;
    const btnBackwards = document.querySelector('[data-btn="backwards"]');
    const btnForwards = document.querySelector('[data-btn="forwards"]');
    let offset = 0;

    if (btnDataset === 'forwards') {
      offset = -25;

      if (Number(prevPercentage) <= -100) {
        e.currentTarget.disabled = true;
        return;
      }

      if (prevPercentage + offset < -100) {
        const newOffset = -100 - prevPercentage;
        offset = newOffset;
      }

      btnBackwards.disabled = false;
      moveContainer(prevPercentage, offset);

      DOM.imgEls.forEach((img) => {
        moveImage(img, prevPercentage, offset);
      });
      DOM.imgContainerEl.dataset.prevPercentage = +Number(prevPercentage + offset);
      DOM.imgContainerEl.dataset.percentage = +Number(prevPercentage + offset);
      prevPercentage = Math.ceil(Number(DOM.imgContainerEl.dataset.prevPercentage));
      if (Number(prevPercentage) <= -100) {
        e.currentTarget.disabled = true;
        return;
      }
    }

    if (btnDataset === 'backwards') {
      offset = 25;

      if (prevPercentage >= 0) {
        e.currentTarget.disabled = true;
        return;
      }

      if (prevPercentage + offset > 0) {
        const newOffset = prevPercentage + offset;
        offset -= newOffset;
      }

      btnForwards.disabled = false;

      moveContainer(prevPercentage, offset);

      DOM.imgEls.forEach((img) => {
        moveImage(img, prevPercentage, offset);
      });

      DOM.imgContainerEl.dataset.prevPercentage = +Number(prevPercentage + offset);
      DOM.imgContainerEl.dataset.percentage = +Number(prevPercentage + offset);
      prevPercentage = Math.ceil(Number(DOM.imgContainerEl.dataset.prevPercentage));

      if (prevPercentage >= 0) {
        e.currentTarget.disabled = true;
        return;
      }
    }
  };

  const onClickImg = (e) => {
    if (mouseDownCord !== e.clientX) {
      return;
    }
    const imgSrc = e.currentTarget;
    DOM.mainImgEl.src = imgSrc;
    DOM.modalEl.classList.add('hide');
    setTimeout(() => {
      DOM.modalEl.style.display = 'none';
    }, 300);
  };

  const onClickImgModal = (e) => {
    // e.stopPropagation();
    let percentage = Number(DOM.imgContainerEl.dataset.percentage);
    if (percentage <= 0) {
      DOM.btnBackwards.disabled = true;
    }
    if (percentage >= 100) {
      DOM.btnForwards.disabled = true;
    }

    DOM.modalEl.classList.remove('hide');
    DOM.modalEl.style.zIndex = '0';
    setTimeout(() => {
      DOM.modalEl.style.display = 'initial';
      DOM.modalEl.classList.add('show');
    }, 300);
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
