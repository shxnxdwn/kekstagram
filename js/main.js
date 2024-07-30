import { renderThumbnails } from './view/render-thumbnails';
import { setPicturesData} from './view/full-picture';
import { showFilterList } from './view/filters.js';
import { getData } from './view/get-data';

import './upload/form.js';
import './view/filters.js';


getData(renderThumbnails, setPicturesData, showFilterList);
