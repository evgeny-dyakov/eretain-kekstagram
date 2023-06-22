import {photos} from './get-photos.js';

const galery = document.querySelector('.pictures');
const thumbnails = galery.querySelectorAll('.picture');

const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const fullPhotoLikesCount = fullPhoto.querySelector('.likes-count');
const fullPhotoCommentsCount = fullPhoto.querySelector('.comments-count');
const fullPhotoDescription = fullPhoto.querySelector('.social__caption');
const fullPhotoComments = fullPhoto.querySelector('.social__comments');
const fullPhotoCloseButton = fullPhoto.querySelector('.big-picture__cancel');

const renderComments = (i) => {
  fullPhotoComments.innerHTML = '';
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

    fullPhotoComments.append(comment);
  });
};

const renderFullPhoto = (i) => {
  document.body.classList.add('modal-open');

  fullPhoto.classList.remove('hidden');
  fullPhotoImg.src = photos[i].url;
  fullPhotoLikesCount.textContent = photos[i].likes;
  fullPhotoCommentsCount.textContent = photos[i].comments.length;
  fullPhotoDescription.textContent = photos[i].description;

  renderComments(i);

  fullPhotoCloseButton.addEventListener('click', onFullPhotoCloseButtonClick);
  document.addEventListener('keydown', onBodyEscapeDown);
  galery.removeEventListener('click', onThumbnailClick);
};

function onBodyEscapeDown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    fullPhoto.classList.add('hidden');
    document.body.classList.remove('modal-open');

    galery.addEventListener('click', onThumbnailClick);
    document.removeEventListener('keydown', onBodyEscapeDown);
  }
}

function onFullPhotoCloseButtonClick () {
  fullPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');

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
