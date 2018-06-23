'use strict';

(function () {
  var tagsContainerForNewPictureElement = document.querySelector('.text__hashtags');
  var imgUploadSectionElement = document.querySelector('.img-upload__overlay');
  var imgUploadInputElement = document.querySelector('#upload-file');
  var imgUploadSectionCloseElement = imgUploadSectionElement.querySelector('.img-upload__cancel');

  function imgUploadSectionEscPressHandler(evt) {
    if (evt.target !== tagsContainerForNewPictureElement && evt.target.tagName !== 'TEXTAREA') {
      window.util.isEscEvent(evt, hideImgUploadSection);
    }
  }

  function showImgUploadSection() {
    imgUploadSectionElement.classList.remove('hidden');
    document.addEventListener('keydown', imgUploadSectionEscPressHandler);
  }

  function hideImgUploadSection() {
    imgUploadSectionElement.classList.add('hidden');
    document.removeEventListener('keydown', imgUploadSectionEscPressHandler);
    imgUploadInputElement.value = '';
  }

  imgUploadInputElement.addEventListener('change', function () {
    showImgUploadSection();
  });

  imgUploadSectionCloseElement.addEventListener('click', function () {
    hideImgUploadSection();
  });

  imgUploadSectionCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, hideImgUploadSection);
  });
})();
