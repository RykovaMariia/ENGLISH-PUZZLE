import { getCountRound, getRussianSentence, getWords } from '../utils/words-game';

const INITIAL_LEVEL = 1;
const INITIAL_ROUND = 1;
const INITIAL_SENTENCE = 0;
const MAX_SENTENCE = 9;

class GameService {
  private level = INITIAL_LEVEL;

  private round = INITIAL_ROUND;

  private sentence = INITIAL_SENTENCE;

  getGameProps() {
    return {
      level: this.level,
      round: this.round,
      sentence: this.sentence,
    };
  }

  getRussianSentence() {
    return getRussianSentence(this.getGameProps());
  }

  getWords() {
    return getWords(this.getGameProps());
  }

  getLevel() {
    return this.level;
  }

  nextLevel() {
    this.level += 1;
    this.round = 1;
    this.sentence = 0;
    return this.level;
  }

  setLevel(number: number) {
    this.level = number;
    this.round = 1;
    this.sentence = 0;
  }

  nextRound() {
    const countRound = getCountRound(this.level) || 1;
    if (this.round < countRound) {
      this.round += 1;
      this.sentence = 0;
    } else {
      this.round = 1;
      this.sentence = 0;
      this.nextLevel();
    }
    return this.round;
  }

  setRound(number: number) {
    this.round = number;
    this.sentence = 0;
  }

  nextSentence() {
    if (this.sentence < MAX_SENTENCE) {
      this.sentence += 1;
    } else {
      this.sentence = 0;
      this.nextRound();
    }
    return this.sentence;
  }
}

export const gameService = new GameService();
