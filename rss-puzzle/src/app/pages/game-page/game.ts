import './game.scss';
import { BaseComponent } from '../../components/base-component';
import { ResultSection } from './result-section/result-section';
import { SourceSection } from './source-section/source-section';
import { gameService } from '../../services/game-service';
import { GameProps } from '../../interfaces/game-props';
import { Hints } from './hints-section/hints';
import { ButtonSection } from './buttons-section/buttons-section';
import { GameSelection } from './game-selection/game-selection';
import { IRouter } from '../../interfaces/router';
import { getCountRound, getDescriptionImg, getImage } from '../../utils/words-game';
import { localStorageService } from '../../services/storage-service';

export class Game extends BaseComponent {
  private hints: BaseComponent | undefined;

  private resultSection: ResultSection | undefined;

  private sourceSection: SourceSection | undefined;

  private buttons: ButtonSection | undefined;

  private gameSelection: GameSelection | undefined;

  constructor(private router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'game',
    });

    this.drawGame(gameService.getGameProps(), gameService.getWords(), router);
  }

  removeGame() {
    this.gameSelection?.destroy();
    this.hints?.destroy();
    this.resultSection?.destroy();
    this.sourceSection?.destroy();
    this.buttons?.destroy();
  }

  drawGame(gameProps: GameProps, words: string[] | undefined, router: IRouter) {
    this.gameSelection = new GameSelection(gameProps, () => this.redrawGame(), router);
    this.resultSection = new ResultSection(gameProps);
    this.sourceSection = new SourceSection(words || [], gameProps);
    this.hints = new Hints(gameProps, () =>
      this.sourceSection?.addBackgroundImg(words || [], gameProps),
    );
    this.buttons = new ButtonSection({
      clickCheckButton: () => this.clickCheckButton(gameProps),
      clickContinueButton: () => this.clickContinueButton(gameProps),
      clickAutoComplete: () => this.clickAutoComplete(gameProps),
    });
    this.addClickWordCardsHandler(true, gameProps.sentence);
    this.insertChildren([
      this.gameSelection,
      this.hints,
      this.resultSection,
      this.sourceSection,
      this.buttons,
    ]);
  }

  clickCheckButton(gameProps: GameProps) {
    if (this.resultSection?.isCorrectedWordOrder(gameProps)) {
      if (gameProps.sentence === 9) {
        this.drawImgAndDescriptionImg(gameProps);
      } else {
        this.addClickWordCardsHandler(false, gameProps.sentence);
        this.buttons?.setCorrectOrderButtonState();
      }
    } else {
      this.resultSection?.selectedUncorrectedWordOrder(gameProps);
    }
  }

  drawImgAndDescriptionImg(gameProps: GameProps) {
    if (this.resultSection) {
      this.resultSection.setClassName('result_completed');
      this.resultSection.setBackgroundImg(`${getImage(gameProps.level, gameProps.round)}`, 0, 0);
    }
    if (this.sourceSection) {
      this.sourceSection.getElement().innerHTML = '';
      this.sourceSection.setTextContent(getDescriptionImg(gameProps) || '');
    }
  }

  clickContinueButton(gameProps: GameProps) {
    const currentLevel = gameProps.level.toString();
    const currentRound = gameProps.round.toString();

    if (gameProps.sentence === 9 && +currentRound === getCountRound(+currentLevel)) {
      let levels = localStorageService.getData('completedLevels') || [];
      levels.push(currentLevel);
      levels = [...new Set(levels)];
      localStorageService.saveData('completedLevels', levels);
    }

    if (gameProps.sentence === 9) {
      const rounds = localStorageService.getData('completedRounds') || [];
      if (rounds.length === 0 || !rounds.some((el) => el.level === currentLevel)) {
        rounds.push({ level: currentLevel, rounds: [currentRound] });
      } else {
        rounds.forEach((el) => {
          if (el.level === currentLevel && !el.rounds.includes(currentRound)) {
            el.rounds.push(currentRound);
          }
        });
      }
      localStorageService.saveData('completedRounds', rounds);
    }

    gameService.nextSentence();
    this.redrawGame();
  }

  redrawGame() {
    this.removeGame();
    this.drawGame(gameService.getGameProps(), gameService.getWords(), this.router);
  }

  clickAutoComplete(gameProps: GameProps) {
    this.sourceSection?.getSourceWordElements()?.forEach((el) => {
      this.resultSection?.addEmptyInResult(el, gameProps.sentence);
      this.resultSection?.deleteSelected(gameProps.sentence);
      el.setOnclick(null);
    });

    this.resultSection?.getResultEmptyElements(gameProps.sentence).forEach((el) => {
      this.sourceSection?.addWordInSource(el.getElement());
    });
    if (gameProps.sentence === 9) {
      this.drawImgAndDescriptionImg(gameProps);
    }

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
