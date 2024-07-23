import { setupValidation } from './form-validation';

const SCALE_STEP = 25;

const PICTURE_EFFECTS = {
  none: () => 'none',
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`
};

const SLIDER_OPTIONS = {
  none: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  heat: { range: { min: 1, max: 3 }, start: 3, step: 0.1 }
};

const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = pictureUploadForm.querySelector('.img-upload__input');
const pictureUploadOverlay = pictureUploadForm.querySelector('.img-upload__overlay');
const picturePreview = pictureUploadOverlay.querySelector('.img-upload__preview > img');
const picturePreviewCloseButton = pictureUploadOverlay.querySelector('.img-upload__cancel');

const pictureScaleField = pictureUploadOverlay.querySelector('.img-upload__scale');
const pictureScaleSmallerButton = pictureScaleField.querySelector('.scale__control--smaller');
const pictureScaleBiggerButton = pictureScaleField.querySelector('.scale__control--bigger');
const pictureScaleValue = pictureScaleField.querySelector('.scale__control--value');

const effectLevelField = document.querySelector('.effect-level');
const sliderElement = effectLevelField.querySelector('.effect-level__slider');
const valueElement = effectLevelField.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

const picturePreviewText = pictureUploadOverlay.querySelector('.img-upload__text');
const hashtagInput = pictureUploadOverlay.querySelector('.text__hashtags');
const commentInput = pictureUploadOverlay.querySelector('.text__description');

let currentEffect = 'none';


noUiSlider.create(sliderElement, SLIDER_OPTIONS.none);

sliderElement.noUiSlider.on('update', () => {
  const value = Number(sliderElement.noUiSlider.get()).toFixed(1);
  valueElement.value = value;
  picturePreview.style.filter = PICTURE_EFFECTS[currentEffect](value);
});


const applyEffect = (evt) => {
  const inputElement = evt.target.closest('input[type="radio"]');

  if (inputElement) {
    const chosenFilter = inputElement.value;
    currentEffect = chosenFilter;
    picturePreview.style.filter = PICTURE_EFFECTS[chosenFilter](SLIDER_OPTIONS[chosenFilter].start);

    sliderElement.noUiSlider.updateOptions(SLIDER_OPTIONS[chosenFilter]);
    sliderElement.noUiSlider.set(SLIDER_OPTIONS[chosenFilter].start);

    if (chosenFilter === 'none') {
      effectLevelField.classList.add('hidden');
    } else {
      effectLevelField.classList.remove('hidden');
    }
  }
};


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

    picturePreviewCloseButton.addEventListener('click', onClickCloseButton);
    document.addEventListener('keydown', onDocumentKeydownEscape);

    pictureScaleSmallerButton.addEventListener('click', onClickScaleSmallerButton);
    pictureScaleBiggerButton.addEventListener('click', onClickScaleBiggerButton);

    effectList.addEventListener('click', applyEffect);
    effectList.addEventListener('change', applyEffect);

    hashtagInput.addEventListener('keydown', onInputKeydownEscape);
    commentInput.addEventListener('keydown', onInputKeydownEscape);

    setupValidation(pictureUploadForm, hashtagInput, commentInput);
  }
};


const clearForm = () => {
  picturePreview.src = '';
  pictureScaleValue.value = '100%';
  picturePreview.style.transform = '';
  hashtagInput.value = '';
  commentInput.value = '';

  const errors = picturePreviewText.querySelectorAll('.img-upload__field-wrapper--error');

  if (errors.length > 0) {
    for (const error of errors) {
      error.remove();
    }
  }
};


const closePictureUploadOverlay = () => {
  document.body.classList.remove('modal-open');
  pictureUploadOverlay.classList.add('hidden');

  clearForm();

  picturePreviewCloseButton.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onDocumentKeydownEscape);

  pictureScaleSmallerButton.removeEventListener('click', onClickScaleSmallerButton);
  pictureScaleBiggerButton.removeEventListener('click', onClickScaleBiggerButton);

  effectList.removeEventListener('click', applyEffect);
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

function onClickScaleSmallerButton() {
  const currentValue = parseInt(pictureScaleValue.value, 10);

  if (currentValue > 25) {
    pictureScaleValue.value = `${currentValue - SCALE_STEP}%`;
    picturePreview.style.transform = `scale(${parseInt(pictureScaleValue.value, 10) / 100})`;
  }
}

function onClickScaleBiggerButton() {
  const currentValue = parseInt(pictureScaleValue.value, 10);

  if (currentValue < 100) {
    pictureScaleValue.value = `${currentValue + SCALE_STEP}%`;
    picturePreview.style.transform = `scale(${parseInt(pictureScaleValue.value, 10) / 100})`;
  }
}

pictureUploadInput.addEventListener('change', openPictureUploadOverlay);
