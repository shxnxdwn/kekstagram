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


const effectLevelField = document.querySelector('.effect-level');
const sliderElement = effectLevelField.querySelector('.effect-level__slider');
const valueElement = effectLevelField.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview > img');

let currentEffect = 'none';
let isSliderInitialized = false;


const initializeSlider = () => {
  if (!isSliderInitialized) {
    noUiSlider.create(sliderElement, SLIDER_OPTIONS.none);
    isSliderInitialized = true;
  }

  sliderElement.noUiSlider.on('update', () => {
    const value = Number(sliderElement.noUiSlider.get()).toFixed(1);
    valueElement.value = value;
    picturePreview.style.filter = PICTURE_EFFECTS[currentEffect](value);
  });
};


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


const destroySlider = () => {
  if (isSliderInitialized) {
    sliderElement.noUiSlider.destroy();
    currentEffect = 'none';
    isSliderInitialized = false;
  }
};


export { applyEffect, initializeSlider, destroySlider };
