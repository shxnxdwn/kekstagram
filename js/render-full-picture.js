import { clearElement } from './functions/clear-element.js';
import { CREATED_PICTURES } from './data.js';

const COMMENTS_VISIBLE_STEP = 5;

const picturesContainer = document.querySelector('.pictures');
const fullPictureContainer = document.querySelector('.big-picture');
const closeButton = fullPictureContainer.querySelector('.big-picture__cancel');

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

const showNextComments = (comments, container, currentCount) => {
  let counter = 0;

  for (let i = currentCount; i < currentCount + COMMENTS_VISIBLE_STEP; i++) {
    if (comments[i]) {
      container.append(renderComment(comments[i]));
      counter++;
    } else {
      break;
    }
  }
  return counter;
};

const renderFullPicture = ({ url, description, likes, comments }) => {
  const pictureImg = fullPictureContainer.querySelector('.big-picture__img > img');
  pictureImg.src = url;

  const pictureDescription = fullPictureContainer.querySelector('.social__caption');
  pictureDescription.textContent = description;

  const pictureLikesCount = fullPictureContainer.querySelector('.likes-count');
  pictureLikesCount.textContent = likes;

  const pictureCommentsContainer = fullPictureContainer.querySelector('.social__comments');
  const pictureCommentsFrom = fullPictureContainer.querySelector('.social__comment-shown-count');
  const pictureCommentsTotal = fullPictureContainer.querySelector('.social__comment-total-count');

  clearElement(pictureCommentsContainer);

  let currentCommentCount = 0;
  const totalCommentCount = comments.length;

  currentCommentCount += showNextComments(comments, pictureCommentsContainer, currentCommentCount);

  pictureCommentsFrom.textContent = currentCommentCount;
  pictureCommentsTotal.textContent = totalCommentCount;

  const commentLoader = fullPictureContainer.querySelector('.social__comments-loader');

  const onClickLoadMore = () => {
    currentCommentCount += showNextComments(comments, pictureCommentsContainer, currentCommentCount);
    pictureCommentsFrom.textContent = currentCommentCount;

    if (currentCommentCount === totalCommentCount) {
      commentLoader.classList.add('hidden');
      commentLoader.removeEventListener('click', onClickLoadMore);
    }
  };

  if (currentCommentCount === totalCommentCount) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
    commentLoader.addEventListener('click', onClickLoadMore);
  }

  const removeCommentLoaderEvent = () => {
    commentLoader.removeEventListener('click', onClickLoadMore);
  };

  commentLoader._removeEvent = removeCommentLoaderEvent;
};

function onDocumentKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPicture();
  }
}

function onClickCloseButton() {
  closeFullPicture();
}

function openFullPicture() {
  fullPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onClickCloseButton);
  document.addEventListener('keydown', onDocumentKeydownEscape);
}

function closeFullPicture() {
  document.body.classList.remove('modal-open');
  fullPictureContainer.classList.add('hidden');

  const commentLoader = fullPictureContainer.querySelector('.social__comments-loader');
  if (commentLoader._removeEvent) {
    commentLoader._removeEvent();
  }

  closeButton.removeEventListener('click', onClickCloseButton);
  document.removeEventListener('keydown', onDocumentKeydownEscape);
}

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'IMG') {
    const choosenPicture = CREATED_PICTURES.find((picture) => picture.id === Number(evt.target.dataset.id));
    renderFullPicture(choosenPicture);
    openFullPicture();
  }
});
