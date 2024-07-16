import { clearElement } from './functions/clear-element.js';

const COMMENTS_VISIBLE_STEP = 5;

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


  const pictureCommentsContainer = fullPictureContainer.querySelector('.social__comments');

  const pictureCommentsFrom = fullPictureContainer.querySelector('.social__comment-shown-count');
  pictureCommentsFrom.textContent = COMMENTS_VISIBLE_STEP <= comments.length ? COMMENTS_VISIBLE_STEP : comments.length;

  const pictureCommentsTotal = fullPictureContainer.querySelector('.social__comment-total-count');
  pictureCommentsTotal.textContent = comments.length;

  clearElement(pictureCommentsContainer);

  for (let i = 0; i < COMMENTS_VISIBLE_STEP; i++) {
    if (comments[i]) {
      pictureCommentsContainer.append(renderComment(comments[i]));
    } else {
      break;
    }
  }


  const currentCommentCount = Number(fullPictureContainer.querySelector('.social__comment-shown-count').textContent);
  const totalCommentCount = Number(fullPictureContainer.querySelector('.social__comment-total-count').textContent);
  const commentLoader = document.querySelector('.social__comments-loader');

  if (currentCommentCount >= totalCommentCount) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
    commentLoader.addEventListener('click', () => {});
  }
};

export { renderComment, renderFullPicture };

/*
1) Создать полный лист комментариев
2) Проверить, все ли комментарии получится отобразить сразу (comments <= 5).
3) Если отобразить все можно, то отобразить все комментарии и скрыть кнопку загрузки.
4) Если отобразить все нельзя, отобразить те, котоыре можно. Отобразить кнопку загрузки. Повесить на кнопку загрузки обработчик.
4.1) Он должен проверять, возможно ли загрузить еще 5 комментариев. Если да, то загрузить еще 5. Если нет, то загрузить все и скрыть кнопку загрузки.


*/
