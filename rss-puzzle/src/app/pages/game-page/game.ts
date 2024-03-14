import './game.scss';
import { BaseElement } from '../../components/base-element';
import { getWords } from '../../utils/words-game';
import { ResultSection } from './result-section/result-section';
import { SourceSection } from './source-section/source-section';
import { Button } from '../../components/button/button';

const LEVEL = 1;
const ROUND = 0;
const SENTENCE = 0;

export class Game extends BaseElement {
  private level = LEVEL;

  private round = ROUND;

  private sentence = SENTENCE;

  private words: string[] | null = [];

  private resultSection: ResultSection | undefined;

  private sourceSection: SourceSection | undefined;

  private checkButton: Button | undefined;

  constructor() {
    super({
      tagName: 'main',
      classNames: 'game',
    });
    this.draw();
  }

  removeGame() {
    this.resultSection?.getElement().remove();
    this.sourceSection?.getElement().remove();
    this.checkButton?.getElement().remove();
  }

  draw() {
    this.words = getWords(this.level, this.round, this.sentence);
    this.resultSection = new ResultSection(this.level, this.round, this.sentence);
    this.sourceSection = new SourceSection(this.words);
    this.checkButton = new Button(
      {
        classNames: ['button', 'button__check'],
        textContent: 'CHECK',
      },
      () => {
        if (this.resultSection?.isCorrectedWordOrder()) {
          this.sentence += 1;
          this.removeGame();
          this.draw();
        } else {
          this.resultSection?.selectedUncorrectedWordOrder();
        }
      },
    );

    this.addClickHandlerForWordElements();
    this.checkButton.disableButton();
    this.insertChildren([this.resultSection, this.sourceSection, this.checkButton]);
  }

  addClickHandlerForWordElements() {
    this.sourceSection?.getSourceWordElements()?.forEach((el, i) => {
      const htmlEl = el.getElement();
      const emptyEl = this.resultSection?.getResultEmptyElements()[i].getElement();
      if (emptyEl) {
        htmlEl.addEventListener('click', () => {
          this.resultSection?.deleteSelected();
          if (this.sourceSection?.getElement().contains(htmlEl)) {
            this.resultSection?.addWordInResult(htmlEl);
            this.sourceSection.insertChild(emptyEl);
          } else {
            this.sourceSection?.addWordInSource(htmlEl);
            this.resultSection?.addEmptyInResult(emptyEl);
          }
          if (this.resultSection?.canClickCheck()) {
            this.checkButton?.enableButton();
          } else {
            this.checkButton?.disableButton();
          }
        });
      }
    });
  }
}
