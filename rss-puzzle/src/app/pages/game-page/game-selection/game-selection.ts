import './game-selection.scss';
import { BaseComponent } from '../../../components/base-component';
import { GameProps } from '../../../interfaces/game-props';
import { getCountRound } from '../../../utils/words-game';
import { gameService } from '../../../services/game-service';
import { localStorageService } from '../../../services/storage-service';
import { IRouter } from '../../../interfaces/router';
import { AppRoute } from '../../../enums/app-route';
import { Button } from '../../../components/button/button-component';

const COUNT_LEVEL = 6;

export class GameSelection extends BaseComponent {
  private headingPuzzle = new BaseComponent({
    tagName: 'h1',
    classNames: 'game-name',
    textContent: 'ENGLISH PUZZLE',
  });

  private selects = new BaseComponent({
    tagName: 'div',
    classNames: 'selects',
  });

  private logoutButton = new Button(
    {
      textContent: 'logout',
      classNames: 'button_logout',
    },
    () => {
      localStorageService.removeData('userFullName');
      localStorageService.removeData('audioHint');
      localStorageService.removeData('puzzleHint');
      localStorageService.removeData('translateHint');
      this.router.navigate(AppRoute.Login);
    },
  );

  constructor(
    gameProps: GameProps,
    redrawGame: () => void,
    private router: IRouter,
  ) {
    super({
      tagName: 'section',
      classNames: 'game-selection',
    });
    this.insertChildren([this.headingPuzzle, this.selects, this.logoutButton]);
    this.drawSelectLevel(gameProps, redrawGame);
    this.drawSelectRound(gameProps, redrawGame);
  }

  drawSelectLevel(gameProps: GameProps, redrawGame: () => void) {
    const levelLabel = new BaseComponent({
      tagName: 'label',
      classNames: 'label',
      textContent: 'Level',
    });
    levelLabel.setAttribute({ name: 'for', value: 'level' });

    const levelSelect = new BaseComponent<HTMLSelectElement>({
      tagName: 'select',
      classNames: 'select',
    });
    levelSelect.setAttribute({ name: 'id', value: 'level' });

    for (let i = 1; i <= COUNT_LEVEL; i += 1) {
      const option = new BaseComponent<HTMLOptionElement>({
        tagName: 'option',
        classNames: 'level-option',
        textContent: `${i}`,
      });
      option.setAttribute({ name: 'value', value: `${i}` });
      if (i === gameProps.level) {
        option.getElement().selected = true;
      }
      levelSelect.insertChild(option);
    }

    levelSelect.getElement().addEventListener('change', () => {
      const newLevel = levelSelect.getElement().selectedIndex;
      gameService.setLevel(newLevel + 1);
      redrawGame();
    });

    this.selects.insertChildren([levelLabel, levelSelect]);
  }

  drawSelectRound(gameProps: GameProps, redrawGame: () => void) {
    const roundLabel = new BaseComponent({
      tagName: 'label',
      classNames: 'label',
      textContent: 'Round',
    });
    roundLabel.setAttribute({ name: 'for', value: 'round' });

    const roundSelect = new BaseComponent<HTMLSelectElement>({
      tagName: 'select',
      classNames: 'select',
    });
    roundSelect.setAttribute({ name: 'id', value: 'round' });

    const countRound = getCountRound(gameProps.level) || 1;
    for (let i = 1; i <= countRound; i += 1) {
      const option = new BaseComponent<HTMLOptionElement>({
        tagName: 'option',
        classNames: 'round-option',
        textContent: `${i}`,
      });
      option.setAttribute({ name: 'value', value: `${i}` });
      if (i - 1 === gameProps.round) {
        option.getElement().selected = true;
      }
      roundSelect.insertChild(option);
    }

    roundSelect.getElement().addEventListener('change', () => {
      const newRound = roundSelect.getElement().selectedIndex;
      gameService.setRound(newRound);
      redrawGame();
    });

    this.selects.insertChildren([roundLabel, roundSelect]);
  }
}
