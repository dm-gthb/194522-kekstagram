'use strict';

(function () {
  var imgUploadElement = document.querySelector('.img-upload');
  var imgUploadOverlayElement = imgUploadElement.querySelector('.img-upload__overlay');
  var tagsInputElement = imgUploadElement.querySelector('.text__hashtags');
  var imgUploadOverlayCloseElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');

  function imgUploadSectionEscPressHandler(evt) {
    var imgUploadErrorElement = document.querySelector('.img-upload__message--error');
    if (evt.target !== tagsInputElement && evt.target.tagName !== 'TEXTAREA' && !imgUploadErrorElement) {
      window.utils.isEscEvent(evt, hideImgUploadSection);
    }
  }

  function hideImgUploadSection() {
    imgUploadOverlayElement.classList.add('hidden');
    document.removeEventListener('keydown', imgUploadSectionEscPressHandler);
    window.form.clear();
  }

  imgUploadOverlayCloseElement.addEventListener('click', function () {
    hideImgUploadSection();
  });

  imgUploadOverlayCloseElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, hideImgUploadSection);
  });

  window.uploadImageDialog = {
    show: function () {
      imgUploadOverlayElement.classList.remove('hidden');
      document.addEventListener('keydown', imgUploadSectionEscPressHandler);
    }
  };
})();
