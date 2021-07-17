import View from './view.js';
import previewView from './previewView.js';
import { BOOKMARK_ERROR } from '../config.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = BOOKMARK_ERROR;
  _message = '';

  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new BookmarksView();
