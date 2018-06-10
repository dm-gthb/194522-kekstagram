'use strict';

(function () {
  var photosContainer = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content;
  var fragment = document.createDocumentFragment();
  var photos = [];
  var photosQuantity = 25;
  var detailedPhotoContainer = document.querySelector('.big-picture');
  var commentsCountBlock = detailedPhotoContainer.querySelector('.social__comment-count');
  var loadCommentsBlock = detailedPhotoContainer.querySelector('.social__loadmore');
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var description = [
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
      array[i] = getRandomArrayElement(comments);
    }

    return array;
  }

  function generatePhotoData(index) {
    return {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: getRandomNum(15, 200),
      comments: generateRandomComments(5),
      description: getRandomArrayElement(description)
    };
  }

  function generatePhotos(quantity) {
    for (var i = 0; i < quantity; i++) {
      photos[i] = generatePhotoData(i);
    }
    return photos;
  }

  function renderPhotos(photosArray) {
    for (var i = 0; i < photosArray.length; i++) {
      var newPhoto = photoTemplate.cloneNode(true);
      var photoImg = newPhoto.querySelector('.picture__img');
      var photoLikes = newPhoto.querySelector('.picture__stat--likes');
      var commentsArray = photosArray[i].comments;
      var firstPhotoComment = newPhoto.querySelector('.picture__stat--comments');
      photoImg.src = photosArray[i].url;
      photoLikes.textContent = photosArray[i].likes;

      for (var j = 0; j < commentsArray.length; j++) {
        var commentSpan = document.createElement('span');
        commentSpan.classList.add('picture__stat');
        commentSpan.classList.add('picture__stat--comments');
        if (j !== 0) {
          commentSpan.textContent = commentsArray[j];
        }
        firstPhotoComment.textContent = commentsArray[j];
        newPhoto.querySelector('.picture__stats').insertBefore(commentSpan, photoLikes);
      }

      fragment.appendChild(newPhoto);
    }

    photosContainer.appendChild(fragment);
  }

  function renderDetailedPhoto(photoPreview) {
    var detailedPhotoImg = detailedPhotoContainer.querySelector('.big-picture__img img');
    var detailedPhotoLikes = detailedPhotoContainer.querySelector('.likes-count');
    var detailedPhotoDescription = detailedPhotoContainer.querySelector('.social__caption');
    var detailedPhotoCommentsQuantity = detailedPhotoContainer.querySelector('.comments-count');
    var commentsArray = photoPreview.comments;
    var INITIAL_MARKUP_COMMENTS = 2;

    detailedPhotoImg.src = photoPreview.url;
    detailedPhotoLikes.textContent = photoPreview.likes;
    detailedPhotoDescription.textContent = photoPreview.description;
    detailedPhotoCommentsQuantity.textContent = commentsArray.length + INITIAL_MARKUP_COMMENTS;

    for (var j = 0; j < commentsArray.length; j++) {
      var comment = detailedPhotoContainer.querySelector('.social__comments .social__comment').cloneNode(true);
      var commentAvatar = comment.querySelector('.social__comment img');
      var commentText = comment.querySelector('.social__text');
      commentAvatar.src = 'img/avatar-' + getRandomNum(1, 6) + '.svg';
      commentText.textContent = commentsArray[j];
      detailedPhotoContainer.querySelector('.social__comments').appendChild(comment);
    }
  }

  generatePhotos(photosQuantity);
  renderPhotos(photos);
  detailedPhotoContainer.classList.remove('hidden');
  renderDetailedPhoto(photos[0]);
  commentsCountBlock.classList.add('visually-hidden');
  loadCommentsBlock.classList.add('visually-hidden');
})();
