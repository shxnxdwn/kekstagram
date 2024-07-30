import { closePictureUploadOverlay } from './form.js';

const SEND_DATA_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const submitButton = document.querySelector('.img-upload__submit');


const showNotification = (type) => {
  const template = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const notificationElement = template.cloneNode(true);
  const button = notificationElement.querySelector(`.${type}__button`);

  document.body.append(notificationElement);


  const onClickButton = () => {
    closeNotification(notificationElement, button);
  };


  const onClickOverlay = (event) => {
    if (!event.target.closest(`.${type}__inner`)) {
      closeNotification(notificationElement, button);
    }
  };


  const onKeydownEscape = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeNotification(notificationElement, button);
    }
  };


  button.addEventListener('click', onClickButton);
  notificationElement.addEventListener('click', onClickOverlay);
  document.addEventListener('keydown', onKeydownEscape);


  function closeNotification (element, buttonElement) {
    buttonElement.removeEventListener('click', onClickButton);
    element.removeEventListener('click', onClickOverlay);
    document.removeEventListener('keydown', onKeydownEscape);
    element.remove();
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
        closePictureUploadOverlay();
        showNotification('success');
      } else {
        showNotification('error');
      }
    })
    .catch(() => {
      showNotification('error');
    })
    .finally(() => {
      submitButton.disabled = false;
    });
};

export { sendForm };
