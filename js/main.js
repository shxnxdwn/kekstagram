const MAX_AVATAR_COUNT = 6;
const MAX_PHOTO_COUNT = 25;
const MAX_COMMENT_COUNT = 999;
const LIKES_RANGE = [15, 200];
const COMMENTS_RANGE = [0, 30];

const PHOTO_DESCRIPTIONS = [
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


const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const createUniqueNumbersGenerator = (min, max) => {
  const generatedNumbers = new Set();

  return () => {
    if (generatedNumbers.size >= (max - min + 1)) {
      throw new Error(`Перебраны все числа из диапазона от ${min} до ${max}`);
    }

    let currentValue;
    do {
      currentValue = getRandomInteger(min, max);
    } while (generatedNumbers.has(currentValue));

    generatedNumbers.add(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const photos = Array.from({length: 25}, createPhotoDescription);

photos.at(0); // Чтобы избежать ошибки ESlint "неиспользуемая переменная"
