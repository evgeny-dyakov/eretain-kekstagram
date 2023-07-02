import {checkMaxStringLength, removeStringInArray} from './util.js';

const uploadFileElement = document.querySelector('#upload-file');
const imgUploadWindow = document.querySelector('.img-upload');
const imgUploadOverlay = imgUploadWindow.querySelector('.img-upload__overlay');
const imgUploadWindowCloseBtn = imgUploadWindow.querySelector('.img-upload__cancel');
const imgUploadForm = imgUploadWindow.querySelector('.img-upload__form');
const commentField = imgUploadWindow.querySelector('.text__description');
const hashtagsField = imgUploadWindow.querySelector('.text__hashtags');
const imgUploadSubmit = imgUploadWindow.querySelector('.img-upload__submit');

function convertHashtagsValueToArray (value) {
  const  hashtags = value.split(' ');
  return removeStringInArray(hashtags, '');
}

const imgUploadFormConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'validation-error',
  successClass: 'validation-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'validation-error-text'
};

const pristine = new Pristine(imgUploadForm, imgUploadFormConfig, true);

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

function cancelCloseWindow (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function closeImgUploadWindow () {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  hashtagsField.removeEventListener('keydown', cancelCloseWindow);
  commentField.removeEventListener('keydown', cancelCloseWindow);
  imgUploadForm.removeEventListener('submit', onFormSubmit);
  uploadFileElement.value = '';
  commentField.value = '';
  hashtagsField.value = '';

  uploadFileElement.addEventListener('change', onUploadFileElementChange);
}

function onImgUploadWindowCloseBtnClick () {
  closeImgUploadWindow();

  imgUploadWindowCloseBtn.removeEventListener('click', onImgUploadWindowCloseBtnClick);
}

function onBodyEscapeDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeImgUploadWindow();

    document.body.removeEventListener('keydown', onBodyEscapeDown);
  }
}

function onUploadFileElementChange () {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onBodyEscapeDown);
  imgUploadWindowCloseBtn.addEventListener('click', onImgUploadWindowCloseBtnClick);
  hashtagsField.addEventListener('keydown', cancelCloseWindow);
  commentField.addEventListener('keydown', cancelCloseWindow);
  imgUploadForm.addEventListener('submit', onFormSubmit);

  uploadFileElement.removeEventListener('change', onUploadFileElementChange);
}

uploadFileElement.addEventListener('change', onUploadFileElementChange);
