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


function onClickCloseButton() {
  closePictureUploadOverlay();
}

function onDocumentKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePictureUploadOverlay();
  }
}


pictureUploadInput.addEventListener('change', openPictureUploadOverlay);


// Validation ==========================================================================================================

// Стоит ли создать для валидации отдельный модуль?

const HASHTAG_ERRORS = {
  INVALID: 'Введён невалидный хэштег',
  MAX_COUNT: 'Превышено количество хэштегов',
  REPEAT: 'Хэштеги повторяются'
};

const COMMENT_ERRORS = {
  MAX_LENGTH: 'Длина комментария больше 140 символов'
};

const hashtagInput = pictureUploadOverlay.querySelector('.text__hashtags');
const commentInput = pictureUploadOverlay.querySelector('.text__description');

const pristine = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


// Мы не можем завести константу MAX_COMMENT_LENGTH = 140 и передать в эту функцию вторым аргументом
const isValidCommentMaxLength = (value) => value.length <= 140;


const isValidHashtag = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  const hashtagValidationRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

  for (const hashtag of hashtags) {
    if (!hashtagValidationRegexp.test(hashtag)) {
      return false;
    }
  }

  return true;
};


const isValidHashtagMaxCount = (value) => value.trim().split(/\s+/).length <= 5;


const isHashtagsRepeat = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  return uniqueHashtags.size === hashtags.length;
};


pristine.addValidator(commentInput, isValidCommentMaxLength, COMMENT_ERRORS.MAX_LENGTH);
pristine.addValidator(hashtagInput, isValidHashtag, HASHTAG_ERRORS.INVALID);
pristine.addValidator(hashtagInput, isValidHashtagMaxCount, HASHTAG_ERRORS.MAX_COUNT);
pristine.addValidator(hashtagInput, isHashtagsRepeat, HASHTAG_ERRORS.REPEAT);


pictureUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    console.log('Форма отправлена');
  }
});

hashtagInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});
