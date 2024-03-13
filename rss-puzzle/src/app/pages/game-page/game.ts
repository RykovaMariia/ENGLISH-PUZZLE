import './game.scss';
import { BaseElement } from '../../components/base-element';
import { getWords } from '../../utils/words-game';
import { ResultSection } from './result-section/result-section';
import { SourceSection } from './source-section/source-section';

const LEVEL = 2;
const ROUND = 2;
const SENTENCE = 7;

export class Game extends BaseElement {
  private words: string[] | null = getWords(LEVEL, ROUND, SENTENCE);

  private resultSection = new ResultSection(LEVEL, ROUND);

  private sourceSection = new SourceSection(this.words);

  constructor() {
    super({
      tagName: 'main',
      classNames: 'game',
    });
    this.addClickHandlerForWordElements();

    this.insertChildren([this.resultSection, this.sourceSection]);
  }

  addClickHandlerForWordElements() {
    this.sourceSection.getSourceWordElements()?.forEach((el, i) => {
      const htmlEl = el.getElement();
      const emptyEl = this.resultSection.getResultEmptyElements(SENTENCE)[i].getElement();
      htmlEl.addEventListener('click', () => {
        if (this.sourceSection.getElement().contains(htmlEl)) {
          this.resultSection.addWordInResult(htmlEl, SENTENCE);
          this.sourceSection.insertChild(emptyEl);
        }
        // else {
        //   this.sourceSection.addWordInSource(htmlEl);
        //   this.resultSection.addEmptyInResult(emptyEl, SENTENCE);
        // }
      });
    });
  }
}
