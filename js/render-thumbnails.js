import {genData} from './gen-data.js';

const pictures = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const data = genData();

data.forEach(({url, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailImg = thumbnail.querySelector('.picture__img');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');

  thumbnailImg.src = url;
  thumbnailLikes.textContent = likes;
  thumbnailComments.textContent = comments.length;

  pictures.append(thumbnail);
});
