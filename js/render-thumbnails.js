import {getTestData} from './get-test-data.js';

const galery = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

getTestData().forEach(({url, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailImg = thumbnail.querySelector('.picture__img');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');

  thumbnailImg.src = url;
  thumbnailLikes.textContent = likes;
  thumbnailComments.textContent = comments.length;

  galery.append(thumbnail);
});
