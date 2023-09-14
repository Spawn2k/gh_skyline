'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.oldWord = document.querySelector('#current');
  DOM.newWord = document.querySelector('#next');

  console.log(DOM);
  const words = ['Warum', 'ist', 'das', 'so', '武', 'cool?!'];

  let currentWord = 0;

  // === INIT =============
  const init = () => {
    DOM.oldWord.textContent = words[currentWord];
    DOM.newWord.textContent = words[currentWord + 1];

    // setInterval(() => {
    //   startMorph();
    //   currentWord++;
    // }, 1000);
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const startMorph = () => {
    animateWord();
    setTimeout(() => {
      setWord(DOM.oldWord);
      setWord(DOM.newWord);
    }, 750);
  };

  const animateWord = () => {
    DOM.oldWord.classList.toggle('show');
    DOM.newWord.classList.toggle('show');
  };

  const setWord = (el) => {
    if (!el.classList.contains('show')) {
      el.textContent = words[(currentWord + 2) % words.length];
    }
  };

  init();
})();
