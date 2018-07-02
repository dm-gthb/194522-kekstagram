'use strict';

(function () {
  var previewPictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture__link');
  var detailedPictureContainerElement = document.querySelector('.big-picture');
  var detailedPictureLoadCommentsElement = detailedPictureContainerElement.querySelector('.social__loadmore');
  var INIT_COMMENTS_QUANTITY = 5;

  function renderDetailedPicture(pictureToRender) {
    var detailedPictureImgElement = detailedPictureContainerElement.querySelector('.big-picture__img img');
    var detailedPictureLikesElement = detailedPictureContainerElement.querySelector('.likes-count');
    var detailedPictureDescriptionElement = detailedPictureContainerElement.querySelector('.social__caption');
    var detailedPictureCommentsListElement = detailedPictureContainerElement.querySelector('.social__comments');
    var detailedPictureExampleCommentsElements = detailedPictureCommentsListElement.querySelectorAll('.social__comment');
    var detailedPictureCommentsCountContainerElement = detailedPictureContainerElement.querySelector('.social__comment-count');
    var detailedPictureAllCommentsQuantityElement = detailedPictureContainerElement.querySelector('.comments-count');
    var detailedPictureCurrentCommentsQuantityElement = detailedPictureContainerElement.querySelector('.comments-current');
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
        commentAvatarElement.src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
        commentAvatarElement.width = 35;
        commentAvatarElement.height = 35;
        commentAvatarElement.alt = 'Аватар комментатора фотографии';
        commentTextElement.classList.add('social__text');
        commentTextElement.textContent = pictureToRenderComments[i];

        if (i >= INIT_COMMENTS_QUANTITY) {
          commentElement.classList.add('visually-hidden');
        }

        commentElement.appendChild(commentAvatarElement);
        commentElement.appendChild(commentTextElement);

        detailedPictureCommentsListElement.appendChild(commentElement);
      }
    }

    function loadCommentsElementClickHandler() {
      var hiddenComments = detailedPictureCommentsListElement.querySelectorAll('.social__comment.visually-hidden');
      for (var i = 0; i < hiddenComments.length && i < INIT_COMMENTS_QUANTITY; i++) {
        hiddenComments[i].classList.remove('visually-hidden');
        if (i === hiddenComments.length - 1) {
          detailedPictureLoadCommentsElement.removeEventListener('click', loadCommentsElementClickHandler);
          detailedPictureLoadCommentsElement.classList.add('hidden');
        }
        window.picture.commentsCount++;
      }
      detailedPictureCurrentCommentsQuantityElement.textContent = window.picture.commentsCount;
    }

    detailedPictureImgElement.src = pictureToRender.url;
    detailedPictureLikesElement.textContent = pictureToRender.likes;
    detailedPictureDescriptionElement.textContent = pictureToRender.description;
    detailedPictureAllCommentsQuantityElement.textContent = pictureToRenderComments.length;
    detailedPictureCurrentCommentsQuantityElement.textContent = INIT_COMMENTS_QUANTITY;

    if (detailedPictureExampleCommentsElements) {
      deleteExampleComments();
    }

    renderDetailedPictureComments();
    detailedPictureCommentsCountContainerElement.classList.toggle('hidden', pictureToRenderComments.length <= INIT_COMMENTS_QUANTITY);
    detailedPictureLoadCommentsElement.classList.toggle('hidden', pictureToRenderComments.length <= INIT_COMMENTS_QUANTITY);

    if (pictureToRenderComments.length <= INIT_COMMENTS_QUANTITY) {
      detailedPictureCommentsCountContainerElement.classList.add('hidden');
      detailedPictureLoadCommentsElement.classList.add('hidden');
    } else {
      detailedPictureLoadCommentsElement.addEventListener('click', loadCommentsElementClickHandler);
    }
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
    },

    commentsCount: INIT_COMMENTS_QUANTITY
  };
})();
