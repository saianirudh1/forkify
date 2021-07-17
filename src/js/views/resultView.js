import View from './view.js';
import { RESULT_ERROR } from '../config.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = RESULT_ERROR;
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateResultMarkup).join('');
  }

  _generateResultMarkup(res) {
    const id = window.location.hash.slice(1);

    return `
    <li class="preview">
        <a class="preview__link ${
          id === res.id ? 'preview__link--active' : ''
        }" href="#${res.id}">
        <figure class="preview__fig">
            <img src="${res.imageUrl}" alt="${res.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${res.title}</h4>
            <p class="preview__publisher">${res.publisher}</p>
            <div class="recipe__user-generated ${res.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
        </a>
    </li>`;
  }
}

export default new ResultView();
