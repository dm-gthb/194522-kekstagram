'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  window.backend = {
    download: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL_LOAD);
      xhr.send();
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка загрузки фотографий: ' + xhr.status + ' ' + xhr.statusText)
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
    },
    upload: function () {}
  };
})();
