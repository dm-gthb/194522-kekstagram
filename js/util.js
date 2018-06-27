'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;
  var imgUploadElement = document.querySelector('.img-upload');
  var imgUploadInputElement = imgUploadElement.querySelector('#upload-file');
  var imgUploadTagsInputElement = imgUploadElement.querySelector('.text__hashtags');
  var imgUploadDescription = imgUploadElement.querySelector('.text__description');
  var processedImageElement = imgUploadElement.querySelector('.img-upload__preview img');
  var effectDepthControlElement = imgUploadElement.querySelector('.scale__pin');
  var effectDepthLineColorFillElement = imgUploadElement.querySelector('.scale__level');
  var firstEffectPreviewElement = imgUploadElement.querySelector('#effect-none');

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

    showError: function (message) {
      var errorBlock = document.querySelector('#picture').content.querySelector('.img-upload__message--error').cloneNode(true);
      errorBlock.textContent = message;
      errorBlock.style.zIndex = 10;
      errorBlock.classList.remove('hidden');
      document.body.insertAdjacentElement('afterbegin', errorBlock);

      function removeErrorBlock() {
        document.body.removeChild(errorBlock);
      }

      document.addEventListener('click', function () {
        removeErrorBlock();
      });

      document.addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, removeErrorBlock);
      });
    },

    clearImgUploadData: function () {
      imgUploadInputElement.value = '';
      imgUploadTagsInputElement.value = '';
      imgUploadDescription.value = '';
      window.util.resetAllClasses(processedImageElement);
      processedImageElement.style.filter = '';
      effectDepthLineColorFillElement.style.width = '100%';
      effectDepthControlElement.style.left = '100%';
      firstEffectPreviewElement.checked = 'true';
    }
  };
})();
