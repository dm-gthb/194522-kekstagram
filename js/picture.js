'use strict';

(function () {
  var previewPictureTemplateElement = document.querySelector('#picture').content;
  var detailedPictureContainerElement = document.querySelector('.big-picture');

  function renderDetailedPicture(pictureToRender) {
    var detailedPictureImgElement = detailedPictureContainerElement.querySelector('.big-picture__img img');
    var detailedPictureLikesElement = detailedPictureContainerElement.querySelector('.likes-count');
    var detailedPictureDescriptionElement = detailedPictureContainerElement.querySelector('.social__caption');
    var detailedPictureCommentsListElement = detailedPictureContainerElement.querySelector('.social__comments');
    var detailedPictureExampleCommentsElements = detailedPictureCommentsListElement.querySelectorAll('.social__comment');
    var detailedPictureCommentsQuantityElement = detailedPictureContainerElement.querySelector('.comments-count');
    var pictureToRenderComments = pictureToRender.comments;

    function deleteExampleComments() {
      for (var i = 0; i < detailedPictureExampleCommentsElements.length; i++) {
        detailedPictureCommentsListElement.removeChild(detailedPictureExampleCommentsElements[i]);
      }
    }

    function renderDetailedPictureComments() {
      for (var i = 0; i < pictureToRenderComments.length; i++) {
        var commentElement = document.createElement('li');
        var commentAvatarElement = document.createElement('img');
        var commentTextElement = document.createElement('p');
        commentElement.classList.add('social__comment');
        commentAvatarElement.classList.add('social__picture');
        commentAvatarElement.src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
        commentAvatarElement.width = '35';
        commentAvatarElement.height = '35';
        commentAvatarElement.alt = 'Аватар комментатора фотографии';
        commentTextElement.classList.add('social__text');
        commentTextElement.textContent = pictureToRenderComments[i];

        commentElement.appendChild(commentAvatarElement);
        commentElement.appendChild(commentTextElement);
        detailedPictureCommentsListElement.appendChild(commentElement);
      }
    }

    detailedPictureImgElement.src = pictureToRender.url;
    detailedPictureLikesElement.textContent = pictureToRender.likes;
    detailedPictureDescriptionElement.textContent = pictureToRender.description;
    detailedPictureCommentsQuantityElement.textContent = pictureToRenderComments.length;

    if (detailedPictureExampleCommentsElements) {
      deleteExampleComments();
    }

    renderDetailedPictureComments();
  }

  window.picture = {
    renderPreview: function (pictureToRender) {
      var previewPictureElement = previewPictureTemplateElement.cloneNode(true);
      var previewPictureImgElement = previewPictureElement.querySelector('.picture__img');
      var previewPictureLikesElement = previewPictureElement.querySelector('.picture__stat--likes');
      var previewPictureCommentsQuantityElement = previewPictureElement.querySelector('.picture__stat--comments');
      previewPictureImgElement.src = pictureToRender.url;
      previewPictureLikesElement.textContent = pictureToRender.likes;
      previewPictureCommentsQuantityElement.textContent = pictureToRender.comments.length;

      previewPictureImgElement.addEventListener('click', function () {
        renderDetailedPicture(pictureToRender);
        window.detailedImagePopup.show();
      });
      return previewPictureElement;
    }
  };
})();
