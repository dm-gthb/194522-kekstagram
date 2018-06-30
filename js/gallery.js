'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var previewPicturesContainerElement = document.querySelector('.pictures');
  var headerMenuElement = document.querySelector('.img-filters');

  var filtersContainerElement = headerMenuElement.querySelector('.img-filters__form');
  var buttonNewPictures = filtersContainerElement.querySelector('#filter-new');
  var buttonDiscussedPictures = filtersContainerElement.querySelector('#filter-discussed');
  var buttonPopularPictures = filtersContainerElement.querySelector('#filter-popular');

  var initLoadedPictures;
  var popularPictures;
  var discussedPictures;
  var clickedButton = document.querySelector('.img-filters__button--active');

  function deletePictures() {
    var previewPicturesElements = document.querySelectorAll('.picture__link');
    for (var i = 0; i < previewPicturesElements.length; i++) {
      previewPicturesContainerElement.removeChild(previewPicturesElements[i]);
    }
  }

  function getUniqueArrayElements(array, quantity) {
    var resultArray = [];
    for (var i = 0; i < quantity; i++) {
      var newElement = window.util.getRandomArrayElement(array);
      var isUnique = true;
      for (var k = 0; k < resultArray.length; k++) {
        if (resultArray[k] === newElement) {
          i--;
          isUnique = false;
        }
      }
      if (isUnique) {
        resultArray.push(newElement);
      }
    }
    return resultArray;
  }

  function getCommentsQuantity(picture) {
    return picture.comments.length;
  }

  function compareCommentsQuantity(left, right) {
    return getCommentsQuantity(right) - getCommentsQuantity(left);
  }

  function successLoadHandler(data) {
    initLoadedPictures = data;
    popularPictures = getUniqueArrayElements(initLoadedPictures, 10);
    var initLoadedPicturesCopy = initLoadedPictures.slice();
    discussedPictures = initLoadedPicturesCopy.sort(compareCommentsQuantity);

    renderPreviewPictures(initLoadedPictures);
    headerMenuElement.classList.remove('img-filters--inactive');
  }

  function errorLoadHandler(message) {
    window.util.showError(message);
  }

  filtersContainerElement.addEventListener('click', function (evt) {
    var target = evt.target;
    if (clickedButton !== target) {
      clickedButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
      clickedButton = target;
      deletePictures();
      switch (target) {
        case buttonPopularPictures:
          renderPreviewPictures(initLoadedPictures);
          break;
        case buttonNewPictures:
          renderPreviewPictures(popularPictures);
          break;
        case buttonDiscussedPictures:
          renderPreviewPictures(discussedPictures);
          break;
      }
    }
  });

  function renderPreviewPictures(picturesToRender) {
    for (var i = 0; i < picturesToRender.length; i++) {
      var newPreviewPicture = window.picture.renderPreview(picturesToRender[i]);
      fragment.appendChild(newPreviewPicture);
    }

    previewPicturesContainerElement.appendChild(fragment);
  }

  window.backend.download(successLoadHandler, errorLoadHandler, false);
})();
