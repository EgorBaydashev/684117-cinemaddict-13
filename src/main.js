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
import {renderTemplate} from './utils.js';

const CARDS_COUNT = 17;
const FILMS_COUNT_PER_STEP = 5;

let renderedFilmsCount = FILMS_COUNT_PER_STEP;
const films = new Array(CARDS_COUNT).fill().map(createFilmCard);

const showMoreFilms = (evt) => {
  evt.preventDefault();
  films
    .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
    .forEach((film) => {
      renderTemplate(filmsListContainer, createFilmCardTemplate(film), `beforeend`);
    });

  renderedFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderedFilmsCount >= films.length) {
    showMoreButton.remove();
  }
};

const siteHeader = document.querySelector(`.header`);

renderTemplate(siteHeader, createUserProfileTemplate(), `beforeend`);

const siteMain = document.querySelector(`.main`);

renderTemplate(siteMain, createSiteNavigationTemplate(generateFilter(films)), `beforeend`);
renderTemplate(siteMain, createSiteSortingTemplate(), `beforeend`);
renderTemplate(siteMain, createFilmListTemplate(), `beforeend`);

const filmsList = siteMain.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

renderTemplate(filmsList, createShowMoreButtonTemplate(), `beforeend`);

const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, showMoreFilms);

for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
  renderTemplate(filmsListContainer, createFilmCardTemplate(films[i]), `beforeend`);
}

renderTemplate(siteMain, createPopupTemplate(films[0]), `beforeend`);

renderTemplate(siteMain, createStatsTemplate(), `beforeend`);

const createFooterStatistics = (filmsCount) => {
  return `<p>${filmsCount} movies inside</p>`;
};

const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

renderTemplate(footerStatisticsElement, createFooterStatistics(films.length), `beforeend`);
