import { BaseComponent } from '../../../components/base-component';
import { Button } from '../../../components/button/button-component';

export class ButtonSection extends BaseComponent {
  private checkButton: Button;

  private continueButton: Button;

  private autoCompleteButton: Button;

  constructor({
    clickCheckButton,
    clickContinueButton,
    clickAutoComplete,
  }: {
    clickCheckButton: () => void;
    clickContinueButton: () => void;
    clickAutoComplete: () => void;
  }) {
    super({ tagName: 'div', classNames: 'buttons' });

    this.checkButton = new Button(
      {
        classNames: ['button', 'button_check'],
        textContent: 'CHECK',
      },
      clickCheckButton,
    );

    this.continueButton = new Button(
      {
        classNames: ['button', 'continue', 'button_hidden'],
        textContent: 'CONTINUE',
      },
      clickContinueButton,
    );

    this.autoCompleteButton = new Button(
      {
        classNames: ['button', 'button_auto-complete'],
        textContent: `don't know`,
      },
      clickAutoComplete,
    );

    this.checkButton.disableButton();
    this.continueButton.disableButton();
    this.insertChildren([this.autoCompleteButton, this.checkButton, this.continueButton]);
  }

  setCorrectOrderButtonState() {
    this.continueButton.enableButton();

    this.continueButton.removeClassName('button_hidden');
    this.checkButton.setClassName('button_hidden');
    this.autoCompleteButton.setClassName('button_hidden');
  }

  setAutoCompleteButtonState() {
    this.autoCompleteButton.destroy();
    this.checkButton.destroy();
    this.continueButton.enableButton();
    this.continueButton.removeClassName('button_hidden');
  }

  setCheckButtonDisability(isDisabled: boolean) {
    if (isDisabled) {
      this.checkButton?.enableButton();
    } else {
      this.checkButton?.disableButton();
    }
  }
}
