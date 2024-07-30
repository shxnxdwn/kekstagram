const GET_DATA_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/data';
const ERROR_MESSAGE_TIMEOUT = 5000;


const onError = () => {
  const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_MESSAGE_TIMEOUT);
};


const getData = (renderThumbCb, setPicturesDataCb, showFilterListCb) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((picturesData) => {
      renderThumbCb(picturesData);
      setPicturesDataCb(picturesData);
      showFilterListCb(picturesData, renderThumbCb);
    })
    .catch(() => {
      onError();
    });
};


export { getData };
