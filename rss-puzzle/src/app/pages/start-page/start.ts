import './start.scss';

import { BaseComponent } from '../../components/base-component';
import { localStorageService } from '../../services/storage-service';
import { IRouter } from '../../interfaces/router';
import { AppRoute } from '../../enums/app-route';
import { Button } from '../../components/button/button-component';
import { gameService } from '../../services/game-service';

const TextContentHint = [
  { icon: 'lightbulb', description: 'translation' },
  { icon: 'extension', description: 'background image' },
  { icon: 'volume_up', description: 'pronunciation' },
];

export class Start extends BaseComponent {
  constructor(private router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'start',
    });

    this.drawPersonalizedGreeting();
    this.drawButtons();
    this.drawGameDescription();
  }

  drawPersonalizedGreeting() {
    const sectionPersonalizedGreeting = new BaseComponent({
      tagName: 'section',
      classNames: 'personalized-greeting',
    });
    const welcome = new BaseComponent({
      tagName: 'h1',
      classNames: 'personalized-greeting__heading',
      textContent: 'WELCOME',
    });
    const userName = new BaseComponent({
      tagName: 'h2',
      classNames: 'personalizedGreeting__user-name',
      textContent: `${localStorageService.getData('userFullName')?.firstName ?? ' '} ${localStorageService.getData('userFullName')?.surname ?? ' '}`,
    });
    sectionPersonalizedGreeting.insertChildren([welcome, userName]);
    this.insertChild(sectionPersonalizedGreeting.getElement());
  }

  drawButtons() {
    const buttons = new BaseComponent({
      tagName: 'div',
      classNames: 'buttons',
    });

    const startButton = new Button(
      {
        textContent: 'START',
        classNames: 'button_start',
      },
      () => this.router.navigate(AppRoute.Game),
    );

    const logoutButton = new Button(
      {
        textContent: 'LOGOUT',
        classNames: 'button_start',
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

    buttons.insertChildren([startButton, logoutButton]);
    this.insertChild(buttons);
  }

  drawGameDescription() {
    const sectionGameDescription = new BaseComponent({
      tagName: 'section',
      classNames: 'game-description',
    });
    const headingPuzzle = new BaseComponent({
      tagName: 'h2',
      classNames: 'name',
      textContent: 'ENGLISH PUZZLE',
    });
    const description = new BaseComponent({
      tagName: 'p',
      classNames: 'description',
      textContent:
        'Click on words, collect phrases. Words can be drag and drop. Select tooltips in the menu\n\n',
    });

    TextContentHint.forEach((el) => {
      const icon = new BaseComponent({
        tagName: 'span',
        classNames: 'material-symbols-outlined',
        textContent: el.icon,
      });
      const descriptionHint = new BaseComponent({
        tagName: 'span',
        classNames: 'description-hint',
        textContent: ` - turn on the ${el.description} hint\n`,
      });
      description.insertChildren([icon, descriptionHint]);
    });

    sectionGameDescription.insertChildren([headingPuzzle, description]);
    this.insertChild(sectionGameDescription.getElement());
  }
}
