'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var previewPicturesContainerElement = document.querySelector('.pictures');

  function renderPreviewPictures(picturesToRender) {
    for (var i = 0; i < picturesToRender.length; i++) {
      var newPreviewPicture = window.picture.renderPreview(picturesToRender[i]);
      fragment.appendChild(newPreviewPicture);
    }

    previewPicturesContainerElement.appendChild(fragment);
  }

  function errorLoadHandler(message) {
    window.util.handleError(message);
  }

  window.backend.download(renderPreviewPictures, errorLoadHandler, false);
})();
