'use strict';

(function () {
  var detailedPictureContainerElement = document.querySelector('.big-picture');
  var closeDetailedPictureElement = detailedPictureContainerElement.querySelector('.big-picture__cancel');

  function detailedPictureEscPressHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      window.utils.isEscEvent(evt, hideDetailedPicture);
    }
  }

  function hideDetailedPicture() {
    detailedPictureContainerElement.classList.add('hidden');
    document.removeEventListener('keydown', detailedPictureEscPressHandler);
    window.picture.commentsCount = 5;
    var previewLastClicked = window.gallery.getFocusedElement();
    previewLastClicked.parentNode.focus();
  }

  closeDetailedPictureElement.addEventListener('click', function () {
    hideDetailedPicture();
  });

  closeDetailedPictureElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, hideDetailedPicture);
  });

  window.detailedImagePopup = {
    show: function () {
      detailedPictureContainerElement.classList.remove('hidden');
      document.addEventListener('keydown', detailedPictureEscPressHandler);
      detailedPictureContainerElement.focus();
    }
  };
})();
