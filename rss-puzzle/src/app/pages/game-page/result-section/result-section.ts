import { BaseElement } from '../../../components/base-element';
import { getWords } from '../../../utils/words-game';

export class ResultSection extends BaseElement {
  private emptyElements: BaseElement[][] = [];

  private resultSentences: BaseElement[] = [];

  private sentence: number;

  private currentElements: HTMLCollection;

  private emptyHtmlElement: HTMLElement[];

  constructor(level: number, round: number, sentence: number) {
    super({
      tagName: 'section',
      classNames: 'result',
    });
    this.sentence = sentence;
    this.draw(level, round);
    this.currentElements = this.resultSentences[this.sentence].getElement().children;
    this.emptyHtmlElement = this.emptyElements[this.sentence].map((el) => el.getElement());
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
          classNames: ['word', 'word_inactive'],
          textContent: el,
        });
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
    Array.from(this.currentElements)
      .find((el) => this.emptyHtmlElement.includes(el as HTMLElement))
      ?.before(wordElement);
  }

  addEmptyInResult(emptyElements: HTMLElement) {
    this.resultSentences[this.sentence].insertChild(emptyElements);
  }

  canClickCheck() {
    return Array.from(this.currentElements).every(
      (el) => !this.emptyHtmlElement.includes(el as HTMLElement),
    );
  }

  isCorrectedWordOrder() {
    return Array.from(this.currentElements).every((el, i) => {
      return (el as HTMLElement).innerText === this.emptyHtmlElement[i].innerText;
    });
  }

  selectedUncorrectedWordOrder() {
    Array.from(this.currentElements)
      .filter((el, i) => {
        return (el as HTMLElement).innerText === this.emptyHtmlElement[i].innerText;
      })
      .map((el) => el.classList.add('corrected'));

    Array.from(this.currentElements)
      .filter((el, i) => {
        return (el as HTMLElement).innerText !== this.emptyHtmlElement[i].innerText;
      })
      .map((el) => el.classList.add('uncorrected'));
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
