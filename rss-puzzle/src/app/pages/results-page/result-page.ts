import { BaseComponent } from '../../components/base-component';
import { Button } from '../../components/button/button-component';
import { AppRoute } from '../../enums/app-route';
import { IRouter } from '../../interfaces/router';

export class Results extends BaseComponent {
  private headingPuzzle = new BaseComponent({
    tagName: 'h1',
    classNames: 'heading',
    textContent: 'Results',
  });

  constructor(private router: IRouter) {
    super({
      tagName: 'main',
      classNames: 'results',
    });

    const continueButton = new Button(
      {
        classNames: ['button', 'button_check'],
        textContent: 'CONTINUE',
      },
      () => {
        this.router.navigate(AppRoute.Game);
      },
    );
    this.insertChildren([this.headingPuzzle, continueButton]);
  }
}
