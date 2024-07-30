const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_COUNT = 5;
const HASHTAG_VALIDATION_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const HASHTAG_ERROR = {
  INVALID: 'Введён невалидный хэштег',
  MAX_COUNT: 'Превышено количество хэштегов',
  REPEAT: 'Хэштеги повторяются'
};

const COMMENT_ERROR = {
  MAX_LENGTH: 'Длина комментария больше 140 символов'
};


const setupValidation = (form, hashtagInput, commentInput) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  const normalizeHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const isValidCommentMaxLength = (value) => value.length <= MAX_COMMENT_LENGTH;

  const isValidHashtag = (value) => {
    if (!value) {
      return true;
    }
    const hashtags = normalizeHashtags(value);
    return hashtags.every((hashtag) => HASHTAG_VALIDATION_REGEXP.test(hashtag));
  };

  const isValidHashtagMaxCount = (value) => {
    const hashtags = normalizeHashtags(value);
    return hashtags.length <= MAX_HASHTAG_COUNT;
  };

  const isHashtagsRepeat = (value) => {
    const hashtags = normalizeHashtags(value);
    const uniqueHashtags = new Set(hashtags);
    return uniqueHashtags.size === hashtags.length;
  };

  pristine.addValidator(commentInput, isValidCommentMaxLength, COMMENT_ERROR.MAX_LENGTH);
  pristine.addValidator(hashtagInput, isValidHashtag, HASHTAG_ERROR.INVALID);
  pristine.addValidator(hashtagInput, isValidHashtagMaxCount, HASHTAG_ERROR.MAX_COUNT);
  pristine.addValidator(hashtagInput, isHashtagsRepeat, HASHTAG_ERROR.REPEAT);

  return pristine;
};

export { setupValidation };
