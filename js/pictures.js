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
  var fragment = document.createDocumentFragment();
  var picturesItems = [];
  var previewPicturesContainerElement = document.querySelector('.pictures');
  var previewPictureTemplateElement = document.querySelector('#picture').content;
  var detailedPictureContainerElement = document.querySelector('.big-picture');
  var detailedPictureCommentsCountElement = detailedPictureContainerElement.querySelector('.social__comment-count');
  var detailedPictureLoadCommentsElement = detailedPictureContainerElement.querySelector('.social__loadmore');
  var closeDetailedPictureElement = detailedPictureContainerElement.querySelector('.big-picture__cancel');

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

  function renderPreviewPictureComments(pictureObject) {
    var commentElement = document.createElement('span');
    commentElement.classList.add('picture__stat');
    commentElement.classList.add('picture__stat--comments');
    commentElement.textContent = pictureObject.comments;
    return commentElement;
  }

  function renderPreviewPicture(pictureObject) {
    var previewPictureElement = previewPictureTemplateElement.cloneNode(true);
    var previewPictureImgElement = previewPictureElement.querySelector('.picture__img');
    var previewPictureLikesElement = previewPictureElement.querySelector('.picture__stat--likes');
    var previewPictureComments = pictureObject.comments;
    var firstCommentElement = previewPictureElement.querySelector('.picture__stat--comments:first-child');

    previewPictureImgElement.src = pictureObject.url;
    previewPictureLikesElement.textContent = pictureObject.likes;
    firstCommentElement.textContent = previewPictureComments[0];
    renderPreviewPictureComments(pictureObject);

    return previewPictureElement;
  }


  function renderPreviewPictures(picturesToRender) {
    for (var i = 0; i < picturesToRender.length; i++) {
      var newPreviewPicture = renderPreviewPicture(picturesToRender[i]);
      fragment.appendChild(newPreviewPicture);
    }

    previewPicturesContainerElement.appendChild(fragment);
  }

  generatePictures(PICTURES_ITEMS_QUANTITY);
  renderPreviewPictures(picturesItems);
  detailedPictureCommentsCountElement.classList.add('visually-hidden');
  detailedPictureLoadCommentsElement.classList.add('visually-hidden');


  // RENDER & SHOW / HIDE DETAILED PICTURE
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

  function renderDetailedPicture(picturePreview) {
    var picturePreviewUrl = picturePreview.querySelector('.picture__img').src;
    var picturePreviewAlt = picturePreview.querySelector('.picture__img').alt;
    var picturePreviewLikes = picturePreview.querySelector('.picture__stat--likes').textContent;
    var picturePreviewCommentsContainers = picturePreview.querySelectorAll('.picture__stat--comments');
    var picturePreviewComments = [];
    for (var j = 0; j < picturePreviewCommentsContainers.length; j++) {
      picturePreviewComments[j] = picturePreviewCommentsContainers[j].textContent;
    }

    var detailedPictureImgElement = detailedPictureContainerElement.querySelector('.big-picture__img img');
    var detailedPictureLikesElement = detailedPictureContainerElement.querySelector('.likes-count');
    var detailedPictureDescriptionElement = detailedPictureContainerElement.querySelector('.social__caption');
    var detailedPictureCommentsListElement = detailedPictureContainerElement.querySelector('.social__comments');
    var detailedPictureExampleCommentsElements = detailedPictureCommentsListElement.querySelectorAll('.social__comment');
    var detailedPictureCommentsQuantityElement = detailedPictureContainerElement.querySelector('.comments-count');

    function deleteExampleComments() {
      for (var i = 0; i < detailedPictureExampleCommentsElements.length; i++) {
        detailedPictureCommentsListElement.removeChild(detailedPictureExampleCommentsElements[i]);
      }
    }

    function renderDetailedPictureComments() {
      for (var i = 0; i < picturePreviewComments.length; i++) {
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
        commentTextElement.textContent = picturePreviewComments[i];

        commentElement.appendChild(commentAvatarElement);
        commentElement.appendChild(commentTextElement);

        detailedPictureCommentsListElement.appendChild(commentElement);
      }
    }

    detailedPictureImgElement.src = picturePreviewUrl;
    detailedPictureLikesElement.textContent = picturePreviewLikes;
    detailedPictureDescriptionElement.textContent = picturePreviewAlt;
    detailedPictureCommentsQuantityElement.textContent = picturePreviewComments.length;

    if (detailedPictureExampleCommentsElements) {
      deleteExampleComments();
    }

    renderDetailedPictureComments();
  }

  function previewPictureClickHandler(evt) {
    var targetElement = evt.target;
    while (targetElement.tagName !== 'SECTION') {
      if (targetElement.classList.contains('picture__link')) {
        renderDetailedPicture(targetElement);
        showDetailedPicture();
      }
      targetElement = targetElement.parentNode;
    }
  }

  previewPicturesContainerElement.addEventListener('click', function (evt) {
    previewPictureClickHandler(evt);
  });

  // previewPicturesContainerElement.addEventListener('keydown', function (evt) {
  //   if (evt.target.classList.contains('picture__link') && evt.keyCode === ENTER_KEY) {
  //     showDetailedPicture();
  //   }
  // });

  closeDetailedPictureElement.addEventListener('click', function () {
    hideDetailedPicture();
  });

  closeDetailedPictureElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      hideDetailedPicture();
    }
  });

  // IMAGE PROCESSING
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
        if (effectName === 'none') {
          effectScaleElement.classList.add('hidden');
        } else {
          effectScaleElement.classList.remove('hidden');
        }
        return;
      }
      targetElement = targetElement.parentNode;
    }
  }

  function scalePlusElementClickHandler() {
    if (scaleValueNum < 100) {
      scaleValueNum += 25;
      scaleMinusElement.disabled = false;
      if (scaleValueNum === 100) {
        scalePlusElement.setAttribute('disabled', true);
      }
      scaleValueElement.value = scaleValueNum + '%';
      addScaleStyle();
    }
  }

  function scaleMinusElementClickHandler() {
    if (scaleValueNum > 25) {
      scaleValueNum -= 25;
      scaleValueElement.value = scaleValueNum + '%';
      scalePlusElement.disabled = false;
      if (scaleValueNum === 25) {
        scaleMinusElement.setAttribute('disabled', true);
      }
      addScaleStyle();
    }
  }

  function addScaleStyle() {
    var scaleStyleValue = scaleValueNum / 100;
    var scaleStyleValueString = 'scale' + '(' + scaleStyleValue + ')';
    processedImageContainerElement.style.transform = scaleStyleValueString;
  }

  imgUploadElement.addEventListener('change', function () {
    showEffectsSection();
    // processedImageElement.src = 'photos/' + evt.target.files[0].name;
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

// PHOTO EFFECT LEVEL CONTROLLER
  var effectControlElement = effectsSectionElement.querySelector('.scale__pin');

  function getPercent(current, max) {
    return parseInt(current * 100 / max, 10);
  }

  function getEffectControlPersentPositionLeft() {
    var effectControlPositionLeft = effectControlElement.offsetLeft;
    var scaleWidth = effectControlElement.offsetParent.offsetWidth;
    return getPercent(effectControlPositionLeft, scaleWidth);
  }

  effectControlElement.addEventListener('mouseup', function () {
    getEffectControlPersentPositionLeft();
  });
})();
