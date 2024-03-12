import './login.scss';

import { Form } from './form/form';
import { BaseElement } from '../../components/base-element';
import { IRouter } from '../../interfaces/router';

export class Login extends BaseElement {
  private headingPuzzle = new BaseElement({
    tagName: 'h1',
    classNames: 'heading',
    textContent: 'PUZZLE ENGLISH',
  });

  constructor(router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'login',
    });
    const form = new Form(router);
    this.insertChildren([this.headingPuzzle, form]);
  }
}
