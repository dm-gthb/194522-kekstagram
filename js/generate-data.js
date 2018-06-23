'use strict';

(function () {
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
  var picturesItems = [];

  window.generateData = {
    generateRandomComments: function (quantity) {
      var comments = [];
      var commentsAmount = window.util.getRandomNum(1, quantity);
      for (var i = 0; i < commentsAmount; i++) {
        comments[i] = window.util.getRandomArrayElement(TEST_COMMENTS);
      }

      return comments;
    },

    generatePictureData: function (index) {
      return {
        url: 'photos/' + (index + 1) + '.jpg',
        likes: window.util.getRandomNum(15, 200),
        comments: this.generateRandomComments(5),
        description: window.util.getRandomArrayElement(TEST_DESCRIPTIONS)
      };
    },

    generatePictures: function (quantity) {
      for (var i = 0; i < quantity; i++) {
        picturesItems[i] = this.generatePictureData(i);
      }
      return picturesItems;
    }
  };
})();
