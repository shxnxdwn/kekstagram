import { CREATED_PHOTOS } from './data.js';

const renderThumb = (pictures) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const pictureFragment = new DocumentFragment();

  pictures.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const pictureImg = pictureElement.querySelector('.picture__img');
    pictureImg.setAttribute('data-id', id);
    pictureImg.src = url;
    pictureImg.alt = description;

    const pictureLikes = pictureElement.querySelector('.picture__likes');
    pictureLikes.textContent = likes;

    const pictureComments = pictureElement.querySelector('.picture__comments');
    pictureComments.textContent = comments.length;

    pictureFragment.append(pictureElement);
  });

  picturesContainer.append(pictureFragment);
};

renderThumb(CREATED_PHOTOS);
