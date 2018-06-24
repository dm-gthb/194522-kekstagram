'use strict';

(function () {
  var PICTURES_ITEMS_QUANTITY = 25;
  var fragment = document.createDocumentFragment();
  var previewPicturesContainerElement = document.querySelector('.pictures');

  function renderPreviewPictures(picturesToRender) {
    for (var i = 0; i < picturesToRender.length; i++) {
      var newPreviewPicture = window.picture.renderPreview(picturesToRender[i]);
      fragment.appendChild(newPreviewPicture);
    }

    previewPicturesContainerElement.appendChild(fragment);
  }

  renderPreviewPictures(window.data.generatePictures(PICTURES_ITEMS_QUANTITY));
})();
