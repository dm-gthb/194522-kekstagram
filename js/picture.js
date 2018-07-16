'use strict';

(function () {
  function Picture(data) {
    this.url = data.url;
    this.likes = data.likes;
    this.comments = data.comments;
  }

  window.Picture = Picture;
})();
