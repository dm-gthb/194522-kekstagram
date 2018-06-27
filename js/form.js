'use strict';

(function () {
  var imgUploadElement = document.querySelector('.img-upload');
  var imgUploadOverlayElement = imgUploadElement.querySelector('.img-upload__overlay');
  var formElement = imgUploadElement.querySelector('.img-upload__form');
  var tagsInputElement = formElement.querySelector('.text__hashtags');

  function showErrorMessage(errorMessage) {
    tagsInputElement.setCustomValidity(errorMessage);
    tagsInputElement.style.border = '2px solid red';
  }

  function resetError() {
    tagsInputElement.setCustomValidity('');
    tagsInputElement.style.border = '2px solid rgb(238, 238, 238)';
  }

  function validateTags() {
    var tagsString = tagsInputElement.value;
    var tags = tagsString.split(' ');

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i].trim();

      if (tag[0] === '#' && tag.length === 1) {
        showErrorMessage('хеш-тег не может состоять только из одной решётки');
        break;
      } else if (tag[0] !== '#') {
        showErrorMessage('хэш-тег должен начинаться с символа #');
        break;
      } else if (tag.indexOf('#', 1) > -1) {
        showErrorMessage('хэш-теги должны быть разделены пробелами');
        break;
      } else if (tag.length > 20) {
        showErrorMessage('максимальная длина одного хэш-тега составляет 20 символов, включая решётку');
        break;
      } else {
        resetError();
      }
    }

    if (!window.util.checkUniqueElements(tags)) {
      showErrorMessage('один и тот же хэш-тег не может быть использован дважды; теги нечувствительны к регистру');
    } else if (tags.length > 5) {
      showErrorMessage('нельзя указать больше пяти хэш-тегов');
    }
  }

  function successLoadHandler() {
    imgUploadOverlayElement.classList.add('hidden');
    window.util.clearImgUploadData();
  }

  function errorLoadHandler(message) {
    window.util.showError(message);
  }

  tagsInputElement.addEventListener('input', function () {
    validateTags();
  });

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(formElement);
    window.backend.upload(successLoadHandler, errorLoadHandler, data);
  });
})();
