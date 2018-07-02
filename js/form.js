'use strict';

(function () {
  var ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgUploadElement = document.querySelector('.img-upload');
  var imgUploadOverlayElement = imgUploadElement.querySelector('.img-upload__overlay');
  var formElement = imgUploadElement.querySelector('.img-upload__form');
  var tagsInputElement = formElement.querySelector('.text__hashtags');
  var processedImageContainerElement = imgUploadElement.querySelector('.img-upload__preview');
  var processedImageElement = imgUploadElement.querySelector('.img-upload__preview img');
  var fileChooserElement = imgUploadElement.querySelector('#upload-file');
  var effectDepthControlElement = imgUploadElement.querySelector('.scale__pin');
  var effectDepthLineColorFillElement = imgUploadElement.querySelector('.scale__level');
  var effectDepthContainerElement = imgUploadElement.querySelector('.img-upload__scale');
  var buttonSubmit = formElement.querySelector('.img-upload__submit');

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

    if (!window.utils.checkUniqueElements(tags)) {
      showErrorMessage('один и тот же хэш-тег не может быть использован дважды; теги нечувствительны к регистру');
    } else if (tags.length > 5) {
      showErrorMessage('нельзя указать больше пяти хэш-тегов');
    }
  }

  function successLoadHandler() {
    imgUploadOverlayElement.classList.add('hidden');
    window.form.clear();
    buttonSubmit.disabled = false;
  }

  function errorLoadHandler(message) {
    window.utils.showError(message);
    buttonSubmit.disabled = false;
  }

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();
    var matches = ALLOWED_FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        processedImageElement.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  tagsInputElement.addEventListener('input', function () {
    validateTags();
  });

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    buttonSubmit.disabled = true;
    var data = new FormData(formElement);
    window.backend.upload(successLoadHandler, errorLoadHandler, data);
  });

  window.form = {
    clear: function () {
      formElement.reset();
      window.utils.resetAllClasses(processedImageElement);
      processedImageElement.style.filter = '';
      effectDepthLineColorFillElement.style.width = '100%';
      effectDepthControlElement.style.left = '100%';
      effectDepthContainerElement.classList.add('hidden');
      processedImageContainerElement.style.transform = 'scale(1)';
      window.scalePhoto = 100;
    }
  };
})();
