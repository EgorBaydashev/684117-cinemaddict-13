import {createUserProfileTemplate} from './view/user-profile.js';
import {createSiteNavigationTemplate} from './view/site-navigation.js';
import {createSiteSortingTemplate} from './view/sorting.js';
import {createFilmListTemplate} from './view/film-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createPopupTemplate} from './view/popup.js';

const CARDS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);

render(siteHeader, createUserProfileTemplate(), `beforeend`);

const siteMain = document.querySelector(`.main`);

render(siteMain, createSiteNavigationTemplate(), `beforeend`);
render(siteMain, createSiteSortingTemplate(), `beforeend`);
render(siteMain, createFilmListTemplate(), `beforeend`);

const filmsList = siteMain.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(), `beforeend`);
}

render(filmsList, createShowMoreButtonTemplate(), `beforeend`);
render(siteMain, createPopupTemplate(), `beforeend`);
