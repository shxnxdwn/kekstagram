/* eslint-disable */

import { getRandomArrayElement } from './functions/get-random-array-element.js';



const filtersContainer = document.querySelector('.img-filters');


const sortRandom = (data) => Array.from({ length: 10 }, () => getRandomArrayElement(data));
const sortDiscussed = (dataA, dataB) => dataB.comments.length - dataA.comments.length;


const onFilterClick = (data) => {
  const chosenFilter = evt.target.closest('.img-filters__button');

  if (chosenFilter) {
    const type = chosenFilter.id.split('-')[1];

    switch (type) {
      case 'random':
        return sortRandom(data);
      case 'discussed':
        return data.slice().sort(sortDiscussed);
      case 'default':
        return data;
    }
  }
};


const showFilterList = () => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', (evt) => onFilterClick(data));
};


export { showFilterList };
