import { BaseComponent } from '../../components/base-component';
import { ButtonComponent } from '../../components/button/button-component';
import { AppRoute } from '../../enums/app-route';
import { IRouter } from '../../interfaces/router';

export class NotFound extends BaseComponent {
  private headingPuzzle = new BaseComponent({
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
    const submitButton = new ButtonComponent(
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
