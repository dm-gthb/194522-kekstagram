'use strict';

(function () {
  var scaleValueElement = document.querySelector('.resize__control--value');
  var SCALE_MIN_VALUE = 25;
  var SCALE_MAX_VALUE = 100;
  var SCALE_STEP_VALUE = 25;
  var processedImageContainerElement = document.querySelector('.img-upload__preview');
  var scalePlusElement = document.querySelector('.resize__control--plus');
  var scaleControlElements = document.querySelectorAll('button.resize__control');
  var scaleMinusElement = document.querySelector('.resize__control--minus');

  window.scalePhoto = {};
  window.scalePhoto.scaleValue = scaleValueElement.value;
  window.scalePhoto.scaleValueNum = parseInt(window.scalePhoto.scaleValue, 10);

  function scaleElementClickHandler(evt) {
    var flag = evt.target.classList.contains('resize__control--plus') ? 1 : -1;
    var newValue = window.scalePhoto.scaleValueNum + SCALE_STEP_VALUE * flag;
    if (newValue <= SCALE_MAX_VALUE && newValue >= SCALE_MIN_VALUE) {
      scalePlusElement.disabled = newValue >= SCALE_MAX_VALUE;
      scaleMinusElement.disabled = newValue <= SCALE_MIN_VALUE;
      window.scalePhoto.scaleValueNum = newValue;
      window.scalePhoto.scaleValue = window.scalePhoto.scaleValueNum + '%';
      addScaleStyle();
    }
  }

  function addScaleStyle() {
    var scaleStyleValue = window.scalePhoto.scaleValueNum / 100;
    processedImageContainerElement.style.transform = 'scale' + '(' + scaleStyleValue + ')';
  }

  for (var i = 0; i < scaleControlElements.length; i++) {
    scaleControlElements[i].addEventListener('click', function (evt) {
      scaleElementClickHandler(evt);
      console.log(window.scalePhoto.scaleValue);
      console.log(window.scalePhoto.scaleValueNum);
    });
  }
})();

// 'use strict';

// (function () {
//   var SCALE_MIN_VALUE = 25;
//   var SCALE_MAX_VALUE = 100;
//   var SCALE_STEP_VALUE = 25;
//   var processedImageContainerElement = document.querySelector('.img-upload__preview');
//   var scalePlusElement = document.querySelector('.resize__control--plus');
//   var scaleControlElements = document.querySelectorAll('button.resize__control');
//   var scaleMinusElement = document.querySelector('.resize__control--minus');
//   var scaleValueElement = document.querySelector('.resize__control--value');
//   var scaleValueNum = parseInt(scaleValueElement.value, 10);

//   function scaleElementClickHandler(evt) {
//     var flag = evt.target.classList.contains('resize__control--plus') ? 1 : -1;
//     var newValue = scaleValueNum + SCALE_STEP_VALUE * flag;
//     if (newValue <= SCALE_MAX_VALUE && newValue >= SCALE_MIN_VALUE) {
//       scalePlusElement.disabled = newValue >= SCALE_MAX_VALUE;
//       scaleMinusElement.disabled = newValue <= SCALE_MIN_VALUE;
//       scaleValueNum = newValue;
//       scaleValueElement.value = scaleValueNum + '%';
//       addScaleStyle();
//     }
//   }

//   function addScaleStyle() {
//     var scaleStyleValue = scaleValueNum / 100;
//     processedImageContainerElement.style.transform = 'scale' + '(' + scaleStyleValue + ')';
//   }

//   for (var i = 0; i < scaleControlElements.length; i++) {
//     scaleControlElements[i].addEventListener('click', function (evt) {
//       scaleElementClickHandler(evt);
//     });
//   }
// })();
