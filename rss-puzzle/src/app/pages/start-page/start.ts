import './start.scss';

import { BaseComponent } from '../../components/base-component';
import { localStorageService } from '../../services/storage-service';
import { IRouter } from '../../interfaces/router';
import { AppRoute } from '../../enums/app-route';
import { Button } from '../../components/button/button-component';

export class Start extends BaseComponent {
  constructor(private router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'start',
    });

    this.drawPersonalizedGreeting();
    this.drawStartButton();
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

  drawStartButton() {
    const startButton = new Button(
      {
        textContent: 'Start',
        classNames: 'button__start',
      },
      () => this.router.navigate(AppRoute.Game),
    );

    this.insertChild(startButton.getElement());
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
        'Click on words, collect phrases. Words can be drag and drop. Select tooltips in the menu',
    });

    sectionGameDescription.insertChildren([headingPuzzle, description]);
    this.insertChild(sectionGameDescription.getElement());
  }
}
