import { BaseElement } from '../../../components/base-element';
import { GameProps } from '../../../interfaces/game-props';
import { getLengthChar, getWords } from '../../../utils/words-game';

export class ResultSection extends BaseElement {
  private emptyElements: BaseElement[][] = [];

  private resultSentences: BaseElement[] = [];

  private sentence: number;

  private currentSentence: BaseElement;

  private emptyHtmlElement: HTMLElement[];

  constructor(gameProps: GameProps) {
    super({
      tagName: 'section',
      classNames: 'result',
    });
    this.sentence = gameProps.sentence;
    this.draw(gameProps.level, gameProps.round);
    this.currentSentence = this.resultSentences[this.sentence];
    this.emptyHtmlElement = this.emptyElements[this.sentence].map((el) => el.getElement());
  }

  draw(level: number, round: number) {
    for (let i = 0; i <= 9; i += 1) {
      const resultSentence = new BaseElement({
        tagName: 'div',
        classNames: 'result-sentence',
      });

      const words = getWords({ level, round, sentence: i });
      const emptyElements = words?.map((el) => {
        let empty: BaseElement;
        if (i >= this.sentence) {
          empty = new BaseElement({
            tagName: 'div',
            classNames: ['empty'],
          });
        } else {
          empty = new BaseElement({
            tagName: 'div',
            classNames: ['word'],
            textContent: el,
          });
          empty.setStyleWidth(el.length * getLengthChar(words || []));
        }

        return empty;
      });

      if (i >= this.sentence) {
        emptyElements?.map((el) => el.setClassName('empty'));
      }
      this.emptyElements.push(emptyElements ?? []);
      this.resultSentences.push(resultSentence);

      resultSentence.insertChildren(emptyElements ?? []);
      this.insertChild(resultSentence.getElement());
    }
  }

  getResultEmptyElements() {
    return this.emptyElements[this.sentence];
  }

  addWordInResult(wordElement: HTMLElement) {
    this.currentSentence
      .getChildren()
      .find((el) => this.emptyHtmlElement.includes(el))
      ?.before(wordElement);
  }

  addEmptyInResult(emptyElements: HTMLElement) {
    this.resultSentences[this.sentence].insertChild(emptyElements);
  }

  canClickCheck() {
    return this.currentSentence.getChildren().every((el) => !this.emptyHtmlElement.includes(el));
  }

  isCorrectedWordOrder(gameProps: GameProps) {
    return this.currentSentence.getChildren().every((el, i) => {
      const correctedWord = getWords({
        level: gameProps.level,
        round: gameProps.round,
        sentence: gameProps.sentence,
      });

      return correctedWord && el.textContent === correctedWord[i];
    });
  }

  selectedUncorrectedWordOrder() {
    this.currentSentence.getChildren().forEach((el, i) => {
      if (el.textContent === this.emptyHtmlElement[i].innerText) {
        el.classList.add('corrected');
      } else {
        el.classList.add('uncorrected');
      }
    });
  }

  deleteSelected() {
    const currentElements = this.resultSentences[this.sentence].getElement().children;
    Array.from(currentElements).map((el) => {
      el.classList.remove('uncorrected');
      el.classList.remove('corrected');
      return el;
    });
  }
}
