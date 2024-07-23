const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const pictureScaleField = document.querySelector('.img-upload__scale');
const pictureScaleSmallerButton = pictureScaleField.querySelector('.scale__control--smaller');
const pictureScaleBiggerButton = pictureScaleField.querySelector('.scale__control--bigger');
const pictureScaleValue = pictureScaleField.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview > img');


const scaleDown = () => {
  const currentValue = parseInt(pictureScaleValue.value, 10);

  if (currentValue > MIN_SCALE_VALUE) {
    pictureScaleValue.value = `${currentValue - SCALE_STEP}%`;
    picturePreview.style.transform = `scale(${parseInt(pictureScaleValue.value, 10) / 100})`;
  }
};


const scaleUp = () => {
  const currentValue = parseInt(pictureScaleValue.value, 10);

  if (currentValue < MAX_SCALE_VALUE) {
    pictureScaleValue.value = `${currentValue + SCALE_STEP}%`;
    picturePreview.style.transform = `scale(${parseInt(pictureScaleValue.value, 10) / 100})`;
  }
};


const initializeScale = () => {
  pictureScaleSmallerButton.addEventListener('click', scaleDown);
  pictureScaleBiggerButton.addEventListener('click', scaleUp);
};


const destroyScale = () => {
  pictureScaleSmallerButton.removeEventListener('click', scaleDown);
  pictureScaleBiggerButton.removeEventListener('click', scaleUp);
};


export { initializeScale, destroyScale };
