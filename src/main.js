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
import {render, RenderPosition} from "./utils.js";

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

  const popupOpenHandler = (evt) => {
    const escKeyDownHandler = (escEvt) => {
      if (escEvt.key === `Escape` || escEvt.key === `Esc`) {
        escEvt.preventDefault();
        bodyElement.classList.remove(`hide-overflow`);
        bodyElement.removeChild(popup.getElement());
        filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, popupOpenHandler);
        filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, popupOpenHandler);
        filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, popupOpenHandler);
        document.removeEventListener(`keydown`, escKeyDownHandler);
      }
    };

    const popupCloseHandler = (closeEvt) => {
      closeEvt.preventDefault();
      bodyElement.classList.remove(`hide-overflow`);
      bodyElement.removeChild(popup.getElement());
      filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, popupOpenHandler);
      filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, popupOpenHandler);
      filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, popupOpenHandler);
      document.querySelector(`.film-details__close-btn`).removeEventListener(`click`, popupCloseHandler);
    };

    evt.preventDefault();
    bodyElement.classList.add(`hide-overflow`);
    const popup = new PopupView(film);
    bodyElement.appendChild(popup.getElement());
    document.querySelector(`.film-details__close-btn`).addEventListener(`click`, popupCloseHandler);
    document.addEventListener(`keydown`, escKeyDownHandler);

    filmComponent.getElement().querySelector(`.film-card__poster`).removeEventListener(`click`, popupOpenHandler);
    filmComponent.getElement().querySelector(`.film-card__title`).removeEventListener(`click`, popupOpenHandler);
    filmComponent.getElement().querySelector(`.film-card__comments`).removeEventListener(`click`, popupOpenHandler);
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, popupOpenHandler);
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, popupOpenHandler);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, popupOpenHandler);
};

render(siteHeader, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new SiteNavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMain, new SiteSortingView().getElement(), RenderPosition.BEFOREEND);
render(siteMain, new FilmListView().getElement(), RenderPosition.BEFOREEND);

const filmsList = siteMain.querySelector(`.films-list`);
const filmsListContainer = filmsList.querySelector(`.films-list__container`);

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(filmsList, new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = siteMain.querySelector(`.films-list__show-more`);

  const showMoreFilms = (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => {
        renderFilm(filmsListContainer, film);
      });

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
      showMoreButton.removeElement();
      showMoreButton.removeEventListener(`click`, showMoreFilms);
    }
  };

  showMoreButton.addEventListener(`click`, showMoreFilms);
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
