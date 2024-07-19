const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadInput = pictureUploadForm.querySelector('.img-upload__input');

const pictureUploadOverlay = pictureUploadForm.querySelector('.img-upload__overlay');
const picturePreview = pictureUploadOverlay.querySelector('.img-upload__preview > img');
const picturePreviewCloseButton = pictureUploadOverlay.querySelector('.img-upload__cancel');


const openPictureUploadOverlay = (event) => {
  // Как лучше? Так или const file = evt.target.files[0];
  const [ file ] = event.target.files;

  // if на случай того, если окно выбора файла будет просто закрыто
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
  }
};

const closePictureUploadOverlay = () => {
  document.body.classList.remove('modal-open');
  pictureUploadOverlay.classList.add('hidden');

  picturePreviewCloseButton.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onDocumentKeydownEscape);
};


pictureUploadInput.addEventListener('change', openPictureUploadOverlay);


// onClickCloseButton и onDocumentKeydownEscape повторяются здесь как в модуле full-picture.js.
// Стоит ли вынести их в отдельный модуль? Или просто экспортировать из full-picture.js?

function onClickCloseButton() {
  closePictureUploadOverlay();
}

function onDocumentKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePictureUploadOverlay();
  }
}
