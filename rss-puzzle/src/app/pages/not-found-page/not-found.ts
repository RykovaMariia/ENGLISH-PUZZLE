import { BaseElement } from '../../components/base-element';
import { Button } from '../../components/button/button';
import { AppRoute } from '../../enums/app-route';
import { IRouter } from '../../interfaces/router';

export class NotFound extends BaseElement {
  private headingPuzzle = new BaseElement({
    tagName: 'h1',
    classNames: 'heading',
    textContent: 'ERROR\n This page is not found',
  });

  constructor(private router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'not-found',
    });
    this.insertChildren([this.headingPuzzle]);
    const submitButton = new Button(
      {
        textContent: 'Login',
        classNames: 'button',
      },
      (e) => {
        e.preventDefault();
        this.router.navigate(AppRoute.Login);
      },
    );
    this.insertChild(submitButton.getElement());
  }
}
