export const createFilmCardTemplate = (films) => {
  const {poster, title, rating, releaseYear, runtime, genres, description, comments, isInWatchlist, isWatched, isFavorite} = films;

  const descriptionShort = () => {
    return description.length > 140 ? `${description.slice(0, 139)}...` : description;
  };

  const cardButtonsDescription = [
    {
      buttonTitle: `Add to watchlist`,
      className: `add-to-watchlist`,
      isActive: isInWatchlist
    },
    {
      buttonTitle: `Mark as watched`,
      className: `mark-as-watched`,
      isActive: isWatched
    },
    {
      buttonTitle: `Mark as favorite`,
      className: `favorite`,
      isActive: isFavorite
    }
  ];

  const createCardButtons = () => {
    return cardButtonsDescription.map(({buttonTitle, className, isActive}) =>
      `<button class="film-card__controls-item button film-card__controls-item--${className} ${isActive && `film-card__controls-item--active`}" type="button">${buttonTitle}</button>`).join(``);
  };

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseYear}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genres.join(` `)}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionShort()}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      ${createCardButtons()}
    </div>
  </article>`;
};
