'use strict';

(function () {
  var detailedPictureContainerElement = document.querySelector('.big-picture');
  // picture.js also use var detailedPictureContainerElement
  var closeDetailedPictureElement = detailedPictureContainerElement.querySelector('.big-picture__cancel');

  function detailedPictureEscPressHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      window.util.isEscEvent(evt, hideDetailedPicture);
    }
  }

  function hideDetailedPicture() {
    detailedPictureContainerElement.classList.add('hidden');
    document.removeEventListener('keydown', detailedPictureEscPressHandler);
  }

  closeDetailedPictureElement.addEventListener('click', function () {
    hideDetailedPicture();
  });

  closeDetailedPictureElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, hideDetailedPicture);
  });

  window.detailedImagePopup = {
    show: function () {
      detailedPictureContainerElement.classList.remove('hidden');
      document.addEventListener('keydown', detailedPictureEscPressHandler);
    }
  };
})();
