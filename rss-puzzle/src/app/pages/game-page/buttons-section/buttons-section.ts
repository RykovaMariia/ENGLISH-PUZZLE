import './buttons.scss';
import { BaseComponent } from '../../../components/base-component';
import { Button } from '../../../components/button/button-component';
import { IRouter } from '../../../interfaces/router';
import { AppRoute } from '../../../enums/app-route';

export class ButtonSection extends BaseComponent {
  private checkButton = new Button({
    classNames: ['button', 'button_check'],
    textContent: 'CHECK',
  });

  private autoCompleteButton: Button;

  private resultsButton: Button;

  constructor({
    clickCheckButton,
    clickContinueButton,
    clickAutoComplete,
    router,
  }: {
    clickCheckButton: () => void;
    clickContinueButton: () => void;
    clickAutoComplete: () => void;
    router: IRouter;
  }) {
    super({ tagName: 'div', classNames: 'buttons' });

    this.checkButton.setHandler(() => {
      if (this.checkButton.getTextContent() === 'CHECK') {
        clickCheckButton();
      } else {
        clickContinueButton();
        this.checkButton.setTextContent('CHECK');
      }
    });

    this.autoCompleteButton = new Button(
      {
        classNames: ['button', 'button_auto-complete'],
        textContent: `don't know`,
      },
      clickAutoComplete,
    );

    this.resultsButton = new Button(
      {
        classNames: ['button', 'button_results'],
        textContent: `RESULTS`,
      },
      () => router.navigate(AppRoute.Results),
    );

    this.checkButton.disableButton();
    this.resultsButton.setClassName('button_hidden');
    this.insertChildren([this.autoCompleteButton, this.checkButton, this.resultsButton]);
  }

  enableResultButton() {
    this.resultsButton.removeClassName('button_hidden');
  }

  setCorrectOrderButtonState() {
    this.checkButton.setTextContent('CONTINUE');
    this.checkButton?.enableButton();
    this.autoCompleteButton.setClassName('button_hidden');
  }

  setAutoCompleteButtonState() {
    this.autoCompleteButton.destroy();
    this.checkButton.setTextContent('CONTINUE');
    this.checkButton?.enableButton();
  }

  setCheckButtonDisability(isDisabled: boolean) {
    if (isDisabled) {
      this.checkButton?.enableButton();
    } else {
      this.checkButton?.disableButton();
    }
  }
}
