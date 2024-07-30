import { renderThumbnails } from './view/render-thumbnails';
import { setPicturesData} from './view/full-picture';
import { getData } from './view/get-data';

import './upload/form.js';


getData(renderThumbnails, setPicturesData);
