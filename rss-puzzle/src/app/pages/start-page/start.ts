import './start.scss';

import { BaseElement } from '../../components/base-element';
import { localStorageService } from '../../services/storage-service';
import { IRouter } from '../../interfaces/router';
import { AppRoute } from '../../enums/app-route';
import { Button } from '../../components/button/button';

export class Start extends BaseElement {
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
    const sectionPersonalizedGreeting = new BaseElement({
      tagName: 'section',
      classNames: 'personalized-greeting',
    });
    const welcome = new BaseElement({
      tagName: 'h1',
      classNames: 'personalized-greeting__heading',
      textContent: 'WELCOME',
    });
    const userName = new BaseElement({
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
      () => this.router.navigate(AppRoute.Login),
    );

    this.insertChild(startButton.getElement());
  }

  drawGameDescription() {
    const sectionGameDescription = new BaseElement({
      tagName: 'section',
      classNames: 'game-description',
    });
    const headingPuzzle = new BaseElement({
      tagName: 'h2',
      classNames: 'name',
      textContent: 'ENGLISH PUZZLE',
    });
    const description = new BaseElement({
      tagName: 'p',
      classNames: 'description',
      textContent:
        'Click on words, collect phrases. Words can be drag and drop. Select tooltips in the menu',
    });

    sectionGameDescription.insertChildren([headingPuzzle, description]);
    this.insertChild(sectionGameDescription.getElement());
  }
}
