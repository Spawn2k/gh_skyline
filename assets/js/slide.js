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
  DOM.h2el = document.querySelector('.sec-6 h2');
  DOM.contentWraperEl = document.querySelector('.sec-6 .content-wraper');
  DOM.escapeBtnEl = document.querySelector('.escape');

  const ACTIVE_COLOR = '#00fff1';
  const DEACTIVE_ACTIVE_COLOR = '#239993';

  console.log(DOM);
  let mouseDownCord = 0;

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

    DOM.escapeBtnEl.addEventListener('click', onClickEscapeBtn);
  };

  // === EVENTHANDLER =====

  const onMouseDown = (e) => {
    DOM.imgContainerEl.dataset.mouseDownAt = e.clientX;
    mouseDownCord = e.clientX;
  };

  const onMouseMove = (e) => {
    if (DOM.imgContainerEl.dataset.mouseDownAt === '0') return;

    const mouseDelta = parseFloat(DOM.imgContainerEl.dataset.mouseDownAt) - e.clientX;

    let maxDelta = 0;

    const mql1200 = window.matchMedia('screen and (max-width:1200px)');
    if (mql1200.matches) {
      maxDelta = window.innerWidth * 1.5;
    } else {
      maxDelta = window.innerWidth / 2;
    }
    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(DOM.imgContainerEl.dataset.prevPercentage) + percentage;

    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -100);

    DOM.imgEls.forEach((img) => {
      moveImage(img, nextPercentage);
    });

    DOM.imgContainerEl.dataset.percentage = nextPercentage;

    moveContainer(nextPercentage);

    toggleControllBtn(nextPercentage);
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
      DOM.btnBackwards.querySelector('i').style.color = '#00fff1';
      if (prevPercentage + offset < -100) {
        const newOffset = -100 - prevPercentage;
        offset = newOffset;
      }

      moveContainer(prevPercentage, offset);

      DOM.imgEls.forEach((img) => {
        moveImage(img, prevPercentage, offset);
      });

      setPercent(prevPercentage, offset);
      prevPercentage = Math.ceil(Number(DOM.imgContainerEl.dataset.prevPercentage));
      toggleControllBtn(prevPercentage);
    }

    if (btnDataset === 'backwards') {
      offset = 25;
      if (prevPercentage + offset > 0) {
        const newOffset = prevPercentage + offset;
        offset -= newOffset;
      }

      moveContainer(prevPercentage, offset);

      DOM.imgEls.forEach((img) => {
        moveImage(img, prevPercentage, offset);
      });

      setPercent(prevPercentage, offset);
      prevPercentage = Math.ceil(Number(DOM.imgContainerEl.dataset.prevPercentage));
      toggleControllBtn(prevPercentage);
    }
  };

  const onClickImg = (e) => {
    if (mouseDownCord !== e.clientX) {
      return;
    }

    const imgNumber = Number(e.currentTarget.dataset.img);
    const imgSrc = e.currentTarget.src.replace('http://127.0.0.1:5501/', '');
    const imgTitle = e.currentTarget.dataset.title;

    if (imgNumber !== 1 && imgNumber !== 2) {
      setImgPosition();
    }

    setTimeout(() => {
      DOM.contentWraperEl.classList.add('show');
    }, 300);

    DOM.mainImgEl.src = imgSrc;
    DOM.h2el.textContent = imgTitle;
    DOM.modalEl.classList.add('hide');
  };

  const onClickImgModal = (e) => {
    let percentage = Number(DOM.imgContainerEl.dataset.percentage);

    toggleControllBtn(percentage);

    DOM.modalEl.classList.remove('hide');
    DOM.contentWraperEl.classList.remove('show');
  };

  const onClickEscapeBtn = (e) => {
    DOM.modalEl.classList.add('hide');
    setTimeout(() => {
      DOM.contentWraperEl.classList.add('show');
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

  const toggleControllBtn = (percent) => {
    const forwardSvg = DOM.btnForwards.querySelector('i');
    const backwardsSvg = DOM.btnBackwards.querySelector('i');

    if (percent === 0) {
      DOM.btnBackwards.disable = true;
      backwardsSvg.style.color = DEACTIVE_ACTIVE_COLOR;
    } else {
      DOM.btnBackwards.disable = false;
      backwardsSvg.style.color = ACTIVE_COLOR;
    }

    if (percent === -100) {
      DOM.btnForwards.disable = true;
      forwardSvg.style.color = DEACTIVE_ACTIVE_COLOR;
    } else {
      DOM.btnForwards.disable = false;
      forwardSvg.style.color = ACTIVE_COLOR;
    }
  };

  const setPercent = (percent, offset) => {
    DOM.imgContainerEl.dataset.prevPercentage = +Number(percent + offset);
    DOM.imgContainerEl.dataset.percentage = +Number(percent + offset);
  };

  const setImgPosition = () => {
    DOM.mainImgEl.style.objectPosition = `50% 50%`;
  };

  init();
})();
