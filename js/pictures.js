'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESC_KEY = 27;
  var PICTURES_ITEMS_QUANTITY = 25;
  var TEST_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var TEST_DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;
  var SCALE_STEP_VALUE = 25;
  var fragment = document.createDocumentFragment();
  var picturesItems = [];
  var previewPicturesContainerElement = document.querySelector('.pictures');
  var previewPictureTemplateElement = document.querySelector('#picture').content;
  var detailedPictureContainerElement = document.querySelector('.big-picture');
  var detailedPictureCommentsCountElement = detailedPictureContainerElement.querySelector('.social__comment-count');
  var detailedPictureLoadCommentsElement = detailedPictureContainerElement.querySelector('.social__loadmore');
  var closeDetailedPictureElement = detailedPictureContainerElement.querySelector('.big-picture__cancel');
  var imgUploadElement = document.querySelector('#upload-file');
  var effectsSectionElement = document.querySelector('.img-upload__overlay');
  var processedImageContainerElement = effectsSectionElement.querySelector('.img-upload__preview');
  var processedImageElement = effectsSectionElement.querySelector('.img-upload__preview img');
  var effectsListElement = effectsSectionElement.querySelector('.effects__list');
  var effectScaleElement = effectsSectionElement.querySelector('.img-upload__scale');
  var effectsSectionCloseElement = effectsSectionElement.querySelector('.img-upload__cancel');
  var scalePlusElement = effectsSectionElement.querySelector('.resize__control--plus');
  var scaleMinusElement = effectsSectionElement.querySelector('.resize__control--minus');
  var scaleValueElement = effectsSectionElement.querySelector('.resize__control--value');
  var scaleValueNum = parseInt(scaleValueElement.value, 10);
  var effectControlElement = effectsSectionElement.querySelector('.scale__pin');
  var tagsContainerForNewPictureElement = effectsSectionElement.querySelector('.text__hashtags');
  var descriptionContainerForNewPictureElement = effectsSectionElement.querySelector('.text__description');


  function getRandomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateRandomComments(quantity) {
    var comments = [];
    var commentsAmount = getRandomNum(1, quantity);
    for (var i = 0; i < commentsAmount; i++) {
      comments[i] = getRandomArrayElement(TEST_COMMENTS);
    }

    return comments;
  }

  function generatePictureData(index) {
    return {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: getRandomNum(15, 200),
      comments: generateRandomComments(5),
      description: getRandomArrayElement(TEST_DESCRIPTIONS)
    };
  }

  function generatePictures(quantity) {
    for (var i = 0; i < quantity; i++) {
      picturesItems[i] = generatePictureData(i);
    }
    return picturesItems;
  }

  function renderPreviewPicture(pictureToRender) {
    var previewPictureElement = previewPictureTemplateElement.cloneNode(true);
    var previewPictureImgElement = previewPictureElement.querySelector('.picture__img');
    var previewPictureLikesElement = previewPictureElement.querySelector('.picture__stat--likes');
    var previewPictureCommentsQuantityElement = previewPictureElement.querySelector('.picture__stat--comments');
    previewPictureImgElement.src = pictureToRender.url;
    previewPictureLikesElement.textContent = pictureToRender.likes;
    previewPictureCommentsQuantityElement.textContent = pictureToRender.comments.length;

    previewPictureImgElement.addEventListener('click', function () {
      renderDetailedPicture(pictureToRender);
      showDetailedPicture();
    });
    return previewPictureElement;
  }

  function renderPreviewPictures(picturesToRender) {
    for (var i = 0; i < picturesToRender.length; i++) {
      var newPreviewPicture = renderPreviewPicture(picturesToRender[i]);
      fragment.appendChild(newPreviewPicture);
    }

    previewPicturesContainerElement.appendChild(fragment);
  }

  function showDetailedPicture() {
    detailedPictureContainerElement.classList.remove('hidden');
    document.addEventListener('keydown', detailedPictureEscPressHandler);
  }

  function detailedPictureEscPressHandler(evt) {
    if (evt.keyCode === ESC_KEY && evt.target.tagName !== 'INPUT') {
      hideDetailedPicture();
    }
  }

  function hideDetailedPicture() {
    detailedPictureContainerElement.classList.add('hidden');
    document.removeEventListener('keydown', detailedPictureEscPressHandler);
  }

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
        commentAvatarElement.src = 'img/avatar-' + getRandomNum(1, 6) + '.svg';
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

  function initBaseProperties() {
    effectScaleElement.classList.add('hidden');
    if (scaleValueNum === 100) {
      scalePlusElement.setAttribute('disabled', true);
    }
  }

  function effectsSectionEscPressHandler(evt) {
    if (evt.keyCode === ESC_KEY && evt.target.tagName !== 'INPUT' && evt.target.tagName !== 'TEXTAREA') {
      hideEffectsSection();
    }
  }

  function showEffectsSection() {
    effectsSectionElement.classList.remove('hidden');
    initBaseProperties();
    document.addEventListener('keydown', effectsSectionEscPressHandler);
  }

  function hideEffectsSection() {
    effectsSectionElement.classList.add('hidden');
    document.removeEventListener('keydown', effectsSectionEscPressHandler);
    imgUploadElement.value = '';
  }

  function activateEffect(evt) {
    for (var i = 0; i < processedImageElement.classList.length; i++) {
      processedImageElement.classList.remove(processedImageElement.classList[i]);
    }
    var targetElement = evt.target;

    while (targetElement.tagName !== 'UL') {
      if (targetElement.tagName === 'LI') {
        var effectName = targetElement.firstElementChild.value;
        var effectClass = 'effects__preview--' + effectName;
        processedImageElement.classList.add(effectClass);
        effectScaleElement.classList.toggle('hidden', effectName === 'none');
        return;
      }
      targetElement = targetElement.parentNode;
    }
  }

  function scalePlusElementClickHandler() {
    if (scaleValueNum < SCALE_MAX_VALUE) {
      scaleValueNum += SCALE_STEP_VALUE;
      scaleMinusElement.disabled = false;
      if (scaleValueNum === SCALE_MAX_VALUE) {
        scalePlusElement.setAttribute('disabled', true);
      }
      scaleValueElement.value = scaleValueNum + '%';
      addScaleStyle();
    }
  }

  function scaleMinusElementClickHandler() {
    if (scaleValueNum > SCALE_MIN_VALUE) {
      scaleValueNum -= SCALE_STEP_VALUE;
      scaleValueElement.value = scaleValueNum + '%';
      scalePlusElement.disabled = false;
      if (scaleValueNum === SCALE_MIN_VALUE) {
        scaleMinusElement.setAttribute('disabled', true);
      }
      addScaleStyle();
    }
  }

  function addScaleStyle() {
    var scaleStyleValue = scaleValueNum / 100;
    processedImageContainerElement.style.transform = 'scale' + '(' + scaleStyleValue + ')';
  }

  function getPercent(current, max) {
    return current * 100 / max;
  }

  function getEffectControlPersentPositionLeft() {
    var effectControlPositionLeft = effectControlElement.offsetLeft;
    var scaleWidth = effectControlElement.offsetParent.offsetWidth;
    return getPercent(effectControlPositionLeft, scaleWidth);
  }

  closeDetailedPictureElement.addEventListener('click', function () {
    hideDetailedPicture();
  });

  closeDetailedPictureElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      hideDetailedPicture();
    }
  });

  imgUploadElement.addEventListener('change', function () {
    showEffectsSection();
  });

  effectsSectionCloseElement.addEventListener('click', function () {
    hideEffectsSection();
  });

  effectsSectionCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      hideEffectsSection();
    }
  });

  effectsListElement.addEventListener('click', function (evt) {
    activateEffect(evt);
  });

  scalePlusElement.addEventListener('click', function () {
    scalePlusElementClickHandler();
  });

  scaleMinusElement.addEventListener('click', function () {
    scaleMinusElementClickHandler();
  });

  effectControlElement.addEventListener('mouseup', function () {
    getEffectControlPersentPositionLeft();
  });

  tagsContainerForNewPictureElement.addEventListener('input', function () {
    var tagsString = tagsContainerForNewPictureElement.value;
    var tags = tagsString.split(' ');
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i].trim();
      var compareTag = tags[0].trim();

      if (tag[0] === '#' && tag.length === 1) {
        tagsContainerForNewPictureElement.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (tag[0] !== '#') {
        tagsContainerForNewPictureElement.setCustomValidity('хэш-тег должен начинаться с символа #');
      } else if (tag.indexOf('#', 1) > -1) {
        tagsContainerForNewPictureElement.setCustomValidity('хэш-теги должны быть разделены пробелами');
      } else if (tag.length > 20) {
        tagsContainerForNewPictureElement.setCustomValidity('максимальная длина одного хэш-тега составляет 20 символов, включая решётку');
      } else if (tags.indexOf(compareTag, 1) > -1) {
        tagsContainerForNewPictureElement.setCustomValidity('один и тот же хэш-тег не может быть использован дважды; теги нечувствительны к регистру');
      } else {
        tagsContainerForNewPictureElement.setCustomValidity('');
      }
    }

    if (tags.length > 5) {
      tagsContainerForNewPictureElement.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
  });

  generatePictures(PICTURES_ITEMS_QUANTITY);
  renderPreviewPictures(picturesItems);
  detailedPictureCommentsCountElement.classList.add('visually-hidden');
  detailedPictureLoadCommentsElement.classList.add('visually-hidden');
})();
