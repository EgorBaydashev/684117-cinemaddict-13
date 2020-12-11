import {getRandomItem, generateDate} from '../utils.js';

const commentsText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const commentsEmotion = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const commentsAuthor = [
  `Tim Macoveev`,
  `John Doe`,
  `Michael Random`,
  `Austin Powers`
];

export const comment = () => {
  return {
    text: getRandomItem(commentsText),
    emotion: getRandomItem(commentsEmotion),
    author: getRandomItem(commentsAuthor),
    date: generateDate(),
  };
};
