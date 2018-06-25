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

  function loadErrorHandler(message) {
    var errorBox = document.createElement('div');
    var errorText = document.createElement('p');
    errorBox.classList.add('error-message');
    errorBox.style.cssText = 'position: fixed; display: flex; width: 100vw; height: 100vh; z-index: 10; background: #22252A; opacity: 0.97; text-align: center;';
    errorText.style.cssText = 'background: #fff; color: #000; margin: auto; text-transform: none; padding: 10px 50px; opacity: 1; font-size: 24px;';
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

  window.backend.download(renderPreviewPictures, loadErrorHandler);
})();
