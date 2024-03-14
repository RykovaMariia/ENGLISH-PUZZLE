import { wordCollectionLevel1 } from '../data/wordCollectionLevel1';
import { wordCollectionLevel2 } from '../data/wordCollectionLevel2';
import { wordCollectionLevel3 } from '../data/wordCollectionLevel3';
import { wordCollectionLevel4 } from '../data/wordCollectionLevel4';
import { wordCollectionLevel5 } from '../data/wordCollectionLevel5';
import { wordCollectionLevel6 } from '../data/wordCollectionLevel6';
import { GameProps } from '../interfaces/game-props';
import { WordCollection } from '../interfaces/words';

function getWordCollection(level: number) {
  let wordCollection: WordCollection | null;

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
      wordCollection = null;
  }
  return wordCollection;
}

export function getWords(gameProps: GameProps) {
  const wordCollection = getWordCollection(gameProps.level);
  if (wordCollection) {
    return wordCollection?.rounds[gameProps.round].words[gameProps.sentence].textExample.split(' ');
  }
  return null;
}

export function getShuffledWords<T>(array: T[]) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
