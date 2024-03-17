import { BaseComponent } from '../../../components/base-component';
import { WordComponent } from '../../../components/word/word-component';
import { GameProps } from '../../../interfaces/game-props';
import { getImage, getLengthChar, getWords } from '../../../utils/words-game';

export class ResultSection extends BaseComponent {
  private emptyElements: BaseComponent[][] = [];

  private resultSentences: BaseComponent[] = [];

  private currentSentence: BaseComponent;

  private emptyHtmlElement: HTMLElement[];

  constructor(gameProps: GameProps) {
    super({
      tagName: 'section',
      classNames: 'result',
    });
    this.drawResultSection(gameProps);
    this.currentSentence = this.resultSentences[gameProps.sentence];
    this.emptyHtmlElement = this.emptyElements[gameProps.sentence].map((el) => el.getElement());
  }

  drawResultSection(gameProps: GameProps) {
    for (let i = 0; i <= 9; i += 1) {
      const resultSentence = new BaseComponent({
        tagName: 'div',
        classNames: 'result-sentence',
      });

      const words = getWords({ level: gameProps.level, round: gameProps.round, sentence: i });
      let lengthCount = 0;
      const urlImg = getImage(gameProps.level, gameProps.round);

      const emptyElements = words?.map((el, j) => {
        let empty: WordComponent;
        if (i >= gameProps.sentence) {
          empty = new WordComponent({ classNames: 'empty' }, { isEmpty: true });
        } else {
          empty = new WordComponent(
            { classNames: 'word' },
            { isEmpty: false, textContent: el, isFirst: j === 0, isLast: j === words.length - 1 },
          );

          const lengthWord = el.length * getLengthChar(words || []);
          empty.setStyleWidth(lengthWord);
          const y = i * 10;

          empty.setBackgroundImgForSpanText(urlImg, lengthCount, y);
          lengthCount += lengthWord;
          empty.setBackgroundImgForSpanRight(urlImg, lengthCount - 6, y);
        }

        return empty;
      });

      if (i >= gameProps.sentence) {
        emptyElements?.map((el) => el.setClassName('empty'));
      }
      this.emptyElements.push(emptyElements ?? []);
      this.resultSentences.push(resultSentence);

      resultSentence.insertChildren(emptyElements ?? []);
      this.insertChild(resultSentence.getElement());
    }
  }

  getResultEmptyElements(sentence: number) {
    return this.emptyElements[sentence];
  }

  addWordInResult(wordElement: HTMLElement) {
    this.currentSentence
      .getChildren()
      .find((el) => this.emptyHtmlElement.includes(el))
      ?.before(wordElement);
  }

  addEmptyInResult(emptyElements: BaseComponent, sentence: number) {
    this.resultSentences[sentence].insertChild(emptyElements);
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

  deleteSelected(sentence: number) {
    const currentElements = this.resultSentences[sentence].getElement().children;
    Array.from(currentElements).map((el) => {
      el.classList.remove('uncorrected');
      el.classList.remove('corrected');
      return el;
    });
  }
}
