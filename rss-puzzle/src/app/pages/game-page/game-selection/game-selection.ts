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

function openCloseDropdownMenu(dropdownMenu: BaseComponent) {
  if (dropdownMenu.getStyleTransform() === 'scaleY(0)' || !dropdownMenu.getStyleTransform()) {
    dropdownMenu.setStyleTransform('scaleY(1)');
  } else {
    dropdownMenu.setStyleTransform('scaleY(0)');
  }
}

function change({
  item,
  dropdown,
  redrawGame,
  isLevel,
}: {
  item: BaseComponent;
  dropdown: BaseComponent;
  redrawGame: () => void;
  isLevel: boolean;
}) {
  const selectedItem = item.getTextContent();
  dropdown.setStyleTransform('scaleY(0)');
  if (isLevel) {
    gameService.setLevel(+selectedItem);
  } else {
    gameService.setRound(+selectedItem);
  }
  redrawGame();
}

function selectCompletedItem({
  item,
  numberItem,
  isLevel,
  level,
}: {
  item: BaseComponent;
  numberItem: number;
  isLevel: boolean;
  level: number;
}) {
  if (isLevel) {
    if (localStorageService.getData('completedLevels')?.includes(`${numberItem}`)) {
      item.setClassName('item_completed');
    }
  } else {
    const rounds = localStorageService.getData('completedRounds');
    rounds?.forEach((el) => {
      if (el.level === level.toString() && el.rounds.includes(`${numberItem}`)) {
        item.setClassName('item_completed');
      }
    });
  }
}

function getButton({
  gameProps,
  dropdownMenu,
  redrawGame,
  isLevel,
}: {
  gameProps: GameProps;
  dropdownMenu: BaseComponent;
  redrawGame: () => void;
  isLevel: boolean;
}) {
  const button = new Button(
    {
      classNames: 'dropdown__button',
      textContent: `${isLevel ? gameProps.level : gameProps.round}`,
    },
    () => {
      openCloseDropdownMenu(dropdownMenu);
    },
  );

  const count = isLevel ? COUNT_LEVEL : getCountRound(gameProps.level) || 1;
  for (let i = 1; i <= count; i += 1) {
    const item = new BaseComponent({
      tagName: 'li',
      classNames: 'item',
      textContent: `${i}`,
    });

    selectCompletedItem({ item, numberItem: i, isLevel, level: gameProps.level });

    item.setOnclick(() => {
      change({ item, dropdown: dropdownMenu, redrawGame: () => redrawGame(), isLevel });
    });

    dropdownMenu.insertChild(item);
  }

  button.insertChild(dropdownMenu);
  return button;
}

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
    this.drawDropdown(gameProps, redrawGame, true);
    this.drawDropdown(gameProps, redrawGame, false);
  }

  drawDropdown(gameProps: GameProps, redrawGame: () => void, isLevel: boolean) {
    const wrapperDropdown = new BaseComponent({
      tagName: 'div',
      classNames: 'dropdown',
    });

    const nameMenu = new BaseComponent({
      tagName: 'span',
      classNames: 'label',
      textContent: `${isLevel ? 'Level' : 'Round'}`,
    });

    const dropdownMenu = new BaseComponent({
      tagName: 'ul',
      classNames: 'dropdown__list',
    });

    const button = getButton({ gameProps, dropdownMenu, redrawGame, isLevel });

    wrapperDropdown.insertChildren([nameMenu, button]);
    this.selects.insertChildren([wrapperDropdown]);
  }
}
