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

  function generatePhotoData(index) {
    return {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: getRandomNum(15, 200),
      comments: getRandomArrayElement(comments),
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
      var photoComments = newPhoto.querySelector('.picture__stat--comments');
      photoImg.src = photosArray[i].url;
      photoLikes.textContent = photosArray[i].likes;
      photoComments.textContent = photosArray[i].comments;

      fragment.appendChild(newPhoto);
    }

    photosContainer.appendChild(fragment);
  }

  function renderDetailedPhoto(photoPreview) {
    var detailedPhotoImg = detailedPhotoContainer.querySelector('.big-picture__img img');
    var detailedPhotoLikes = detailedPhotoContainer.querySelector('.likes-count');
    var detailedPhotoDescription = detailedPhotoContainer.querySelector('.social__caption');
    var detailedPhotoCommentsQuantity = detailedPhotoContainer.querySelector('.comments-count');
    var detailedPhotoCommentAvatar = detailedPhotoContainer.querySelector('.social__comments .social__comment img');
    var detailedPhotoCommentText = detailedPhotoContainer.querySelector('.social__comments .social__comment .social__text');

    detailedPhotoImg.src = photoPreview.url;
    detailedPhotoLikes.textContent = photoPreview.likes;
    detailedPhotoDescription.textContent = photoPreview.description;
    detailedPhotoCommentsQuantity.textContent = 1000000;
    detailedPhotoCommentAvatar.src = 'img/avatar-' + getRandomNum(1, 6) + '.svg';
    detailedPhotoCommentText.textContent = photoPreview.comments;
  }

  generatePhotos(photosQuantity);
  renderPhotos(photos);
  detailedPhotoContainer.classList.remove('hidden');
  renderDetailedPhoto(photos[0]);
  commentsCountBlock.classList.add('visually-hidden');
  loadCommentsBlock.classList.add('visually-hidden');
})();
