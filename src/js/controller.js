import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;

  recipeView.renderSpinner();

  try {
    await model.getRecipe(id);
  } catch {
    recipeView.renderError();
  }

  recipeView.render(model.state.recipe);
  resultView.update(model.getPageResults());
};

const controlSearch = async function () {
  const query = searchView.getQuery();
  if (!query) return;

  resultView.renderSpinner();

  try {
    await model.getSearchResults(query);
  } catch {
    searchView.renderError();
  }

  resultView.render(model.getPageResults());

  paginationView.render(model.state.search);
};

const controlPage = function (page) {
  resultView.render(model.getPageResults(page));
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  model.updateServings(servings);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const contolBookmarkReload = function () {
  const storage = JSON.parse(localStorage.getItem('bookmarks'));
  if (storage) model.state.bookmarks = storage;
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (data) {
  try {
    await model.uploadRecipe(data);
    // console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderSuccess();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView._toggleHidden();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.renderSuccess();
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmarks);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPage);
  bookmarksView.addHandlerBookmark(contolBookmarkReload);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
