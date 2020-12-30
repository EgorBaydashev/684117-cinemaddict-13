import {getRandomInteger, getRandomItem, generateDate} from '../utils/common.js';
import {getComment} from './comment.js';

const generateShortArray = (arr) => {
  return arr.sort(() => Math.random() - 0.5).slice(0, getRandomInteger(1, arr.length));
};

const TITLES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`
];

const POSTERS = [
  `the-dance-of-life.jpg`,
  `sagebrush-trail.jpg`,
  `the-man-with-the-golden-arm.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `popeye-meets-sinbad.png`,
  `the-great-flamarion.jpg`,
  `made-for-each-other.png`
];

const DIRECTORS = [
  `Martin Scorsese`,
  `Anthony Mann`,
  `Christopher Nolan`,
  `Stanley Kubrick`,
  `Alfred Hitchcock`,
  `Akira Kurosawa`,
  `Quentin Tarantino`
];

const WRITERS = [
  `Kventin Tarantino`,
  `George Lucas`,
  `Steven Spielberg`,
  `Billy Wilder`,
  `Francis Ford Coppola`,
  `William Goldman`,
  `Charlie Kaufman`
];

const ACTORS = [
  `James McAvoy`,
  `Leonardo DiCaprio`,
  `Matthew McConaughey`,
  `Ryan Gosling`,
  `Ken Jenkins`,
  `Sam Lloyd`,
  `Robert Maschio`,
  `Aloma Wright`,
  `John C. McGinley`,
  `Anjelina Joly`,
  `Brad Pitt`,
  `Jessica Simpson`
];

const COUNTRY = [
  `USA`,
  `Great Britain`,
  `France`,
  `Italy`
];

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Film-Noir`
];

const DESCRIPTIONS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const newDesc = DESCRIPTIONS.substring(0, DESCRIPTIONS.length - 1);
const descriptionsArray = newDesc.split(`. `);

const getDescription = () => {
  return descriptionsArray.sort(() => Math.random() - 0.5).slice(0, getRandomInteger(1, 5)).join(`. `) + `.`;
};

export const createFilmCard = () => {
  return {
    poster: getRandomItem(POSTERS),
    title: getRandomItem(TITLES),
    originalTitle: getRandomItem(TITLES),
    rating: getRandomInteger(10, 99) / 10,
    director: getRandomItem(DIRECTORS),
    writers: generateShortArray(WRITERS).join(`, `),
    actors: generateShortArray(ACTORS).join(`, `),
    releaseDate: generateDate(),
    releaseYear: getRandomInteger(1920, 2020),
    runtime: `${getRandomInteger(0, 1)}h ${getRandomInteger(0, 59)}m`,
    country: getRandomItem(COUNTRY),
    genres: generateShortArray(GENRES),
    description: getDescription(),
    ageRating: `${getRandomInteger(10, 21)}+`,
    comments: new Array(getRandomInteger(1, 5)).fill().map(getComment),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
