import { BaseElement } from '../../../components/base-element';
import { getWords } from '../../../utils/words-game';

export class ResultSection extends BaseElement {
  private emptyElements: BaseElement[][] = [];

  private resultSentences: BaseElement[] = [];

  constructor(level: number, round: number) {
    super({
      tagName: 'section',
      classNames: 'result',
    });
    this.draw(level, round);
  }

  draw(level: number, round: number) {
    for (let i = 0; i < 10; i += 1) {
      const resultSentence = new BaseElement({
        tagName: 'div',
        classNames: 'result-sentence',
      });
      const emptyElements = getWords(level, round, i)?.map((el) => {
        return new BaseElement({
          tagName: 'div',
          classNames: ['empty'],
          textContent: el,
        });
      });
      this.emptyElements.push(emptyElements ?? []);
      this.resultSentences.push(resultSentence);

      resultSentence.insertChildren(emptyElements ?? []);
      this.insertChild(resultSentence.getElement());
    }
  }

  getResultEmptyElements(sentence: number) {
    return this.emptyElements[sentence];
  }

  addWordInResult(wordElement: HTMLElement, sentence: number) {
    const currentElements = this.resultSentences[sentence].getElement().children;
    const emptyHtmlElement = this.emptyElements[sentence].map((el) => el.getElement());

    Array.from(currentElements)
      .find((el) => emptyHtmlElement.includes(el as HTMLElement))
      ?.before(wordElement);
  }

  addEmptyInResult(emptyElements: HTMLElement, sentence: number) {
    this.resultSentences[sentence].insertChild(emptyElements);
  }
}
