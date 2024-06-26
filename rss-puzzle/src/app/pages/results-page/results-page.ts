import './results.scss';
import { BaseComponent } from '../../components/base-component';
import { Button } from '../../components/button/button-component';
import { AppRoute } from '../../enums/app-route';
import { IRouter } from '../../interfaces/router';
import { MAX_SENTENCE, gameService } from '../../services/game-service';
import { localStorageService } from '../../services/storage-service';
import { getCountRound } from '../../utils/words-game';

export class Results extends BaseComponent {
  constructor(private router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'results',
    });

    const headingPuzzle = new BaseComponent({
      tagName: 'h1',
      classNames: 'heading',
      textContent: 'Results',
    });

    const logoutButton = new Button(
      {
        textContent: 'LOGOUT',
        classNames: 'button',
      },
      () => {
        localStorageService.removeData('completedLevels');
        localStorageService.removeData('completedRounds');
        localStorageService.removeData('audioHint');
        localStorageService.removeData('puzzleHint');
        localStorageService.removeData('translateHint');
        localStorageService.removeData('userFullName');
        gameService.resetGame();
        this.router.navigate(AppRoute.Login);
      },
    );

    this.insertChildren([logoutButton, headingPuzzle]);
    this.drawContinueButton(router);
  }

  drawContinueButton(router: IRouter) {
    const continueButton = new Button(
      {
        classNames: ['button', 'button_check'],
        textContent: 'CONTINUE',
      },
      () => {
        const gameProps = gameService.getGameProps();
        const currentLevel = gameProps.level.toString();
        const currentRound = gameProps.round.toString();

        if (gameProps.sentence === MAX_SENTENCE && +currentRound === getCountRound(+currentLevel)) {
          let levels = localStorageService.getData('completedLevels') || [];
          levels.push(currentLevel);
          levels = [...new Set(levels)];
          localStorageService.saveData('completedLevels', levels);
        }

        if (gameProps.sentence === MAX_SENTENCE) {
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
        router.navigate(AppRoute.Game);
      },
    );
    this.insertChildren([continueButton]);
  }
}
