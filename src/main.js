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
import {render, RenderPosition} from './utils.js';

const CARDS_COUNT = 17;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(CARDS_COUNT).fill().map(createFilmCard);
const filters = generateFilter(films);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

  const filmElementMatches = `.film-card__title, .film-card__poster, .film-card__comments`;
  const popup = new PopupView(film);

  const escKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(popup.getElement());
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const popupOpenHandler = (evt) => {
    if (evt.target.matches(filmElementMatches)) {
      evt.preventDefault();
      bodyElement.classList.add(`hide-overflow`);
      bodyElement.appendChild(popup.getElement());
      document.querySelector(`.film-details__close-btn`).addEventListener(`click`, popupCloseHandler);
      document.addEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const popupCloseHandler = (evt) => {
    if (evt.target.matches(`.film-details__close-btn`)) {
      evt.preventDefault();
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(popup.getElement());
      document.removeEventListener(`keydown`, escKeyDownHandler);
      filmComponent.getElement().addEventListener(`click`, popupOpenHandler);
    }
  };

  filmComponent.getElement().addEventListener(`click`, popupOpenHandler);
};

render(siteHeader, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new SiteNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMain, new SiteSortingView().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new FilmListView().getElement(), RenderPosition.BEFOREEND);

const filmsList = siteMain.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainer, film));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
  renderFilm(filmsListContainer, films[i]);
}

render(siteMain, new StatsView().getElement(), RenderPosition.BEFOREEND);

const createFooterStatistics = (filmsCount) => {
  return `${filmsCount} movies inside`;
};

const footerElement = document.querySelector(`footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFooterStatistics(films.length), RenderPosition.BEFOREEND);
