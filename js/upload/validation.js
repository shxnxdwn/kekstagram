import { formatHashtags } from '../functions/format-hashtags.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;

const HASHTAG_ERRORS = {
  INVALID: 'Введён невалидный хэштег',
  MAX_COUNT: 'Превышено количество хэштегов',
  REPEAT: 'Хэштеги повторяются'
};

const COMMENT_ERRORS = {
  MAX_LENGTH: 'Длина комментария больше 140 символов'
};


const setupValidation = (form, hashtagInput, commentInput) => {

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });


  const isValidCommentMaxLength = (value) => value.length <= MAX_COMMENT_LENGTH;


  const isValidHashtag = (value) => {
    if (!value) {
      return true;
    }

    const hashtags = formatHashtags(value, false);
    const hashtagValidationRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

    return hashtags.every((hashtag) => hashtagValidationRegexp.test(hashtag));
  };


  const isValidHashtagMaxCount = (value) => formatHashtags(value, false).length <= MAX_HASHTAG_COUNT;


  const isHashtagsRepeat = (value) => {
    const hashtags = formatHashtags(value, true);
    const uniqueHashtags = new Set(hashtags);

    return uniqueHashtags.size === hashtags.length;
  };


  pristine.addValidator(commentInput, isValidCommentMaxLength, COMMENT_ERRORS.MAX_LENGTH);
  pristine.addValidator(hashtagInput, isValidHashtag, HASHTAG_ERRORS.INVALID);
  pristine.addValidator(hashtagInput, isValidHashtagMaxCount, HASHTAG_ERRORS.MAX_COUNT);
  pristine.addValidator(hashtagInput, isHashtagsRepeat, HASHTAG_ERRORS.REPEAT);


  return pristine;
};

export { setupValidation };
