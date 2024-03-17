import './game.scss';
import { BaseComponent } from '../../components/base-component';
import { ResultSection } from './result-section/result-section';
import { SourceSection } from './source-section/source-section';
import { gameService } from '../../services/game-service';
import { GameProps } from '../../interfaces/game-props';
import { Hints } from './hints-section/hints';
import { ButtonSection } from './buttons-section/buttons-section';

export class Game extends BaseComponent {
  private hints: BaseComponent | undefined;

  private resultSection: ResultSection | undefined;

  private sourceSection: SourceSection | undefined;

  private buttons: ButtonSection | undefined;

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

  drawGame(gameProps: GameProps, words: string[] | undefined) {
    this.resultSection = new ResultSection(gameProps);
    this.sourceSection = new SourceSection(words || [], gameProps);
    this.hints = new Hints(() => this.sourceSection?.addBackgroundImg(words || [], gameProps));
    this.buttons = new ButtonSection({
      clickCheckButton: () => this.clickCheckButton(gameProps),
      clickContinueButton: () => this.clickContinueButton(),
      clickAutoComplete: () => this.clickAutoComplete(gameProps.sentence),
    });
    this.addClickWordCardsHandler(true, gameProps.sentence);
    this.insertChildren([this.hints, this.resultSection, this.sourceSection, this.buttons]);
  }

  clickCheckButton(gameProps: GameProps) {
    if (this.resultSection?.isCorrectedWordOrder(gameProps)) {
      this.addClickWordCardsHandler(false, gameProps.sentence);
      this.buttons?.setCorrectOrderButtonState();
    } else {
      this.resultSection?.selectedUncorrectedWordOrder();
    }
  }

  clickContinueButton() {
    gameService.nextSentence();
    this.removeGame();
    this.drawGame(gameService.getGameProps(), gameService.getWords());
  }

  clickAutoComplete(sentence: number) {
    this.sourceSection?.getSourceWordElements()?.forEach((el) => {
      this.resultSection?.addEmptyInResult(el, sentence);
      el.setOnclick(null);
    });

    this.resultSection?.getResultEmptyElements(sentence).forEach((el) => {
      this.sourceSection?.addWordInSource(el.getElement());
    });

    this.buttons?.setAutoCompleteButtonState();
  }

  addClickWordCardsHandler(isAdd: boolean, sentence: number) {
    this.sourceSection?.getSourceWordElements()?.forEach((el, i) => {
      const emptyEl = this.resultSection?.getResultEmptyElements(sentence)[i];
      if (!emptyEl) return;
      if (isAdd) {
        el.setOnclick(() => this.clickWordCardsHandler(el.getElement(), emptyEl, sentence));
      } else {
        el.setOnclick(null);
      }
    });
  }

  clickWordCardsHandler = (wordCardEl: HTMLElement, emptyEl: BaseComponent, sentence: number) => {
    this.resultSection?.deleteSelected(sentence);
    if (this.sourceSection?.getElement().contains(wordCardEl)) {
      this.resultSection?.addWordInResult(wordCardEl);
      this.sourceSection.insertChild(emptyEl);
    } else {
      this.sourceSection?.addWordInSource(wordCardEl);
      this.resultSection?.addEmptyInResult(emptyEl, sentence);
    }
    this.buttons?.setCheckButtonDisability(!!this.resultSection?.canClickCheck());
  };
}
