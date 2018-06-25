'use strict';

(function () {
  var imgUploadSectionElement = document.querySelector('.img-upload');
  var imgUploadInputElement = imgUploadSectionElement.querySelector('#upload-file');
  var form = imgUploadSectionElement.querySelector('.img-upload__form');
  var tagsInputElement = form.querySelector('.text__hashtags');

  function validateTags() {
    var tagsString = tagsInputElement.value;
    var tags = tagsString.split(' ');

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i].trim();

      if (tag[0] === '#' && tag.length === 1) {
        tagsInputElement.setCustomValidity('хеш-тег не может состоять только из одной решётки');
        break;
      } else if (tag[0] !== '#') {
        tagsInputElement.setCustomValidity('хэш-тег должен начинаться с символа #');
        break;
      } else if (tag.indexOf('#', 1) > -1) {
        tagsInputElement.setCustomValidity('хэш-теги должны быть разделены пробелами');
        break;
      } else if (tag.length > 20) {
        tagsInputElement.setCustomValidity('максимальная длина одного хэш-тега составляет 20 символов, включая решётку');
        break;
      } else {
        tagsInputElement.setCustomValidity('');
      }
    }

    if (!window.util.checkUniqueElements(tags)) {
      tagsInputElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды; теги нечувствительны к регистру');
    } else if (tags.length > 5) {
      tagsInputElement.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
  }

  function successLoadHandler() {
    imgUploadSectionElement.classList.add('hidden');
    imgUploadInputElement.value = '';
  }

  function errorLoadHandler(message) {
    var errorBox = document.createElement('div');
    var errorText = document.createElement('p');
    errorBox.classList.add('error-message');
    errorBox.style.cssText = 'position: fixed; display: flex; width: 100vw; height: 100vh; z-index: 10; background: #22252A; opacity: 0.97; text-align: center;';
    errorText.style.cssText = 'background: #fff; color: #000; margin: auto; text-transform: none; padding: 10px 50px; font-size: 24px;';
    errorText.textContent = message;
    errorBox.appendChild(errorText);
    document.body.insertAdjacentElement('afterbegin', errorBox);

    function removeErrorBox() {
      document.body.removeChild(errorBox);
    }

    document.addEventListener('click', removeErrorBox);
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeErrorBox);
    });
  }

  tagsInputElement.addEventListener('input', function () {
    validateTags();
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.upload(data, successLoadHandler, errorLoadHandler);
  });
})();
