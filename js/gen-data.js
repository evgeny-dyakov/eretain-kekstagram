import {getRandomInt, shuffleArray, getOrderedArray, getUnorderedArray} from './util.js';

const getIds = (quantity) => getOrderedArray(1, quantity);

const getUrls = (quantity) => getUnorderedArray(1, quantity).map((num) => `photos/${num}.jpg`);

const getDescriptions = (quantity) => {
  const descriptions = [
    'Лучший день на пляже',
    'Встреча с друзьями',
    'Новый год',
    'Моя любимая книга',
    'Любимое блюдо',
    'Мой новый наряд',
    'Самое вкусное мороженое',
    'Мой любимый город',
    'Мой любимый фильм',
    'Моя любимая музыка',
    'Лучший день в году',
    'Мой любимый цвет',
    'Лучшее время года',
    'Мой любимый спорт',
    'Лучшая поездка в жизни',
    'Мой любимый праздник',
    'Лучший подарок, который я получил',
    'Моя любимая игра',
    'Лучшее место для отдыха',
    'Моя любимая картина',
    'Лучший концерт в жизни',
    'Мой любимый актер',
    'Лучшее время суток',
    'Мой любимый цветок',
    'Лучший способ провести выходные',
  ];

  if (descriptions.length < quantity) {
    return null;
  }

  return shuffleArray(descriptions).slice(0, quantity);
};

const getLikes = (quantity) => {
  const minLikes = 15;
  const maxLikes = 200;

  const likes = [];

  for (let i = 0; i < quantity; i++) {
    likes[i] = getRandomInt(minLikes, maxLikes);
  }

  return likes;
};

const getCommentsQuantityPerPhotoList = (photosQuantity, minCommentsPerPhoto, maxCommentsPerPhoto) => {
  const result = [];

  for (let i = 0; i < photosQuantity; i++) {
    result[i] = (getRandomInt(minCommentsPerPhoto, maxCommentsPerPhoto));
  }

  return result;
};

const getCommentsIds = (commentsQuantity) => {
  const minCommentsId = 100;
  const maxIdCorrector = minCommentsId - 1;
  return getUnorderedArray(minCommentsId, commentsQuantity + maxIdCorrector);
};

const getAvatars = (commentsQuantity) => {
  const result = [];

  const minAvatarNum = 1;
  const maxAvatarNum = 6;

  for (let i = 0; i < commentsQuantity; i++) {
    result[i] = (`img/avatar-${getRandomInt(minAvatarNum, maxAvatarNum)}.svg`);
  }

  return result;
};

const getMessages = (commentsQuantity) => {
  const availableSentences = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  const result = [];

  const minNumberSentencesInMessage = 1;
  const maxNumberSentencesInMessage = 2;

  for (let i = 0; i < commentsQuantity; i++) {
    const message = [];
    const quantitySentencesInMessage = getRandomInt(minNumberSentencesInMessage, maxNumberSentencesInMessage);

    const sentencesIndexes = [];
    for (let j = 0; j < quantitySentencesInMessage; j++) {
      if (j > availableSentences.length - 1) {
        console.error(`колличество предложений в сообщении ${i + 1}: ${quantitySentencesInMessage}, превысило количество доступных предложений: ${availableSentences.length}, сообщение сформированно только из доступных предложений`);
        break;
      }
      let sentenceIndex = getRandomInt(0, availableSentences.length - 1);
      while (sentencesIndexes.includes(sentenceIndex)) {
        sentenceIndex = getRandomInt(0, availableSentences.length - 1);
      }
      sentencesIndexes.push(sentenceIndex);
    }
    for (let k = 0; k < sentencesIndexes.length; k++) {
      message[k] = availableSentences[sentencesIndexes[k]];
    }

    result[i] = message.join(' ');
  }
  return result;
};

const getNames = (commentsQuantity) => {
  const availableNames = [
    'Александр',
    'Анна',
    'Вадим',
    'Вера',
    'Галина',
    'Елена',
    'Иван',
    'Мария',
    'Никита',
    'Ольга',
  ];
  const result = [];

  for (let i = 0; i < commentsQuantity; i++) {
    result[i] = availableNames[getRandomInt(0, availableNames.length - 1)];
  }

  return result;
};

const getComments = (photosQuantity) => {
  const result = [];

  const minCommentsPerPhoto = 5;
  const maxCommentsPerPhoto = 15;

  const commentsQuantityPerPhotoList = getCommentsQuantityPerPhotoList(photosQuantity, minCommentsPerPhoto, maxCommentsPerPhoto);
  const commentsQuantity = commentsQuantityPerPhotoList.reduce((el, total) => total + el);

  const commentsIds = getCommentsIds(commentsQuantity);
  const avatars = getAvatars(commentsQuantity);
  const messages = getMessages(commentsQuantity);
  const names = getNames(commentsQuantity);

  let k = 0;

  for (let i = 0; i < photosQuantity; i++) {
    const commentsForOnePhoto = [];
    for (let j = 0; j < commentsQuantityPerPhotoList[i]; j++) {
      const comment = {
        id: commentsIds[k],
        avatar: avatars[k],
        message: messages[k],
        name: names[k],
      };
      commentsForOnePhoto[j] = comment;
      k++;
    }
    result[i] = commentsForOnePhoto;
  }
  return result;
};

const genData = () => {
  const quantity = 25;
  const data = [];

  const ids = getIds(quantity);
  const urls = getUrls(quantity);
  const descriptions = getDescriptions(quantity);
  const likes = getLikes(quantity);
  const comments = getComments(quantity);

  for (let i = 0; i < quantity; i++) {
    const photo = {
      id: ids[i],
      url: urls[i],
      description: descriptions[i],
      likes: likes[i],
      comments: comments[i],
    };

    data[i] = photo;
  }

  return data;
};

export {genData};
