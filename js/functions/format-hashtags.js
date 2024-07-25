const formatHashtags = (hashtags, isFormatToLowercase) => isFormatToLowercase ?
  hashtags.trim().split(/\s+/) : hashtags.trim().toLowerCase().split(/\s+/);

export { formatHashtags };
