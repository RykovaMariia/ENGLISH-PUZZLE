import './start.scss';

import { BaseElement } from '../../components/base-element';
import { localStorageService } from '../../services/storage-service';

export class Start extends BaseElement {
  constructor() {
    super({
      tagName: 'main',
      classNames: 'start',
    });

    this.drawPersonalizedGreeting();
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
