import './start.scss';

import { BaseElement } from '../../components/base-element';

export class Start extends BaseElement {
  private headingPuzzle = new BaseElement({
    tagName: 'h1',
    classNames: 'heading',
    textContent: 'ENGLISH PUZZLE',
  });

  private description = new BaseElement({
    tagName: 'p',
    classNames: 'description',
    textContent:
      'An educational game aimed at learning English, where players assemble phrases by clicking and dragging words. Tooltips are available in the menu for easier navigation.',
  });

  constructor() {
    super({
      tagName: 'main',
      classNames: 'start',
    });
    this.insertChildren([this.headingPuzzle, this.description]);
  }
}
