import { wordCollectionLevel1 } from '../data/wordCollectionLevel1';
import { wordCollectionLevel2 } from '../data/wordCollectionLevel2';
import { wordCollectionLevel3 } from '../data/wordCollectionLevel3';
import { wordCollectionLevel4 } from '../data/wordCollectionLevel4';
import { wordCollectionLevel5 } from '../data/wordCollectionLevel5';
import { wordCollectionLevel6 } from '../data/wordCollectionLevel6';
import { GameProps } from '../interfaces/game-props';
import { WordCollection } from '../interfaces/words';

const WIDTH_CONTAINER = 700;

function getWordCollection(level: number) {
  let wordCollection: WordCollection | undefined;

  switch (level) {
    case 1:
      wordCollection = wordCollectionLevel1;
      break;
    case 2:
      wordCollection = wordCollectionLevel2;
      break;
    case 3:
      wordCollection = wordCollectionLevel3;
      break;
    case 4:
      wordCollection = wordCollectionLevel4;
      break;
    case 5:
      wordCollection = wordCollectionLevel5;
      break;
    case 6:
      wordCollection = wordCollectionLevel6;
      break;
    default:
      wordCollection = undefined;
  }
  return wordCollection;
}

export function getWords(gameProps: GameProps) {
  const wordCollection = getWordCollection(gameProps.level);
  if (wordCollection) {
    return wordCollection?.rounds[gameProps.round].words[gameProps.sentence].textExample.split(' ');
  }
  return undefined;
}

export function getRussianSentence(gameProps: GameProps) {
  const wordCollection = getWordCollection(gameProps.level);
  if (wordCollection) {
    return wordCollection?.rounds[gameProps.round].words[gameProps.sentence].textExampleTranslate;
  }
  return undefined;
}

export function getShuffledWords<T>(array: T[]) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getLengthChar(words: string[]) {
  const countCharInSentence = words?.join('').length;
  return WIDTH_CONTAINER / countCharInSentence;
}

export function getLengthWord(words: string[]) {
  const countCharInSentence = words?.length;
  return WIDTH_CONTAINER / countCharInSentence;
}

export function getImage(level: number, round: number) {
  const wordCollection = getWordCollection(level);
  if (wordCollection) {
    return wordCollection?.rounds[round].levelData.imageSrc;
  }
  return undefined;
}

export function getSound(gameProps: GameProps) {
  const wordCollection = getWordCollection(gameProps.level);
  if (wordCollection) {
    return wordCollection?.rounds[gameProps.round].words[gameProps.sentence].audioExample;
  }
  return undefined;
}

export function getCountRound(level: number) {
  const wordCollection = getWordCollection(level);
  if (wordCollection) {
    return wordCollection?.roundsCount;
  }
  return undefined;
}
