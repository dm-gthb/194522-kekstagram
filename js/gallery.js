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
    var errorBlock = window.util.addErrorBlock(message);
    document.body.insertAdjacentElement('afterbegin', errorBlock);

    function removeErrorBlock() {
      document.body.removeChild(errorBlock);
    }

    document.addEventListener('click', function () {
      removeErrorBlock();
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeErrorBlock);
    });
  }

  window.backend.download(renderPreviewPictures, errorLoadHandler, false);
})();
