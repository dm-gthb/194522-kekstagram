'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var previewPicturesContainerElement = document.querySelector('.pictures');
  var headerMenuElement = document.querySelector('.img-filters');
  var filtersContainerElement = headerMenuElement.querySelector('.img-filters__form');
  var clickedButton = document.querySelector('.img-filters__button--active');
  var popularFilterControlElement = filtersContainerElement.querySelector('#filter-popular');
  var newFilterControlElement = filtersContainerElement.querySelector('#filter-new');
  var discussedFilterControlElement = filtersContainerElement.querySelector('#filter-discussed');
  var initLoadedPictures;
  var popularPictures;
  var discussedPictures;

  function renderPreviewPictures(picturesToRender) {
    for (var i = 0; i < picturesToRender.length; i++) {
      var newPreviewPicture = window.picture.renderPreview(picturesToRender[i]);
      fragment.appendChild(newPreviewPicture);
    }

    previewPicturesContainerElement.appendChild(fragment);
  }

  function updatePreviewPictures(newPictures) {
    deletePictures();
    renderPreviewPictures(newPictures);
  }

  function deletePictures() {
    var previewPicturesElements = document.querySelectorAll('.picture__link');
    for (var i = 0; i < previewPicturesElements.length; i++) {
      previewPicturesContainerElement.removeChild(previewPicturesElements[i]);
    }
  }

  function getCommentsQuantity(picture) {
    return picture.comments.length;
  }

  function compareCommentsQuantity(left, right) {
    return getCommentsQuantity(right) - getCommentsQuantity(left);
  }

  function successLoadHandler(data) {
    initLoadedPictures = data;
    popularPictures = window.util.getUniqueArrayElements(initLoadedPictures, 10);
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


      switch (target) {
        case popularFilterControlElement:
          window.debounce(function () {
            updatePreviewPictures(initLoadedPictures);
          });
          break;

        case newFilterControlElement:
          window.debounce(function () {
            updatePreviewPictures(popularPictures);
          });
          break;

        case discussedFilterControlElement:
          window.debounce(function () {
            updatePreviewPictures(discussedPictures);
          });
          break;
      }
    }
  });

  window.backend.download(successLoadHandler, errorLoadHandler, false);
})();
