import View from './view.js';
import { PREV_PAGE, NEXT_PAGE } from '../config.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const targetClick = e.target.closest('.btn--inline');

      if (!targetClick) return;

      const page = +targetClick.dataset.goto;
      handler(page);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (currPage === 1 && numPages > 1) {
      return this._generateButtonMarkup(NEXT_PAGE, currPage);
    }

    if (currPage === numPages && numPages > 1) {
      return this._generateButtonMarkup(PREV_PAGE, currPage);
    }

    if (currPage < numPages) {
      return this._generateButtonMarkup(PREV_PAGE, currPage).concat(
        this._generateButtonMarkup(NEXT_PAGE, currPage)
      );
    }

    return '';
  }

  _generateButtonMarkup(name, page) {
    if (name === PREV_PAGE) {
      return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>
        `;
    }

    if (name === NEXT_PAGE) {
      return `
        <button data-goto="${
          page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }
  }
}

export default new PaginationView();
