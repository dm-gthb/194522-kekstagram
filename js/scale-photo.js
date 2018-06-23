'use strict';

(function () {
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;
  var SCALE_STEP_VALUE = 25;
  var processedImageContainerElement = document.querySelector('.img-upload__preview');
  var scalePlusElement = document.querySelector('.resize__control--plus');
  var scaleMinusElement = document.querySelector('.resize__control--minus');
  var scaleValueElement = document.querySelector('.resize__control--value');
  var scaleValueNum = parseInt(scaleValueElement.value, 10);

  function scalePlusElementClickHandler() {
    if (scaleValueNum < SCALE_MAX_VALUE) {
      scaleValueNum += SCALE_STEP_VALUE;
      scaleMinusElement.disabled = false;
      if (scaleValueNum === SCALE_MAX_VALUE) {
        scalePlusElement.setAttribute('disabled', true);
      }
      scaleValueElement.value = scaleValueNum + '%';
      addScaleStyle();
    }
  }

  function scaleMinusElementClickHandler() {
    if (scaleValueNum > SCALE_MIN_VALUE) {
      scaleValueNum -= SCALE_STEP_VALUE;
      scaleValueElement.value = scaleValueNum + '%';
      scalePlusElement.disabled = false;
      if (scaleValueNum === SCALE_MIN_VALUE) {
        scaleMinusElement.setAttribute('disabled', true);
      }
      addScaleStyle();
    }
  }

  function addScaleStyle() {
    var scaleStyleValue = scaleValueNum / 100;
    processedImageContainerElement.style.transform = 'scale' + '(' + scaleStyleValue + ')';
  }

  scalePlusElement.addEventListener('click', function () {
    scalePlusElementClickHandler();
  });

  scaleMinusElement.addEventListener('click', function () {
    scaleMinusElementClickHandler();
  });
})();
