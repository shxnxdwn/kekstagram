import { renderThumb } from './view/thumbnail.js';
import { setPicturesData } from './view/full-picture.js';
import './upload/form.js';


fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((picturesData) => {
    renderThumb(picturesData);
    setPicturesData(picturesData);
  });
