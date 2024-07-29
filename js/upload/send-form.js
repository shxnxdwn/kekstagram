import { closePictureUploadOverlay } from './form.js';

const SEND_DATA_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const submitButton = document.querySelector('.img-upload__submit');


/* eslint-disable */

const onSendForm = () => {
  const successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  const successButton = successElement.querySelector('.success__button');


  const onClickSuccessButton = () => {
    successButton.removeEventListener('click', onClickSuccessButton);
    successElement.remove();
  };

  const onKeydownEscape = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      document.removeEventListener('keydown', onKeydownEscape);
      successElement.remove();
    }
  };

  document.body.append(successElement);


  successButton.addEventListener('click', onClickSuccessButton);
  document.addEventListener('keydown', onKeydownEscape);
};


const sendForm = (formData) => {
  submitButton.disabled = true;

  fetch(SEND_DATA_URL, {
    method: 'POST',
    body: formData
  })
    .then(() => {
      submitButton.disabled = false;
      closePictureUploadOverlay();
      onSendForm();
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
};

export { sendForm };
