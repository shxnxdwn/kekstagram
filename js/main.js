import { renderThumb } from'./thumbnail.js';
import { setPicturesData } from './full-picture.js';
import './form/form.js';


fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((picturesData) => {
    renderThumb(picturesData);
    setPicturesData(picturesData);
  });
