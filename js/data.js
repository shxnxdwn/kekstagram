const MAX_PICTURE_COUNT = 25;
const MAX_AVATAR_COUNT = 6;
const MAX_COMMENT_COUNT = 999;
const LIKES_RANGE = [15, 200];
const COMMENTS_RANGE = [0, 30];

const PICTURE_DESCRIPTIONS = [
  'Вдохновение и красота вокруг нас',
  'Мгновение, остановленное во времени',
  'Искусство видеть детали',
  'Жизнь в её лучших проявлениях',
  'Простота и гармония',
  'Магия момента'
];

const COMMENT_NAMES = [
  'Вайолет',
  'Гилберт',
  'Клаудия',
  'Каттлея',
  'Эрика',
  'Айрис'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

import { getRandomInteger } from './functions/get-random-integer.js';
import { getRandomArrayElement } from './functions/get-random-array-element.js';
import { createUniqueNumbersGenerator } from './functions/create-unique-numbers-generator.js';

const getRandomId = createUniqueNumbersGenerator(1, MAX_PICTURE_COUNT);
const getRandomUrlNumber = createUniqueNumbersGenerator(1, MAX_PICTURE_COUNT);
const getRandomCommentId = createUniqueNumbersGenerator(1, MAX_COMMENT_COUNT);

const createComment = () => ({
  id: getRandomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, MAX_AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(COMMENT_NAMES)
});

const createPictureDescription = () => ({
  id: getRandomId(),
  url: `photos/${getRandomUrlNumber()}.jpg`,
  description: getRandomArrayElement(PICTURE_DESCRIPTIONS),
  likes: getRandomInteger(...LIKES_RANGE),
  comments: Array.from({length: getRandomInteger(...COMMENTS_RANGE)}, createComment)
});

const createPictures = () => Array.from({length: MAX_PICTURE_COUNT}, createPictureDescription);

export { createPictures, MAX_PICTURE_COUNT };
