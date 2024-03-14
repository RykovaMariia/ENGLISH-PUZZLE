import { getWords } from '../utils/words-game';

const INITIAL_LEVEL = 1;
const INITIAL_ROUND = 0;
const INITIAL_SENTENCE = 9;

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

  getWords() {
    return getWords(this.getGameProps());
  }

  nextLevel() {
    this.level += 1;
    return this.level;
  }

  nextRound() {
    this.round += 1;
    return this.round;
  }

  nextSentence() {
    if (this.sentence < 9) {
      this.sentence += 1;
    } else {
      this.sentence = 0;
      this.nextRound();
    }
    return this.sentence;
  }
}

export const gameService = new GameService();
