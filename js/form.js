import {checkMaxStringLength, removeStringInArray} from './util.js';

const uploadFileElement = document.querySelector('#upload-file');
const imgUploadWindow = document.querySelector('.img-upload');
const imgUploadOverlay = imgUploadWindow.querySelector('.img-upload__overlay');
const imgUploadWindowCloseBtn = imgUploadWindow.querySelector('.img-upload__cancel');
const imgUploadForm = imgUploadWindow.querySelector('.img-upload__form');
const commentField = imgUploadWindow.querySelector('.text__description');
const hashtagsField = imgUploadWindow.querySelector('.text__hashtags');
const imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
const scaleControllValue = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const imgUploadSubmit = imgUploadWindow.querySelector('.img-upload__submit');

const effectList = imgUploadForm.querySelector('.effects__list');
const radioEffects = imgUploadForm.querySelectorAll('.effects__radio');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');

// ↓ ↓ ↓ валидация  ↓ ↓ ↓

const imgUploadFormConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'validation-error',
  successClass: 'validation-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'validation-error-text'
};

const pristine = new Pristine(imgUploadForm, imgUploadFormConfig, true);

function convertHashtagsValueToArray (value) {
  const  hashtags = value.split(' ');
  return removeStringInArray(hashtags, '');
}

pristine.addValidator(hashtagsField, (value) => {
  const hashtags = convertHashtagsValueToArray(value);
  const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[hashtags.length - 1] === '#' && hashtags[hashtags.length - 2] === '#') {
      return false;
    }
    if (hashtags[hashtags.length - 1] === '#') {
      continue;
    }
    if (!re.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}, 'ошибка в хэштеге', 4, true);

pristine.addValidator(hashtagsField, (value) => {
  let hashtags = convertHashtagsValueToArray(value);
  hashtags = hashtags.map((el) => el.toLowerCase());
  for (let i = 0; i < hashtags.length - 1; i++) {
    if (hashtags.slice(i + 1, hashtags.length).includes(hashtags[i])) {
      return false;
    }
  }
  return true;
}, 'есть одинаковые', 3, true);

pristine.addValidator(hashtagsField, (value) => {
  const hashtags = convertHashtagsValueToArray(value);
  return hashtags.length <= 5;
}, 'больше 5', 2, true);

pristine.addValidator(commentField, (value) => checkMaxStringLength(value, 140), 'не более 140 символов', 1, true);

function fixTextFieldsValue () {
  let hashtags = hashtagsField.value.trim();
  hashtags = hashtags.split(' ');
  hashtags = removeStringInArray(hashtags, '');
  hashtags = removeStringInArray(hashtags, '#');
  hashtagsField.value = hashtags.join(' ');
  commentField.value = commentField.value.trim();
}

function onFormSubmit (evt) {
  fixTextFieldsValue();
  if (!pristine.validate()) {
    evt.preventDefault();
    return;
  }
  imgUploadSubmit.setAttribute('disabled', '');
}

// ↑ ↑ ↑ валидация ↑ ↑ ↑

// ↓ ↓ ↓ изменение масштаба фото  ↓ ↓ ↓

function increaseScale (step) {
  const value = +scaleControllValue.value.slice(0, scaleControllValue.value.length - 1);
  if (value >= 100) {
    return;
  }
  scaleControllValue.value = `${value + step}%`;
  imgUploadPreview.style.scale = `${(value + step) / 100}`;
}

function decreaseScale (step) {
  const value = +scaleControllValue.value.slice(0, scaleControllValue.value.length - 1);
  if (value <= 25) {
    return;
  }
  scaleControllValue.value = `${value - step}%`;
  imgUploadPreview.style.scale = `${(value - step) / 100}`;
}

function onimgUploadScaleClick (evt) {
  const step = 25;
  if (evt.target.matches('.scale__control--smaller')) {
    decreaseScale(step);
  }
  if (evt.target.matches('.scale__control--bigger')) {
    increaseScale(step);
  }
}

// ↑ ↑ ↑ изменение масштаба фото ↑ ↑ ↑

