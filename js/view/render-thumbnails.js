import { clearElement } from '../functions/clear-element.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const createPictureElement = ({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.setAttribute('data-id', id);
  pictureImg.src = url;
  pictureImg.alt = description;

  const pictureLikes = pictureElement.querySelector('.picture__likes');
  pictureLikes.textContent = likes;

  const pictureComments = pictureElement.querySelector('.picture__comments');
  pictureComments.textContent = comments.length;

  return pictureElement;
};


const renderThumbnails = (picturesData) => {
  clearElement(picturesContainer, '.img-upload');

  const pictureFragment = document.createDocumentFragment();

  picturesData.forEach((data) => {
    const pictureElement = createPictureElement(data);
    pictureFragment.append(pictureElement);
  });

  picturesContainer.append(pictureFragment);
};

export { renderThumbnails };
