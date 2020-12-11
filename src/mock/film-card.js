import {getRandomInteger, getRandomItem, generateDate} from '../utils.js';
import {comment} from './comment.js';

const shortArray = (arr) => arr.slice(0, getRandomInteger(1, arr.length));

const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`
];

const posters = [
  `the-dance-of-life.jpg`,
  `sagebrush-trail.jpg`,
  `the-man-with-the-golden-arm.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `popeye-meets-sinbad.png`,
  `the-great-flamarion.jpg`,
  `made-for-each-other.png`
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Film-Noir`
];

export const filmCard = () => {
  return {
    poster: getRandomItem(posters),
    title: getRandomItem(titles),
    originalTitle: `title`,
    rating: `${getRandomInteger(0, 9)}.${getRandomInteger(0, 9)}`,
    director: `Martin Scorsese`,
    writers: `Kventin Tarantino, George Lucas, Steven Spielberg`,
    actors: `James McAvoy, Leonardo DiCaprio, Matthew McConaughey, Ryan Gosling`,
    releaseDate: generateDate(),
    releaseYear: getRandomInteger(1920, 2020),
    runtime: `${getRandomInteger(0, 1)}h ${getRandomInteger(0, 59)}m`,
    country: `USA`,
    genres: shortArray(genres),
    description: shortArray(descriptions).join(` `),
    ageRating: `${getRandomInteger(10, 21)}+`,
    comments: new Array(getRandomInteger(1, 5)).fill().map(comment),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
