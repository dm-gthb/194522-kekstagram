'use strict';

(function () {
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;
  var SCALE_STEP_VALUE = 25;
  var scaleValueElement = document.querySelector('.resize__control--value');
  var processedImageContainerElement = document.querySelector('.img-upload__preview');
  var scaleControlElements = document.querySelectorAll('button.resize__control');

  function scaleElementClickHandler(evt) {
    var scaleDirection = evt.target.classList.contains('resize__control--plus') ? 1 : -1;
    var newValue = window.scalePhoto + SCALE_STEP_VALUE * scaleDirection;
    if (newValue <= SCALE_MAX_VALUE && newValue >= SCALE_MIN_VALUE) {
      window.scalePhoto = newValue;
      scaleValueElement.value = window.scalePhoto + '%';
      addScaleStyle();
    }
  }

  function addScaleStyle() {
    var scaleStyleValue = window.scalePhoto / 100;
    processedImageContainerElement.style.transform = 'scale(' + scaleStyleValue + ')';
  }

  for (var i = 0; i < scaleControlElements.length; i++) {
    scaleControlElements[i].addEventListener('click', function (evt) {
      scaleElementClickHandler(evt);
    });
  }

  window.scalePhoto = parseInt(scaleValueElement.value, 10);
})();
