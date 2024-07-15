import { CREATED_PHOTOS } from './data.js';
import { renderFullPicture } from './render-full-picture.js';

const picturesContainer = document.querySelector('.pictures');
const fullPictureContainer = document.querySelector('.big-picture');
const closeButton = fullPictureContainer.querySelector('.big-picture__cancel');
const commentCount = fullPictureContainer.querySelector('.social__comment-count');
const commentLoader = fullPictureContainer.querySelector('.social__comments-loader');

// Function declaration так как нужен hoisting (Критерий Д5)

function onDocumentKeydownEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeButton.removeEventListener('click', onClickCloseButton);
    closeFullPicture();
  }
}

function onClickCloseButton() {
  document.removeEventListener('keydown', onDocumentKeydownEscape);
  closeFullPicture();
}


function openFullPicture() {
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');

  fullPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onClickCloseButton);
  document.addEventListener('keydown', onDocumentKeydownEscape);
}

function closeFullPicture() {
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  document.body.classList.remove('modal-open');
  fullPictureContainer.classList.add('hidden');
}


picturesContainer.addEventListener('click', (evt) => {
  // Если нужно открытие окна при клике не только по картинке, но и по количеству likes/comments
  // switch(evt.target.tagName) { case 'A': case 'IMG': case 'P': console.log(evt.target.tagName); default: break; }

  if (evt.target.tagName === 'IMG') {
    const choosenPicture = CREATED_PHOTOS.find((picture) => picture.id === Number(evt.target.dataset.id));

    renderFullPicture(choosenPicture, fullPictureContainer);
    openFullPicture();
  }
});
