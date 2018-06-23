'use strict';

(function () {
  var tagsContainerForNewPictureElement = document.querySelector('.text__hashtags');

  function validateTags() {
    var tagsString = tagsContainerForNewPictureElement.value;
    var tags = tagsString.split(' ');

    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i].trim();

      if (tag[0] === '#' && tag.length === 1) {
        tagsContainerForNewPictureElement.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (tag[0] !== '#') {
        tagsContainerForNewPictureElement.setCustomValidity('хэш-тег должен начинаться с символа #');
      } else if (tag.indexOf('#', 1) > -1) {
        tagsContainerForNewPictureElement.setCustomValidity('хэш-теги должны быть разделены пробелами');
      } else if (tag.length > 20) {
        tagsContainerForNewPictureElement.setCustomValidity('максимальная длина одного хэш-тега составляет 20 символов, включая решётку');
      } else {
        tagsContainerForNewPictureElement.setCustomValidity('');
      }
    }

    if (!window.util.checkUniqueElements(tags)) {
      tagsContainerForNewPictureElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды; теги нечувствительны к регистру');
    } else if (tags.length > 5) {
      tagsContainerForNewPictureElement.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
  }

  tagsContainerForNewPictureElement.addEventListener('input', function () {
    validateTags();
  });
})();
