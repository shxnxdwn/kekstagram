import { renderThumb } from './thumbnail';
import { setPicturesData } from './full-picture';

const getData = () => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((picturesData) => {
      renderThumb(picturesData);
      setPicturesData(picturesData);
    });
};

export { getData };
