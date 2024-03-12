import './form.scss';
import { Button } from '../../../components/button/button';
import { Input } from '../../../components/input/input';
import { localStorageService } from '../../../services/storage-service';
import { BaseElement } from '../../../components/base-element';
import { AppRoute } from '../../../enums/app-route';
import { IRouter } from '../../../interfaces/router';

const FIELD_NAME = ['First Name', 'Surname'];
const ID = ['firstName', 'surname'];
const REG_VALID = '(^[A-Z]{1})+[A-Za-z\\-]+$';
function getError(input: Input, fieldName: string, countCharacter: number) {
  input.removeClassName('input_empty');
  if (input.isValid()) {
    return ' ';
  }
  if (input.isValueMissing()) {
    input.setClassName('input_empty');
    return `You need enter ${fieldName}`;
  }
  if (input.isPatternMismatch()) {
    return `Your ${fieldName} should start with a capital and only contain A-Z, a-z, and '-'.`;
  }
  if (input.isTooShort()) {
    return `Your ${fieldName} value must contain at least ${3 + countCharacter} characters`;
  }
  return `I don't know`;
}

export class Form extends BaseElement<HTMLFormElement> {
  private inputFields: Input[] = [];

  private spanElements: BaseElement[] = [];

  constructor(private router: IRouter) {
    super({
      tagName: 'form',
      classNames: 'login__form',
    });
    this.drawHeading();
    this.drawInputFields();
    this.drawSubmitButton();
  }

  drawHeading() {
    const heading = new BaseElement({
      tagName: 'h2',
      classNames: 'login__heading',
      textContent: 'LOGIN',
    });
    this.insertChild(heading.getElement());
  }

  drawInputFields() {
    const inputs = FIELD_NAME.map((el, i) => {
      const div = new BaseElement({ tagName: 'div', classNames: 'input' });
      const label = new BaseElement({
        tagName: 'label',
        classNames: 'input__label',
        textContent: el,
        attribute: { name: 'for', value: ID[i] },
      });
      const spanError = new BaseElement({ tagName: 'span', classNames: 'error' });
      this.spanElements.push(spanError);

      const input = new Input({ classNames: ['input__field', 'input_empty'] }, { id: ID[i] });
      this.inputFields.push(input);
      input.setValidation({ isRequired: true, patternValue: REG_VALID, minlengthValue: i + 3 });
      input.setHandler(() => spanError.setTextContent(getError(input, el, i)));

      div.insertChildren([spanError, input, label]);
      return div;
    });

    this.insertChildren(inputs);
  }

  drawSubmitButton() {
    const submitButton = new Button(
      {
        attribute: { name: 'type', value: 'submit' },
        textContent: 'Login',
        classNames: 'button',
      },
      (e) => {
        e.preventDefault();

        if (this.inputFields.every((input) => input.isValid())) {
          localStorageService.saveData('userFullName', {
            firstName: this.inputFields[0].getValue(),
            surname: this.inputFields[1].getValue(),
          });
          this.router.navigate(AppRoute.Start);
        } else {
          this.inputFields.forEach((input, i) => {
            this.spanElements[i].setTextContent(getError(input, FIELD_NAME[i], i));
          });
        }
      },
    );
    this.insertChild(submitButton.getElement());
  }
}
