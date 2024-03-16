import './game.scss';
import { BaseElement } from '../../components/base-element';
import { ResultSection } from './result-section/result-section';
import { SourceSection } from './source-section/source-section';
import { Button } from '../../components/button/button';
import { gameService } from '../../services/game-service';
import { GameProps } from '../../interfaces/game-props';
import { Hints } from './hints-section/hints';

export class Game extends BaseElement {
  private hints: BaseElement | undefined;

  private resultSection: ResultSection | undefined;

  private sourceSection: SourceSection | undefined;

  private checkButton: Button | undefined;

  private continueButton: Button | undefined;

  private autoCompleteButton: Button | undefined;

  private buttons: BaseElement | undefined;

  private handlers: Map<Element, () => void> = new Map();

  constructor() {
    super({
      tagName: 'main',
      classNames: 'game',
    });

    this.drawGame(gameService.getGameProps(), gameService.getWords());
  }

  removeGame() {
    this.hints?.destroy();
    this.resultSection?.destroy();
    this.sourceSection?.destroy();
    this.buttons?.destroy();
  }

  drawGame(gameProps: GameProps, words: string[] | null) {
    this.hints = new Hints();
    this.resultSection = new ResultSection(gameProps);
    this.sourceSection = new SourceSection(words);
    this.buttons = this.getButtons(gameProps);
    this.insertChildren([this.hints, this.resultSection, this.sourceSection, this.buttons]);
  }

  getButtons(gameProps: GameProps) {
    const divButtons = new BaseElement({
      tagName: 'div',
      classNames: 'buttons',
    });

    this.checkButton = new Button(
      {
        classNames: ['button', 'button_check'],
        textContent: 'CHECK',
      },
      () => this.clickCheckButton(gameProps),
    );

    this.continueButton = new Button(
      {
        classNames: ['button', 'continue', 'button_hidden'],
        textContent: 'CONTINUE',
      },
      () => this.clickContinueButton(),
    );

    this.autoCompleteButton = new Button(
      {
        classNames: ['button', 'button_auto-complete'],
        textContent: `don't know`,
      },
      () => this.clickAutoComplete(),
    );

    this.addClickWordCardsHandler(true);
    this.checkButton.disableButton();
    this.continueButton.disableButton();
    divButtons.insertChildren([this.autoCompleteButton, this.checkButton, this.continueButton]);
    return divButtons;
  }

  clickCheckButton(gameProps: GameProps) {
    if (this.resultSection?.isCorrectedWordOrder(gameProps)) {
      this.continueButton?.enableButton();
      this.addClickWordCardsHandler(false);
      this.continueButton?.removeClassName('button_hidden');
      this.checkButton?.setClassName('button_hidden');
      this.autoCompleteButton?.setClassName('button_hidden');
    } else {
      this.resultSection?.selectedUncorrectedWordOrder();
    }
  }

  clickContinueButton() {
    gameService.nextSentence();
    this.removeGame();
    this.drawGame(gameService.getGameProps(), gameService.getWords());
  }

  clickAutoComplete() {
    this.sourceSection?.getSourceWordElements()?.forEach((el) => {
      this.resultSection?.addEmptyInResult(el.getElement());

      const existingHandler = this.handlers.get(el.getElement());
      if (existingHandler) {
        el.getElement().removeEventListener('click', existingHandler);
        this.handlers.delete(el.getElement());
      }
    });

    this.resultSection?.getResultEmptyElements().forEach((el) => {
      this.sourceSection?.addWordInSource(el.getElement());
    });

    this.autoCompleteButton?.destroy();
    this.checkButton?.destroy();
    this.continueButton?.enableButton();
    this.continueButton?.removeClassName('button_hidden');
  }

  addClickWordCardsHandler(isAdd: boolean) {
    this.sourceSection?.getSourceWordElements()?.forEach((el, i) => {
      const wordCardEl = el.getElement();
      const emptyEl = this.resultSection?.getResultEmptyElements()[i].getElement();
      if (!emptyEl) return;
      const handler = () => this.clickWordCardsHandler(wordCardEl, emptyEl);
      if (isAdd) {
        if (this.handlers.has(wordCardEl)) {
          return;
        }
        this.handlers.set(wordCardEl, handler);
        wordCardEl.addEventListener('click', handler);
        return;
      }
      const existingHandler = this.handlers.get(wordCardEl);
      if (existingHandler) {
        wordCardEl.removeEventListener('click', existingHandler);
        this.handlers.delete(wordCardEl);
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
