'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var picturesItems = [];
  var picturesItemsQuantity = 25;
  var previewPicturesContainer = document.querySelector('.pictures');
  var previewPictureTemplate = document.querySelector('#picture').content;
  var detailedPictureContainer = document.querySelector('.big-picture');
  var detailedPictureCommentsCount = detailedPictureContainer.querySelector('.social__comment-count');
  var detailedPictureLoadComments = detailedPictureContainer.querySelector('.social__loadmore');

  var testComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var testDescriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  function getRandomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function getRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateRandomComments(quantity) {
    var array = [];
    var arrayLength = getRandomNum(1, quantity);
    for (var i = 0; i < arrayLength; i++) {
      array[i] = getRandomArrayElement(testComments);
    }

    return array;
  }

  function generatePictureData(index) {
    return {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: getRandomNum(15, 200),
      comments: generateRandomComments(5),
      description: getRandomArrayElement(testDescriptions)
    };
  }

  function generatePictures(quantity) {
    for (var i = 0; i < quantity; i++) {
      picturesItems[i] = generatePictureData(i);
    }
    return picturesItems;
  }

  function renderPreviewPictures(picturesToRender) {
    for (var i = 0; i < picturesToRender.length; i++) {
      var previewPicture = previewPictureTemplate.cloneNode(true);
      var previewPictureImg = previewPicture.querySelector('.picture__img');
      var previewPictureLikes = previewPicture.querySelector('.picture__stat--likes');
      var previewPictureComments = picturesToRender[i].comments;
      var firstComment = previewPicture.querySelector('.picture__stat--comments:first-child');
      previewPictureImg.src = picturesToRender[i].url;
      previewPictureLikes.textContent = picturesToRender[i].likes;
      firstComment.textContent = previewPictureComments[0];

      for (var j = 1; j < previewPictureComments.length; j++) {
        var commentElement = document.createElement('span');
        commentElement.classList.add('picture__stat');
        commentElement.classList.add('picture__stat--comments');
        commentElement.textContent = previewPictureComments[j];
        previewPicture.querySelector('.picture__stats').insertBefore(commentElement, previewPictureLikes);
      }

      fragment.appendChild(previewPicture);
    }

    previewPicturesContainer.appendChild(fragment);
  }

  function renderDetailedPicture(picturePreview) {
    var detailedPictureImg = detailedPictureContainer.querySelector('.big-picture__img img');
    var detailedPictureLikes = detailedPictureContainer.querySelector('.likes-count');
    var detailedPictureDescription = detailedPictureContainer.querySelector('.social__caption');
    var detailedPictureComment = detailedPictureContainer.querySelector('.social__comments .social__comment');
    var detailedPictureCommentsQuantity = detailedPictureContainer.querySelector('.comments-count');
    var detailedPictureComments = picturePreview.comments;
    var INITIAL_MARKUP_COMMENTS = 2;

    detailedPictureImg.src = picturePreview.url;
    detailedPictureLikes.textContent = picturePreview.likes;
    detailedPictureDescription.textContent = picturePreview.description;
    detailedPictureCommentsQuantity.textContent = detailedPictureComments.length + INITIAL_MARKUP_COMMENTS;

    for (var i = 0; i < detailedPictureComments.length; i++) {
      var commentElement = detailedPictureComment.cloneNode(true);
      var commentAvatarElement = commentElement.querySelector('.social__comment img');
      var commentTextElement = commentElement.querySelector('.social__text');
      commentAvatarElement.src = 'img/avatar-' + getRandomNum(1, 6) + '.svg';
      commentTextElement.textContent = detailedPictureComments[i];
      detailedPictureContainer.querySelector('.social__comments').appendChild(commentElement);
    }
  }

  generatePictures(picturesItemsQuantity);
  renderPreviewPictures(picturesItems);
  detailedPictureContainer.classList.remove('hidden');
  renderDetailedPicture(picturesItems[0]);
  detailedPictureCommentsCount.classList.add('visually-hidden');
  detailedPictureLoadComments.classList.add('visually-hidden');
})();
