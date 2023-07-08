import {photos} from './get-photos.js';

const galery = document.querySelector('.pictures');
const thumbnails = galery.querySelectorAll('.picture');

const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const fullPhotoLikesCount = fullPhoto.querySelector('.likes-count');
const fullPhotoDescription = fullPhoto.querySelector('.social__caption');
const totalCommentsCount = fullPhoto.querySelector('.comments-count');
const actualCommentsCount = fullPhoto.querySelector('.actual-comments-count');
const commentsArea = fullPhoto.querySelector('.social__comments');
const commentsLoader = fullPhoto.querySelector('.comments-loader');
const fullPhotoCloseButton = fullPhoto.querySelector('.big-picture__cancel');

// ↓ ↓ ↓ сборка, вывод и отображение кол-ва комментариев ↓ ↓ ↓

let comments = [];

function checkCommentsLoader () {
  if (!comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function startCommentsLoader () {
  commentsLoader.addEventListener('click', showComments);
}

function showTotalCommentsCount () {
  totalCommentsCount.textContent = comments.length;
}

function showActualCommentsCount (count) {
  actualCommentsCount.textContent = +actualCommentsCount.textContent + count;
}

function showAllComments () {
  comments.forEach((comment) => {
    commentsArea.append(comment);
  });
}

function showPartComments (partLength) {
  for (let i = 0; i < partLength; i++) {
    commentsArea.append(comments[i]);
  }
}

function showComments () {
  const oneShowMaxCount = 5;
  let actionLength;
  if (comments.length <= oneShowMaxCount) {
    showAllComments();
    actionLength = comments.length;
  } else {
    showPartComments(oneShowMaxCount);
    actionLength = oneShowMaxCount;
  }
  showActualCommentsCount(actionLength);
  comments = comments.slice(actionLength);
  checkCommentsLoader();
}

function makeComments (i) {
  photos[i].comments.forEach(({avatar, name, message}) => {
    const comment = document.createElement('li');
    comment.classList.add('social__comment');
    comment.innerHTML = `
      <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
      <p class="social__text">${message}</p>
      `;
    comments.push(comment);
  });
  showTotalCommentsCount();
}

function clearCommentsArea () {
  commentsArea.innerHTML = '';
}

function startComments (i) {
  clearCommentsArea();
  makeComments(i);
  showComments();
  startCommentsLoader();
}

// ↑ ↑ ↑ сборка, вывод и отображение кол-ва комментариев ↑ ↑ ↑


// написать ф-ию для закрытия фотографии
// и для открытия
// посмотреть можно ли что-то сделать с параметром i который везде

const renderFullPhoto = (i) => {
  document.body.classList.add('modal-open');

  fullPhoto.classList.remove('hidden');
  fullPhotoImg.src = photos[i].url;
  fullPhotoLikesCount.textContent = photos[i].likes;
  fullPhotoDescription.textContent = photos[i].description;


  startComments(i);


  fullPhotoCloseButton.addEventListener('click', onFullPhotoCloseButtonClick);
  document.addEventListener('keydown', onBodyEscapeDown);
  galery.removeEventListener('click', onThumbnailClick);
};

function onBodyEscapeDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    fullPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');
    comments = [];
    actualCommentsCount.textContent = 0;
    commentsLoader.removeEventListener('click', showComments);
    commentsLoader.classList.remove('hidden');

    galery.addEventListener('click', onThumbnailClick);
    document.removeEventListener('keydown', onBodyEscapeDown);
  }
}

function onFullPhotoCloseButtonClick () {
  fullPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  comments = [];
  actualCommentsCount.textContent = 0;
  commentsLoader.removeEventListener('click', showComments);
  commentsLoader.classList.remove('hidden');

  galery.addEventListener('click', onThumbnailClick);
  fullPhotoCloseButton.removeEventListener('click', onFullPhotoCloseButtonClick);
}

function onThumbnailClick (evt) {
  for (let i = 0; i < thumbnails.length; i++) {
    if (evt.target.closest(`.picture:nth-of-type(${i + 1})`)) {
      renderFullPhoto(i);
    }
  }
}

const addThumbnailsClickHandler = () => {
  galery.addEventListener('click', onThumbnailClick);
};

addThumbnailsClickHandler();
