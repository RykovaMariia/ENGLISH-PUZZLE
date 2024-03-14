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

  private continueButton: Button | undefined;

  private buttons: BaseElement | undefined;

  private handlers: Map<Element, () => void> = new Map();

  constructor() {
    super({
      tagName: 'main',
      classNames: 'game',
    });
    this.drawGame();
  }

  removeGame() {
    this.resultSection?.getElement().remove();
    this.sourceSection?.getElement().remove();
    this.buttons?.getElement().remove();
  }

  drawGame() {
    this.words = getWords(this.level, this.round, this.sentence);
    this.resultSection = new ResultSection(this.level, this.round, this.sentence);
    this.sourceSection = new SourceSection(this.words);
    this.buttons = this.getButtons();
    this.insertChildren([this.resultSection, this.sourceSection, this.buttons]);
  }

  getButtons() {
    const divButtons = new BaseElement({
      tagName: 'div',
      classNames: 'buttons',
    });

    this.checkButton = new Button(
      {
        classNames: ['button', 'button_check'],
        textContent: 'CHECK',
      },
      () => {
        if (this.resultSection?.isCorrectedWordOrder()) {
          this.continueButton?.enableButton();
          this.addClickWordCardsHandler(false);
        } else {
          this.resultSection?.selectedUncorrectedWordOrder();
        }
      },
    );

    this.continueButton = new Button(
      {
        classNames: ['button', 'button_continue'],
        textContent: 'CONTINUE',
      },
      () => {
        this.sentence += 1;
        this.removeGame();
        this.drawGame();
      },
    );

    this.addClickWordCardsHandler(true);
    this.checkButton.disableButton();
    this.continueButton.disableButton();
    divButtons.insertChildren([this.checkButton, this.continueButton]);
    return divButtons;
  }

  addClickWordCardsHandler(isAdd: boolean) {
    this.sourceSection?.getSourceWordElements()?.forEach((el, i) => {
      const wordCardEl = el.getElement();
      const emptyEl = this.resultSection?.getResultEmptyElements()[i].getElement();
      if (emptyEl) {
        const handler = () => this.clickWordCardsHandler(wordCardEl, emptyEl);
        if (isAdd) {
          if (!this.handlers.has(wordCardEl)) {
            this.handlers.set(wordCardEl, handler);
            wordCardEl.addEventListener('click', handler);
          }
        } else {
          const existingHandler = this.handlers.get(wordCardEl);
          if (existingHandler) {
            wordCardEl.removeEventListener('click', existingHandler);
            this.handlers.delete(wordCardEl);
          }
        }
      }
    });
  }

  clickWordCardsHandler(wordCardEl: HTMLElement, emptyEl: HTMLElement) {
    this.resultSection?.deleteSelected();
    if (this.sourceSection?.getElement().contains(wordCardEl)) {
      this.resultSection?.addWordInResult(wordCardEl);
      this.sourceSection.insertChild(emptyEl);
    } else {
      this.sourceSection?.addWordInSource(wordCardEl);
      this.resultSection?.addEmptyInResult(emptyEl);
    }
    if (this.resultSection?.canClickCheck()) {
      this.checkButton?.enableButton();
    } else {
      this.checkButton?.disableButton();
    }
  }
}
