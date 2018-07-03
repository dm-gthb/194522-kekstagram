'use strict';

(function () {
  var processedImageElement = document.querySelector('.img-upload__preview img');
  var effectsListElement = document.querySelector('.effects__list');
  var selectedEffectName;
  var effectDepthContainerElement = document.querySelector('.img-upload__scale');
  var effectDepthControlElement = document.querySelector('.scale__pin');
  var effectDepthLineElement = effectDepthContainerElement.querySelector('.scale__line');
  var effectDepthLineColorFillElement = effectDepthContainerElement.querySelector('.scale__level');
  var effectDepthValue = effectDepthContainerElement.querySelector('.scale__value').value;

  function activateEffect() {
    window.utils.resetAllClasses(processedImageElement);
    var effectClass = 'effects__preview--' + selectedEffectName;
    processedImageElement.classList.add(effectClass);
    effectDepthLineColorFillElement.style.width = '100%';
    effectDepthControlElement.style.left = '100%';
    effectDepthControlElement.style.zIndex = 100;
    processedImageElement.style.filter = '';
    effectDepthContainerElement.classList.toggle('hidden', selectedEffectName === 'none');
  }

  function getEffectControlPersentPositionLeft() {
    var effectControlPositionLeft = effectDepthControlElement.offsetLeft;
    var scaleWidth = effectDepthControlElement.offsetParent.offsetWidth;
    return window.utils.getPercent(effectControlPositionLeft, scaleWidth);
  }

  effectsListElement.addEventListener('change', function (evt) {
    selectedEffectName = evt.target.value;
    activateEffect();
  });

  effectDepthControlElement.addEventListener('mouseup', function () {
    getEffectControlPersentPositionLeft();
  });

  effectDepthControlElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var extremeCoords = window.utils.getCoords(effectDepthLineElement);
    var min = extremeCoords.left;
    var max = extremeCoords.right;

    function effectControlMouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;

      if (moveEvt.clientX > min && moveEvt.clientX < max) {
        effectDepthControlElement.style.left = effectDepthControlElement.offsetLeft - shift + 'px';
        effectDepthLineColorFillElement.style.width = getEffectControlPersentPositionLeft() + '%';
        effectDepthValue = Math.floor(getEffectControlPersentPositionLeft()).toString();

        var appliedEffect;
        switch (selectedEffectName) {
          case 'chrome':
            appliedEffect = 'grayscale(' + window.utils.getFraction(effectDepthValue, 1) + ')';
            break;
          case 'sepia':
            appliedEffect = 'sepia(' + window.utils.getFraction(effectDepthValue, 1) + ')';
            break;
          case 'phobos':
            appliedEffect = 'blur(' + window.utils.getFraction(effectDepthValue, 3) + 'px)';
            break;
          case 'marvin':
            appliedEffect = 'invert(' + window.utils.getFraction(effectDepthValue, 100) + '%)';
            break;
          case 'heat':
            appliedEffect = 'brightness(' + window.utils.getFraction(effectDepthValue, 3) + ')';
            break;
        }

        processedImageElement.style.filter = appliedEffect;
      }

      startCoords = moveEvt.clientX;
    }

    function effectControlMouseUpHandler(upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', effectControlMouseMoveHandler);
      document.removeEventListener('mouseup', effectControlMouseUpHandler);
    }

    document.addEventListener('mousemove', effectControlMouseMoveHandler);
    document.addEventListener('mouseup', effectControlMouseUpHandler);
  });
})();
