const renderComment = ({ name, avatar, message }) => {
  const pictureComment = document.createElement('li');
  pictureComment.classList.add('social__comment');

  const pictureCommentAvatar = document.createElement('img');
  pictureCommentAvatar.classList.add('social__picture');
  pictureCommentAvatar.src = avatar;
  pictureCommentAvatar.alt = name;
  pictureCommentAvatar.width = 35;
  pictureCommentAvatar.height = 35;

  pictureComment.append(pictureCommentAvatar);

  const pictureCommentText = document.createElement('p');
  pictureCommentText.classList.add('social__text');
  pictureCommentText.textContent = message;

  pictureComment.append(pictureCommentText);

  return pictureComment;
};


const renderFullPicture = ({ url, description, likes, comments }, fullPictureContainer) => {
  const pictureImg = fullPictureContainer.querySelector('.big-picture__img > img');
  pictureImg.src = url;

  const pictureDescription = fullPictureContainer.querySelector('.social__caption');
  pictureDescription.textContent = description;

  const pictureLikesCount = fullPictureContainer.querySelector('.likes-count');
  pictureLikesCount.textContent = likes;

  const pictureCommentsCount = fullPictureContainer.querySelector('.social__comment-shown-count');
  pictureCommentsCount.textContent = comments.length;

  const pictureCommentsContainer = fullPictureContainer.querySelector('.social__comments');

  for (let i = 0; i < comments.length; i++) {
    pictureCommentsContainer.append(renderComment(comments[i]));
  }
};

export { renderComment, renderFullPicture };
