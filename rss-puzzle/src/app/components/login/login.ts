import './login.scss';
import { BaseElement } from '../base/base-element';
import { Form } from './form';

export class Login extends BaseElement {
  private headingPuzzle = new BaseElement({
    tagName: 'h1',
    classNames: 'heading',
    textContent: 'PUZZLE ENGLISH',
  });

  private form = new Form();

  constructor() {
    super({
      tagName: 'main',
      classNames: 'login',
    });
    this.insertChildren([this.headingPuzzle, this.form]);
  }
}
