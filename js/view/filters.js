import { debounce } from '../functions/debounce.js';

const DISCUSSED_PICTURES_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
let currentFilter = FILTER.DEFAULT;


const sortRandomly = () => Math.random() - 0.5;
const sortByComments = (dataA, dataB) => dataB.comments.length - dataA.comments.length;


const applyFilter = (data, filter) => {
  switch (filter) {
    case FILTER.RANDOM:
      return [...data].sort(sortRandomly).slice(0, DISCUSSED_PICTURES_COUNT);
    case FILTER.DISCUSSED:
      return [...data].sort(sortByComments);
    default:
      return data;
  }
};


const onClickFilter = (data, renderThumbCb) => (event) => {
  const chosenFilter = event.target.closest('.img-filters__button');

  if (!chosenFilter) {
    return;
  }

  filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  chosenFilter.classList.add('img-filters__button--active');

  currentFilter = chosenFilter.id;
  const filteredData = applyFilter(data, currentFilter);
  renderThumbCb(filteredData);
};


const showFilterList = (data, renderThumbCb) => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', debounce(onClickFilter(data, renderThumbCb), DEBOUNCE_DELAY));
};


export { showFilterList };
