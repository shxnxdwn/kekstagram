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


const showFilterList = (data, renderThumbCb) => {

  const debouncedRender = debounce(() => {
    const filteredData = applyFilter(data, currentFilter);
    renderThumbCb(filteredData);
  }, DEBOUNCE_DELAY);

  const onClickFilter = (event) => {
    const chosenFilter = event.target.closest('.img-filters__button');

    if (!chosenFilter || chosenFilter.id === currentFilter) {
      return;
    }

    filtersContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    chosenFilter.classList.add('img-filters__button--active');

    currentFilter = chosenFilter.id;
    debouncedRender();
  };

  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onClickFilter);
};

export { showFilterList };
