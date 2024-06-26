import './login.scss';

import { Form } from './form/form';
import { BaseComponent } from '../../components/base-component';
import { IRouter } from '../../interfaces/router';

export class Login extends BaseComponent {
  private headingPuzzle = new BaseComponent({
    tagName: 'h1',
    classNames: 'heading',
    textContent: 'ENGLISH PUZZLE',
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
