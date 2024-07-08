import {
  MAX_AVATAR_COUNT,
  MAX_PHOTO_COUNT,
  MAX_COMMENT_COUNT,
  LIKES_RANGE,
  COMMENTS_RANGE,
  PHOTO_DESCRIPTIONS,
  COMMENT_NAMES,
  COMMENT_MESSAGES
} from './constants.js';

import { getRandomInteger } from './functions/get-random-integer.js/index.js';
import { getRandomArrayElement } from './functions/get-random-array-element.js/index.js';
import { createUniqueNumbersGenerator } from './functions/unique-number-generator.js';


const getRandomId = createUniqueNumbersGenerator(1, MAX_PHOTO_COUNT);
const getRandomUrlNumber = createUniqueNumbersGenerator(1, MAX_PHOTO_COUNT);
const getRandomCommentId = createUniqueNumbersGenerator(1, MAX_COMMENT_COUNT);

const createComment = () => ({
  id: getRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(COMMENT_NAMES)
});

const createPhotoDescription = () => ({
  id: getRandomId(),
  url: `photos/${getRandomUrlNumber()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(...LIKES_RANGE),
  comments: Array.from({length: getRandomInteger(...COMMENTS_RANGE)}, createComment)
});

const createPhotos = () => Array.from({length: MAX_PHOTO_COUNT}, createPhotoDescription);

export { createPhotos };
