import {createUserProfileTemplate} from './view/user-profile.js';
import {createSiteNavigationTemplate} from './view/site-navigation.js';
import {createSiteSortingTemplate} from './view/sorting.js';
import {createFilmListTemplate} from './view/film-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createPopupTemplate} from './view/popup.js';
import {createStatsTemplate} from './view/stats.js';
import {createFilmCard} from './mock/film-card.js';
import {generateFilter} from './mock/filter.js';

const CARDS_COUNT = 17;
const FILMS_COUNT_PER_STEP = 5;

let renderedFilmsCount = FILMS_COUNT_PER_STEP;
const films = new Array(CARDS_COUNT).fill().map(createFilmCard);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const showMoreFilms = (evt) => {
  evt.preventDefault();
  films
    .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
    .forEach((film) => {
      render(filmsListContainer, createFilmCardTemplate(film), `beforeend`);
    });

  renderedFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderedFilmsCount >= films.length) {
    showMoreButton.remove();
  }
};

const siteHeader = document.querySelector(`.header`);

render(siteHeader, createUserProfileTemplate(), `beforeend`);

const siteMain = document.querySelector(`.main`);

render(siteMain, createSiteNavigationTemplate(generateFilter(films)), `beforeend`);
render(siteMain, createSiteSortingTemplate(), `beforeend`);
render(siteMain, createFilmListTemplate(), `beforeend`);

const filmsList = siteMain.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

render(filmsList, createShowMoreButtonTemplate(), `beforeend`);

const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, showMoreFilms);

for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
  render(filmsListContainer, createFilmCardTemplate(films[i]), `beforeend`);
}

render(siteMain, createPopupTemplate(films[0]), `beforeend`);

render(siteMain, createStatsTemplate(), `beforeend`);

const createFooterStatistics = (filmsCount) => {
  return `<p>${filmsCount} movies inside</p>`;
};

const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFooterStatistics(films.length), `beforeend`);
