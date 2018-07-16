'use strict';

(function () {
  var INIT_COMMENTS_QUANTITY = 5;
  var COMMENT_AVATAR_WIDTH = 35;
  var COMMENT_AVATAR_HEIGHT = 35;
  var fragment = document.createDocumentFragment();
  var previewPicturesContainerElement = document.querySelector('.pictures');
  var previewPictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture__link');
  var detailedPictureContainerElement = document.querySelector('.big-picture');
  var detailedPictureLoadCommentsElement = detailedPictureContainerElement.querySelector('.social__loadmore');

  function createNewPicture(pictureData) {
    var previewPictureElement = previewPictureTemplateElement.cloneNode(true);
    var previewPictureImgElement = previewPictureElement.querySelector('.picture__img');
    var previewPictureLikesElement = previewPictureElement.querySelector('.picture__stat--likes');
    var previewPictureCommentsQuantityElement = previewPictureElement.querySelector('.picture__stat--comments');
    previewPictureImgElement.src = pictureData.url;
    previewPictureLikesElement.textContent = pictureData.likes;
    previewPictureCommentsQuantityElement.textContent = pictureData.comments.length;

    function showDatailedPicture() {
      renderDetailedPicture(pictureData);
      window.detailedImagePopup.show();
      window.gallery.saveFocusedElement(previewPictureElement);
    }

    previewPictureImgElement.addEventListener('click', function () {
      showDatailedPicture();
    });

    previewPictureElement.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, function () {
        showDatailedPicture();
      });
    });
    return previewPictureElement;
  }

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
      pictureToRenderComments.forEach(function (element, index) {
        var commentElement = document.createElement('li');
        var commentAvatarElement = document.createElement('img');
        var commentTextElement = document.createElement('p');
        commentElement.classList.add('social__comment');
        commentAvatarElement.classList.add('social__picture');
        commentAvatarElement.src = 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg';
        commentAvatarElement.width = COMMENT_AVATAR_WIDTH;
        commentAvatarElement.height = COMMENT_AVATAR_HEIGHT;
        commentAvatarElement.alt = 'Аватар комментатора фотографии';
        commentTextElement.classList.add('social__text');
        commentTextElement.textContent = element;

        if (index >= INIT_COMMENTS_QUANTITY) {
          commentElement.classList.add('visually-hidden');
        }

        commentElement.appendChild(commentAvatarElement);
        commentElement.appendChild(commentTextElement);

        detailedPictureCommentsListElement.appendChild(commentElement);
      });
    }

    function loadCommentsElementClickHandler() {
      var hiddenComments = detailedPictureCommentsListElement.querySelectorAll('.social__comment.visually-hidden');
      for (var i = 0; i < hiddenComments.length && i < INIT_COMMENTS_QUANTITY; i++) {
        hiddenComments[i].classList.remove('visually-hidden');
        if (i === hiddenComments.length - 1) {
          detailedPictureLoadCommentsElement.removeEventListener('click', loadCommentsElementClickHandler);
          detailedPictureLoadCommentsElement.classList.add('hidden');
        }
        window.render.commentsCount++;
      }
      detailedPictureCurrentCommentsQuantityElement.textContent = window.render.commentsCount;
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

  window.render = {
    preview: function (data) {
      data.map(function (it) {
        return new window.Picture(it);
      }).forEach(function (picture) {
        fragment.appendChild(createNewPicture(picture));
      });
      previewPicturesContainerElement.appendChild(fragment);
    },

    commentsCount: INIT_COMMENTS_QUANTITY,
    INIT_COMMENTS_QUANTITY: INIT_COMMENTS_QUANTITY
  };
})();
