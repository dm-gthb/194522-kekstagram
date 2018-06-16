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
  var previewPicturesContainer = document.querySelector('.pictures');
  var previewPictureTemplate = document.querySelector('#picture').content;
  var detailedPictureContainer = document.querySelector('.big-picture');
  var detailedPictureCommentsCount = detailedPictureContainer.querySelector('.social__comment-count');
  var detailedPictureLoadComments = detailedPictureContainer.querySelector('.social__loadmore');
  // var previewPictures = document.querySelectorAll('.picture__img');
  var closeDetailedPictureButton = detailedPictureContainer.querySelector('.big-picture__cancel');

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

  function renderPreviewPictures(picturesToRender) {

    function renderPreviewPicturesComments() {
      for (var j = 1; j < previewPictureComments.length; j++) {
        var commentElement = document.createElement('span');
        commentElement.classList.add('picture__stat');
        commentElement.classList.add('picture__stat--comments');
        commentElement.textContent = previewPictureComments[j];
        previewPicture.querySelector('.picture__stats').insertBefore(commentElement, previewPictureLikes);
      }
    }

    for (var i = 0; i < picturesToRender.length; i++) {
      var previewPicture = previewPictureTemplate.cloneNode(true);
      var previewPictureImg = previewPicture.querySelector('.picture__img');
      var previewPictureLikes = previewPicture.querySelector('.picture__stat--likes');
      var previewPictureComments = picturesToRender[i].comments;
      var firstComment = previewPicture.querySelector('.picture__stat--comments:first-child');
      previewPictureImg.src = picturesToRender[i].url;
      previewPictureLikes.textContent = picturesToRender[i].likes;
      firstComment.textContent = previewPictureComments[0];
      renderPreviewPicturesComments();

      fragment.appendChild(previewPicture);
    }

    previewPicturesContainer.appendChild(fragment);
  }

  function renderDetailedPicture(picturePreview) {
    var detailedPictureImg = detailedPictureContainer.querySelector('.big-picture__img img');
    var detailedPictureLikes = detailedPictureContainer.querySelector('.likes-count');
    var detailedPictureDescription = detailedPictureContainer.querySelector('.social__caption');
    var detailedPictureCommentsList = detailedPictureContainer.querySelector('.social__comments');
    var detailedPictureExampleComments = detailedPictureCommentsList.querySelectorAll('.social__comment');
    var detailedPictureCommentsQuantity = detailedPictureContainer.querySelector('.comments-count');
    var detailedPictureComments = picturePreview.comments;

    function deleteExampleComments() {
      for (var i = 0; i < detailedPictureExampleComments.length; i++) {
        detailedPictureCommentsList.removeChild(detailedPictureExampleComments[i]);
      }
    }

    function renderDetailedPictureComments() {
      for (var i = 0; i < detailedPictureComments.length; i++) {
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
        commentTextElement.textContent = detailedPictureComments[i];

        commentElement.appendChild(commentAvatarElement);
        commentElement.appendChild(commentTextElement);

        detailedPictureCommentsList.appendChild(commentElement);
      }
    }

    detailedPictureImg.src = picturePreview.url;
    detailedPictureLikes.textContent = picturePreview.likes;
    detailedPictureDescription.textContent = picturePreview.description;
    detailedPictureCommentsQuantity.textContent = detailedPictureComments.length;

    if (detailedPictureExampleComments) {
      deleteExampleComments();
    }

    renderDetailedPictureComments();
  }

  generatePictures(PICTURES_ITEMS_QUANTITY);
  renderPreviewPictures(picturesItems);
  renderDetailedPicture(picturesItems[0]);
  detailedPictureCommentsCount.classList.add('visually-hidden');
  detailedPictureLoadComments.classList.add('visually-hidden');


// SHOW/HIDE DETAILED PICTURE
  function detailedPictureEscPressHandler(evt) {
    if (evt.keyCode === ESC_KEY && evt.target.tagName !== 'INPUT') {
      hideDetailedPicture();
    }
  }

  function showDetailedPicture() {
    detailedPictureContainer.classList.remove('hidden');
    document.addEventListener('keydown', detailedPictureEscPressHandler);
  }

  function hideDetailedPicture() {
    detailedPictureContainer.classList.add('hidden');
    document.removeEventListener('keydown', detailedPictureEscPressHandler);
  }

  previewPicturesContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      showDetailedPicture();
    }
  });

  previewPicturesContainer.addEventListener('keydown', function (evt) {
    if (evt.target.classList.contains('picture__link') && evt.keyCode === ENTER_KEY) {
      showDetailedPicture();
    }
  });

  closeDetailedPictureButton.addEventListener('click', function () {
    hideDetailedPicture();
  });

  closeDetailedPictureButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      hideDetailedPicture();
    }
  });

//IMAGE PROCESSING
  var imgUploadElement = document.querySelector('#upload-file');
  var effectsSection = document.querySelector('.img-upload__overlay');
  var processedImage = document.querySelector('.img-upload__preview img');
  var effectsList = effectsSection.querySelector('.effects__list');
  var effectScale = effectsSection.querySelector('.img-upload__scale');
  var effectsSectionClose = effectsSection.querySelector('.img-upload__cancel');

  effectScale.style.opacity = 0;

  function effectsSectionEscPressHandler(evt) {
    if (evt.keyCode === ESC_KEY) {
      hideEffectsSection();
    }
  }

  function showEffectsSection() {
    effectsSection.classList.remove('hidden');
    document.addEventListener('keydown', effectsSectionEscPressHandler);
  }

  function hideEffectsSection() {
    effectsSection.classList.add('hidden');
    document.removeEventListener('keydown', effectsSectionEscPressHandler);
    imgUploadElement.value = '';
  }

  function activateEffect(evt) {
    for (var i = 0; i < processedImage.classList.length; i++) {
      processedImage.classList.remove(processedImage.classList[i]);
    }
    var targetElement = evt.target;

    while (targetElement.tagName !== 'UL') {
      if (targetElement.tagName === 'LI') {
        var effectName = targetElement.firstElementChild.value;
        var effectClass = 'effects__preview--' + effectName;
        processedImage.classList.add(effectClass);
        if (effectName !== 'none') {
          effectScale.style.opacity = 1;
        }

        effectScale.style.opacity = effectName !== 'none' ? 1 : 0;
        return;
      }
      targetElement = targetElement.parentNode;
    }
  }

  imgUploadElement.addEventListener('change', function () {
    showEffectsSection();
    // processedImage.src = 'photos/' + evt.target.files[0].name;
  });

  effectsSectionClose.addEventListener('click', function () {
    hideEffectsSection();
  });

  effectsSectionClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      hideEffectsSection();
    }
  });

  effectsList.addEventListener('click', function (evt) {
    activateEffect(evt);
  });


// PHOTO EFFECT LEVEL CONTROLLER
  var effectControllerPin = effectsSection.querySelector('.scale__pin');

  function getPercent(current, max) {
    return parseInt(current * 100 / max, 10);
  }

  function getEffectControllerPinPersentPositionLeft() {
    var effectControllerPinPositionLeft = effectControllerPin.offsetLeft;
    var scaleWidth = effectControllerPin.offsetParent.offsetWidth;
    return getPercent(effectControllerPinPositionLeft, scaleWidth);
  }

  effectControllerPin.addEventListener('mouseup', function () {
    getEffectControllerPinPersentPositionLeft();
  });
})();
