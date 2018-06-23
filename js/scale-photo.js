'use strict';

(function () {
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;
  var SCALE_STEP_VALUE = 25;
  var processedImageContainerElement = document.querySelector('.img-upload__preview');
  var scalePlusElement = document.querySelector('.resize__control--plus');
  var scaleControlElements = document.querySelectorAll('button.resize__control');
  var scaleMinusElement = document.querySelector('.resize__control--minus');
  var scaleValueElement = document.querySelector('.resize__control--value');
  var scaleValueNum = parseInt(scaleValueElement.value, 10);

  function scaleElementClickHandler(evt) {
    var flag = evt.target.classList.contains('resize__control--plus') ? 1 : -1;
    var newValue = scaleValueNum + SCALE_STEP_VALUE * flag;
    if (newValue <= SCALE_MAX_VALUE && newValue >= SCALE_MIN_VALUE) {
      if (newValue > scaleValueNum) {
        scaleMinusElement.disabled = false;
      } else {
        scalePlusElement.disabled = false;
      }
      scaleValueNum = newValue;
      scaleValueElement.value = scaleValueNum + '%';
      addScaleStyle();
      if (scaleValueNum === SCALE_MAX_VALUE) {
        scalePlusElement.setAttribute('disabled', true);
      } else if (scaleValueNum === SCALE_MIN_VALUE) {
        scaleMinusElement.setAttribute('disabled', true);
      }
    }
  }

  function addScaleStyle() {
    var scaleStyleValue = scaleValueNum / 100;
    processedImageContainerElement.style.transform = 'scale' + '(' + scaleStyleValue + ')';
  }

  for (var i = 0; i < scaleControlElements.length; i++) {
    scaleControlElements[i].addEventListener('click', function (evt) {
      scaleElementClickHandler(evt);
    });
  }
})();
