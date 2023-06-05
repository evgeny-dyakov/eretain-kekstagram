const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const checkMaxStringLength = (string, limit) => string.length <= limit;

const shuffleArray = (array) => {
  const result = [];
  const indexes = [];

  for (let i = 0; i < array.length; i++) {
    let index = getRandomInt(0, array.length - 1);
    while (indexes.includes(index)) {
      index = getRandomInt(0, array.length - 1);
    }
    indexes[i] = index;
    result[i] = array[index];
  }

  return result;
};

const getOrderedArray = (min, max) => {
  const result = [];

  for (let i = min; i <= max; i++) {
    result.push(i);
  }

  return result;
};

const getUnorderedArray = (min, max) => shuffleArray(getOrderedArray(min, max));

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
  const MIN_LIKES = 15;
  const MAX_LIKES = 200;

  const likes = [];

  for (let i = 0; i < quantity; i++) {
    likes[i] = getRandomInt(MIN_LIKES, MAX_LIKES);
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
  const MIN_COMMENTS_ID = 100;
  const maxIdCorrector = MIN_COMMENTS_ID - 1;
  return getUnorderedArray(MIN_COMMENTS_ID, commentsQuantity + maxIdCorrector);
};

const getAvatars = (commentsQuantity) => {
  const result = [];

  const MIN_AVATAR_NUM = 1;
  const MAX_AVATAR_NUM = 6;

  for (let i = 0; i < commentsQuantity; i++) {
    result[i] = (`img/avatar-${getRandomInt(MIN_AVATAR_NUM, MAX_AVATAR_NUM)}.svg`);
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

  const MIN_NUMBER_SENTENCES_IN_MESSAGE = 1;
  const MAX_NUMBER_SENTENCES_IN_MESSAGE = 2;

  for (let i = 0; i < commentsQuantity; i++) {
    const message = [];
    const quantitySentencesInMessage = getRandomInt(MIN_NUMBER_SENTENCES_IN_MESSAGE, MAX_NUMBER_SENTENCES_IN_MESSAGE);

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

  const MIN_COMMENTS_PER_PHOTO = 5;
  const MAX_COMMENTS_PER_PHOTO = 15;

  const commentsQuantityPerPhotoList = getCommentsQuantityPerPhotoList(photosQuantity, MIN_COMMENTS_PER_PHOTO, MAX_COMMENTS_PER_PHOTO);
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
}

function genData () {
  const QUANTITY = 25;
  const data = [];

  const ids = getIds(QUANTITY);
  const urls = getUrls(QUANTITY);
  const descriptions = getDescriptions(QUANTITY);
  const likes = getLikes(QUANTITY);
  const comments = getComments(QUANTITY);

  for (let i = 0; i < QUANTITY; i++) {
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
}

console.log(genData());

