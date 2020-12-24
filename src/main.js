import UserProfileView from './view/user-profile.js';
import SiteNavigationView from './view/site-navigation.js';
import SiteSortingView from './view/sorting.js';
import FilmListView from './view/film-list.js';
import FilmCardView from './view/film-card.js';
import ShowMoreButtonView from './view/show-more-button.js';
import PopupView from './view/popup.js';
import StatsView from './view/stats.js';
import {createFilmCard} from './mock/film-card.js';
import {generateFilter} from './mock/filter.js';
import {renderElement, RenderPosition} from "./utils.js";

const CARDS_COUNT = 17;
const FILMS_COUNT_PER_STEP = 5;

let renderedFilmsCount = FILMS_COUNT_PER_STEP;
const films = new Array(CARDS_COUNT).fill().map(createFilmCard);
const filters = generateFilter(films);

const showMoreFilms = (evt) => {
  evt.preventDefault();
  films
    .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
    .forEach((film) => {
      renderElement(filmsListContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND);
    });

  renderedFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderedFilmsCount >= films.length) {
    showMoreButton.remove();
    showMoreButton.removeElement();
  }
};

const siteHeader = document.querySelector(`.header`);

renderElement(siteHeader, new UserProfileView().getElement(), RenderPosition.BEFOREEND);

const siteMain = document.querySelector(`.main`);

renderElement(siteMain, new SiteNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new SiteSortingView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMain, new FilmListView().getElement(), RenderPosition.BEFOREEND);

const filmsList = siteMain.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

renderElement(filmsList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, showMoreFilms);

for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
  renderElement(filmsListContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

renderElement(siteMain, new PopupView(films[0]).getElement(), RenderPosition.BEFOREEND);

renderElement(siteMain, new StatsView().getElement(), RenderPosition.BEFOREEND);

const createFooterStatistics = (filmsCount) => {
  return `${filmsCount} movies inside`;
};

const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

renderElement(footerStatisticsElement, createFooterStatistics(films.length), RenderPosition.BEFOREEND);

