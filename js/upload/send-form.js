import { closePictureUploadOverlay } from './form.js';

// TODO: remove console.log
/* eslint-disable-no-console */

const sendForm = (formData) => {
  fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success: ', data);
      closePictureUploadOverlay();
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
};

export { sendForm };
