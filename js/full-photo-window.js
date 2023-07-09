import {photos} from './get-photos.js';

const galery = document.querySelector('.pictures');
const thumbnails = galery.querySelectorAll('.picture');
const fullPhotoWindow = document.querySelector('.big-picture');
const img = fullPhotoWindow.querySelector('.big-picture__img img');
const likesCount = fullPhotoWindow.querySelector('.likes-count');
const caption = fullPhotoWindow.querySelector('.social__caption');
const commentsArea = fullPhotoWindow.querySelector('.social__comments');
const totalCommentsCount = fullPhotoWindow.querySelector('.comments-count');
const actualCommentsCount = fullPhotoWindow.querySelector('.actual-comments-count');
const commentsLoader = fullPhotoWindow.querySelector('.comments-loader');
const closeButton = fullPhotoWindow.querySelector('.big-picture__cancel');

// ↓ ↓ ↓ комментарии  ↓ ↓ ↓

let commentsElements = [];

function checkCommentsLoader () {
  if (!commentsElements.length) {
    commentsLoader.classList.add('hidden');
  }
}

function startCommentsLoader () {
  commentsLoader.addEventListener('click', showCommentsElements);
}

function showTotalCommentsCount () {
  totalCommentsCount.textContent = commentsElements.length;
}

function showActualCommentsCount (count) {
  actualCommentsCount.textContent = +actualCommentsCount.textContent + count;
}

function showAllCommentsElements () {
  commentsElements.forEach((commentElement) => {
    commentsArea.append(commentElement);
  });
}

function showPartCommentsElements (partLength) {
  for (let i = 0; i < partLength; i++) {
    commentsArea.append(commentsElements[i]);
  }
}

function showCommentsElements () {
  const oneShowMaxCount = 5;
  let currentLength;
  if (commentsElements.length <= oneShowMaxCount) {
    showAllCommentsElements();
    currentLength = commentsElements.length;
  } else {
    showPartCommentsElements(oneShowMaxCount);
    currentLength = oneShowMaxCount;
  }
  showActualCommentsCount(currentLength);
  commentsElements = commentsElements.slice(currentLength);
  checkCommentsLoader();
}

function makeCommentsElements (comments) {
  comments.forEach(({avatar, name, message}) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
      <p class="social__text">${message}</p>
      `;
    commentsElements.push(commentElement);
  });
  showTotalCommentsCount();
}

function clearCommentsArea () {
  commentsArea.innerHTML = '';
}

function startComments (comments) {
  clearCommentsArea();
  makeCommentsElements(comments);
  showCommentsElements();
  startCommentsLoader();
}

// ↑ ↑ ↑ комментарии ↑ ↑ ↑

// ↓ ↓ ↓ открытие окна ↓ ↓ ↓

function dataRendering ({url, description, likes, comments}) {
  fullPhotoWindow.classList.remove('hidden');
  img.src = url;
  likesCount.textContent = likes;
  caption.textContent = description;
  startComments(comments);
}

function openFullPhotoWindow (photo) {
  document.body.classList.add('modal-open');
  dataRendering(photo);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.body.addEventListener('keydown', onBodyEscapeDown);
  galery.removeEventListener('click', onThumbnailClick);
}

// ↑ ↑ ↑ открытие окна ↑ ↑ ↑

// ↓ ↓ ↓ закрытие окна ↓ ↓ ↓

function closeFullPhotoWindow () {
  fullPhotoWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsElements = [];
  actualCommentsCount.textContent = 0;
  commentsLoader.removeEventListener('click', showCommentsElements);
  commentsLoader.classList.remove('hidden');
  galery.addEventListener('click', onThumbnailClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.body.removeEventListener('keydown', onBodyEscapeDown);
}

function onBodyEscapeDown (evt) {
  if (evt.key === 'Escape') {
    closeFullPhotoWindow();
  }
}

function onCloseButtonClick () {
  closeFullPhotoWindow();
}

// ↑ ↑ ↑ закрытие окна ↑ ↑ ↑

// ↓ ↓ ↓ обработчик миниатюр ↓ ↓ ↓

function onThumbnailClick (evt) {
  for (let i = 0; i < thumbnails.length; i++) {
    if (evt.target.closest(`.picture:nth-of-type(${i + 1})`)) {
      openFullPhotoWindow(photos[i]);
    }
  }
}

function addThumbnailsClickHandler () {
  galery.addEventListener('click', onThumbnailClick);
}

// ↑ ↑ ↑ обработчик миниатюр ↑ ↑ ↑

addThumbnailsClickHandler();
