import { applyEffect, initializeSlider, destroySlider } from './effects';
import { initializeScale, destroyScale } from './scale';
import { setupValidation } from './validation';
import { sendForm } from './send-form';

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = pictureUploadForm.querySelector('.img-upload__input');
const pictureUploadOverlay = pictureUploadForm.querySelector('.img-upload__overlay');
const picturePreview = pictureUploadOverlay.querySelector('.img-upload__preview > img');
const pictureEffectsList = pictureUploadOverlay.querySelectorAll('.effects__preview');
const pictureUploadCloseButton = pictureUploadOverlay.querySelector('.img-upload__cancel');

const effectList = document.querySelector('.effects__list');
const hashtagInput = pictureUploadOverlay.querySelector('.text__hashtags');
const commentInput = pictureUploadOverlay.querySelector('.text__description');


const onClickCloseButton = () => {
  closePictureUploadOverlay();
};

const onDocumentKeydownEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePictureUploadOverlay();
  }
};

const onInputKeydownEscape = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};


const onClickSubmitButton = (evt) => {
  evt.preventDefault();

  const pristine = setupValidation(pictureUploadForm, hashtagInput, commentInput);

  if (pristine.validate()) {
    const formData = new FormData(evt.currentTarget);
    sendForm(formData);
  }
};


const openPictureUploadOverlay = (event) => {
  const [file] = event.target.files;

  if (file) {
    const reader = new FileReader();

    reader.onload = (evt) => {
      picturePreview.src = evt.target.result;

      for (const effect of pictureEffectsList) {
        effect.style.backgroundImage = `url('${evt.target.result}')`;
      }
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

    pictureUploadForm.addEventListener('submit', onClickSubmitButton);
  }
};


const clearForm = () => {
  picturePreview.src = '';
  picturePreview.style.transform = 'scale(1)';
  picturePreview.style.filter = 'none';
  hashtagInput.value = '';
  commentInput.value = '';
  pictureUploadInput.value = null;

  document.querySelector('.scale__control--value').value = '100%';
  document.querySelector('.effect-level__value').value = '';
  document.querySelectorAll('.img-upload__field-wrapper--error').forEach((error) => error.remove());
};


const removeEventListeners = () => {
  pictureUploadCloseButton.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onDocumentKeydownEscape);
  effectList.removeEventListener('change', applyEffect);
  hashtagInput.removeEventListener('keydown', onInputKeydownEscape);
  commentInput.removeEventListener('keydown', onInputKeydownEscape);
};


function closePictureUploadOverlay() {
  document.body.classList.remove('modal-open');
  pictureUploadOverlay.classList.add('hidden');
  pictureUploadForm.removeEventListener('submit', onClickSubmitButton);

  clearForm();
  destroyScale();
  destroySlider();
  removeEventListeners();
}


pictureUploadInput.addEventListener('change', openPictureUploadOverlay);


export { closePictureUploadOverlay };
