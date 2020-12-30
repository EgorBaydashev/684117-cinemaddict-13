import {getRandomItem, generateDate} from '../utils/common.js';

const COMMENTS_TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const COMMENTS_EMOTION = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const COMMENTS_AUTHOR = [
  `Tim Macoveev`,
  `John Doe`,
  `Michael Random`,
  `Austin Powers`
];

export const getComment = () => {
  return {
    text: getRandomItem(COMMENTS_TEXT),
    emotion: getRandomItem(COMMENTS_EMOTION),
    author: getRandomItem(COMMENTS_AUTHOR),
    date: generateDate()
  };
};
