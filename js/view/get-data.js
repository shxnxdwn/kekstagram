const DATA_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const ERROR_MESSAGE_TIMEOUT = 5000;


const onError = () => {
  const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_MESSAGE_TIMEOUT);
};


const getData = (renderThumbFunction, setPicturesDataFunction) => {
  fetch(DATA_URL)
    .then((response) => response.json())
    .then((picturesData) => {
      renderThumbFunction(picturesData);
      setPicturesDataFunction(picturesData);
    })
    .catch(() => {
      onError();
    });
};


export { getData };
