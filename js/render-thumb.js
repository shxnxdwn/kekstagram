import { CREATED_PHOTOS } from './data.js';

const renderThumb = (pictures) => { // Данная функция только для создания thumb или ее адаптировать, чтобы можно было использовать в других модулях? Например, в модуле render-big-picture похожая логика, нам ее там описывать отдельно или взять эту же на основу, вынести ее отдельно и использовать в двух модулях?
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const pictureFragment = new DocumentFragment();

  pictures.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const pictureImg = pictureElement.querySelector('.picture__img'); // нужны ли эти переменные? (задел на будущее)
    pictureImg.src = url;
    pictureImg.alt = description;

    const pictureLikes = pictureElement.querySelector('.picture__likes'); // нужны ли эти переменные? (задел на будущее)
    pictureLikes.textContent = likes;

    const pictureComments = pictureElement.querySelector('.picture__comments'); // нужны ли эти переменные? (задел на будущее)
    pictureComments.textContent = comments.length;

    pictureFragment.append(pictureElement);
  });

  picturesContainer.append(pictureFragment);
};

renderThumb(CREATED_PHOTOS);
