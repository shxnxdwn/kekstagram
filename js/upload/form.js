import { applyEffect, initializeSlider, destroySlider } from './effects';
import { initializeScale, destroyScale } from './scale';
import { setupValidation } from './validation';
import { sendForm } from './send-form';


const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = pictureUploadForm.querySelector('.img-upload__input');
const pictureUploadOverlay = pictureUploadForm.querySelector('.img-upload__overlay');
const picturePreview = pictureUploadOverlay.querySelector('.img-upload__preview > img');
const pictureUploadCloseButton = pictureUploadOverlay.querySelector('.img-upload__cancel');

const effectList = document.querySelector('.effects__list');
const hashtagInput = pictureUploadOverlay.querySelector('.text__hashtags');
const commentInput = pictureUploadOverlay.querySelector('.text__description');


const openPictureUploadOverlay = (event) => {
  const [file] = event.target.files;

  if (file) {
    const reader = new FileReader();

    reader.onload = (evt) => {
      picturePreview.src = evt.target.result;
    };

    reader.readAsDataURL(file);

    pictureUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    pictureUploadCloseButton.addEventListener('click', onClickCloseButton);
    document.addEventListener('keydown', onDocumentKeydownEscape);

    initializeScale();
    initializeSlider();

    effectList.addEventListener('change', applyEffect);

    hashtagInput.addEventListener('keydown', onInputKeydownEscape);
    commentInput.addEventListener('keydown', onInputKeydownEscape);


    const pristine = setupValidation(pictureUploadForm, hashtagInput, commentInput);

    const onClickSubmitButton = (evt) => {
      evt.preventDefault();

      if (pristine.validate()) {
        const formData = new FormData(evt.currentTarget);
        sendForm(formData);
        pictureUploadForm.removeEventListener('submit', onClickSubmitButton);
      }
    };

    pictureUploadForm.addEventListener('submit', onClickSubmitButton);
  }
};


const clearForm = () => {
  picturePreview.src = '';
  picturePreview.style.transform = 'scale(1)';
  picturePreview.style.filter = 'none';

  hashtagInput.value = '';
  commentInput.value = '';

  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.effect-level__value').value = '';

  const errors = document.querySelectorAll('.img-upload__field-wrapper--error');
  errors.forEach((error) => error.remove());
};


const closePictureUploadOverlay = () => {
  document.body.classList.remove('modal-open');
  pictureUploadOverlay.classList.add('hidden');

  clearForm();
  destroyScale();
  destroySlider();

  pictureUploadCloseButton.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onDocumentKeydownEscape);

  effectList.removeEventListener('change', applyEffect);

  hashtagInput.removeEventListener('keydown', onInputKeydownEscape);
  commentInput.removeEventListener('keydown', onInputKeydownEscape);
};


function onClickCloseButton() {
  closePictureUploadOverlay();
}

function onDocumentKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePictureUploadOverlay();
  }
}

function onInputKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

pictureUploadInput.addEventListener('change', openPictureUploadOverlay);


export { closePictureUploadOverlay };
