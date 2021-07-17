import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, ren = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.renderError();
      return;
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!ren) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    this._data = data;
    const markup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(markup);
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    const newElements = Array.from(newDom.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const currEl = currElements[i];

      if (
        !newEl.isEqualNode(currEl) &&
        !newEl &&
        newEl.firstChild.nodeValue.trim() !== ''
      ) {
        currEl.innerHTML = newEl.innerHTML;
      }

      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          currEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
      <use href="${icons}#icon-loader"></use>
      </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