// ↓ ↓ ↓ слайдер, эффекты  ↓ ↓ ↓

function createEffectLevelSlider () {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });
}

function destroyEffectLevelSlider () {
  effectLevelSlider.noUiSlider.destroy();
}

function updateListener (effect) {
  const effectFilters = {
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness',
  };
  effectLevelSlider.noUiSlider.on('update', () => {
    const filterValue = effectLevelSlider.noUiSlider.get();
    imgUploadPreview.style.filter = `${effectFilters[effect]}(${filterValue})`;
    effectLevelValue.value = filterValue;
  });
}

function updateSlider (effect) {
  if (effect === 'chrome' || effect === 'sepia') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      format: {
        to (value) {
          return value;
        },
        from (value) {
          return value;
        },
      },
    });
  }
  if (effect === 'marvin') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      format: {
        to (value) {
          return `${value}%`;
        },
        from (value) {
          return value;
        },
      },
    });
  }
  if (effect === 'phobos') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to (value) {
          return `${value}px`;
        },
        from (value) {
          return value;
        },
      },
    });
  }
  if (effect === 'heat') {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      format: {
        to (value) {
          return value;
        },
        from (value) {
          return value;
        },
      },
    });
  }
}

function setImgEffectClass (effect) {
  if (imgUploadPreview.classList.length > 0) {
    imgUploadPreview.classList.remove(`${imgUploadPreview.classList[0]}`);
  }
  imgUploadPreview.classList.add(`effects__preview--${effect}`);
}

function resetEffect () {
  imgUploadPreview.removeAttribute('style');
  imgUploadPreview.removeAttribute('class');
  effectLevelValue.value = '';
}

function changeVisibility (status) {
  effectLevelSlider.style.display = status;
}

function setEffect () {
  for (let i = 0; i < radioEffects.length; i++) {
    const effect = radioEffects[i];
    if (effect.checked) {
      if (effect.value === 'none') {
        changeVisibility('none');
        resetEffect();
        break;
      }
      changeVisibility('block');
      setImgEffectClass(effect.value);
      updateSlider(effect.value);
      updateListener(effect.value);
      break;
    }
  }
}

// ↑ ↑ ↑ слайдер, эффекты ↑ ↑ ↑

function cancelCloseWindow (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function closeImgUploadWindow () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imgUploadScale.removeEventListener('click', onimgUploadScaleClick);
  hashtagsField.removeEventListener('keydown', cancelCloseWindow);
  commentField.removeEventListener('keydown', cancelCloseWindow);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  effectList.removeEventListener('change', setEffect);
  destroyEffectLevelSlider();
  radioEffects[0].checked = 'true';
  scaleControllValue.value = '100%';
  uploadFileElement.value = '';
  commentField.value = '';
  hashtagsField.value = '';
  uploadFileElement.addEventListener('change', onUploadFileElementChange);
  imgUploadWindowCloseBtn.removeEventListener('click', onImgUploadWindowCloseBtnClick);
  document.body.removeEventListener('keydown', onBodyEscapeDown);
}

function onImgUploadWindowCloseBtnClick () {
  closeImgUploadWindow();
}

function onBodyEscapeDown (evt) {
  if (evt.key === 'Escape') {
    closeImgUploadWindow();
  }
}

function onUploadFileElementChange () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  imgUploadScale.addEventListener('click', onimgUploadScaleClick);
  effectList.addEventListener('change', setEffect);
  createEffectLevelSlider();
  setEffect();
  hashtagsField.addEventListener('keydown', cancelCloseWindow);
  commentField.addEventListener('keydown', cancelCloseWindow);
  imgUploadForm.addEventListener('submit', onFormSubmit);
  document.body.addEventListener('keydown', onBodyEscapeDown);
  imgUploadWindowCloseBtn.addEventListener('click', onImgUploadWindowCloseBtnClick);
  uploadFileElement.removeEventListener('change', onUploadFileElementChange);
}

uploadFileElement.addEventListener('change', onUploadFileElementChange);
