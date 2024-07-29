import { closePictureUploadOverlay } from './form.js';

const SEND_DATA_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const submitButton = document.querySelector('.img-upload__submit');


const onSuccessSend = () => {
  const successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const successButton = successElement.querySelector('.success__button');

  document.body.append(successElement);

  successButton.addEventListener('click', onClickSuccessButton);
  successElement.addEventListener('click', onClickOverlay);
  document.addEventListener('keydown', onDocumentKeydownEscape);


  function onClickSuccessButton() {
    successButton.removeEventListener('click', onClickSuccessButton);
    successElement.removeEventListener('click', onClickOverlay);
    document.removeEventListener('keydown', onDocumentKeydownEscape);

    successElement.remove();
  }


  function onClickOverlay(event) {
    if (event.target.closest('.success__inner')) {
      return;
    }

    successButton.removeEventListener('click', onClickSuccessButton);
    successElement.removeEventListener('click', onClickOverlay);
    document.removeEventListener('keydown', onDocumentKeydownEscape);

    successElement.remove();
  }


  function onDocumentKeydownEscape(event) {
    if (event.key === 'Escape') {
      event.preventDefault();

      successButton.removeEventListener('click', onClickSuccessButton);
      successElement.removeEventListener('click', onClickOverlay);
      document.removeEventListener('keydown', onDocumentKeydownEscape);

      successElement.remove();
    }
  }
};


const onErrorSend = () => {
  const errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  document.body.append(errorElement);

  errorButton.addEventListener('click', onClickErrorButton);
  errorElement.addEventListener('click', onClickOverlay);
  document.addEventListener('keydown', onDocumentKeydownEscape);


  function onClickErrorButton() {
    errorButton.removeEventListener('click', onClickErrorButton);
    errorElement.removeEventListener('click', onClickOverlay);
    document.removeEventListener('keydown', onDocumentKeydownEscape);

    errorElement.remove();
  }


  function onClickOverlay(event) {
    if (event.target.closest('.error__inner')) {
      return;
    }

    errorButton.removeEventListener('click', onClickErrorButton);
    errorElement.removeEventListener('click', onClickOverlay);
    document.removeEventListener('keydown', onDocumentKeydownEscape);

    errorElement.remove();
  }


  function onDocumentKeydownEscape(event) {
    if (event.key === 'Escape') {
      event.preventDefault();

      errorButton.removeEventListener('click', onClickErrorButton);
      errorElement.removeEventListener('click', onClickOverlay);
      document.removeEventListener('keydown', onDocumentKeydownEscape);

      errorElement.remove();
    }
  }
};


const sendForm = (formData) => {
  submitButton.disabled = true;

  fetch(SEND_DATA_URL, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        submitButton.disabled = false;
        closePictureUploadOverlay();
        onSuccessSend();
      } else {
        submitButton.disabled = false;
        onErrorSend();
      }
    })
    .catch(() => {
      submitButton.disabled = false;
      onErrorSend();
    });
};


export { sendForm };
