'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min + 1));
    },

    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getPercent: function (current, max) {
      return current * 100 / max;
    },

    getFraction: function (current, max) {
      return current * max / 100;
    },

    getCoords: function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        left: box.left,
        right: box.right,
        top: box.top,
        bottom: box.bottom
      };
    },

    checkUniqueElements: function (array) {
      var i = 0;
      while (i < array.length - 1) {
        if (array.indexOf(array[i], i + 1) > -1) {
          return false;
        }
        i++;
      }
      return true;
    },

    resetAllClasses: function (element) {
      for (var i = 0; i < element.classList.length; i++) {
        element.classList.remove(element.classList[i]);
      }
    },

    addErrorBlock: function (message) {
      var errorBlock = document.createElement('div');
      var errorText = document.createElement('p');
      errorBlock.classList.add('error-message');
      errorBlock.style.cssText = 'position: fixed; display: flex; width: 100vw; height: 100vh; z-index: 10; background: #22252A; opacity: 0.97; text-align: center;';
      errorText.style.cssText = 'background: #fff; color: #000; margin: auto; text-transform: none; padding: 10px 50px; font-size: 24px;';
      errorText.textContent = message;
      errorBlock.appendChild(errorText);
      return errorBlock;
    }
  };
})();
