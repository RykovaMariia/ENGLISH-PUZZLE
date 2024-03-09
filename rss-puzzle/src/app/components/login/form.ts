import './form.scss';
import { BaseButton } from '../base/base-button';
import { BaseElement } from '../base/base-element';
import { BaseInputText } from '../base/base-input-text';

const FIELD_NAME = ['First Name', 'Surname'];
const ID = ['firstName', 'surname'];
const REG_VALID = '(^[A-Z]{1})+[A-Za-z\\-]+$';

export class Form extends BaseElement<HTMLFormElement> {
  constructor() {
    super({
      tagName: 'form',
      classNames: 'login__form',
    });
    this.addHeading();
    this.addInputFields();
    this.addSubmitButton();
  }

  addHeading() {
    const heading = new BaseElement({
      tagName: 'h2',
      classNames: 'login__heading',
      textContent: 'LOGIN',
    });
    this.insertChild(heading.getElement());
  }

  addInputFields() {
    const inputs = FIELD_NAME.map((el, i) => {
      const div = new BaseElement({ tagName: 'div', classNames: 'input' });
      const label = new BaseElement({
        tagName: 'label',
        classNames: 'input__label',
        textContent: el,
        attribute: { name: 'for', value: ID[i] },
      });
      const spanError = new BaseElement({ tagName: 'span', classNames: 'error' });

      const input = new BaseInputText({ classNames: ['input__field', 'input_empty'] }, ID[i]);
      input.setAttribute({ name: 'pattern', value: REG_VALID });
      input.setAttribute({ name: 'minlength', value: (3 + i).toString() });
      input.setRequired();
      input.setHandler(() => Form.inputHandlerField(input, el, spanError, i));

      div.insertChildren([spanError, input, label]);
      return div;
    });

    this.insertChildren(inputs);
  }

  addSubmitButton() {
    const submitButton = new BaseButton({
      attribute: { name: 'type', value: 'submit' },
      textContent: 'Login',
      classNames: 'button',
    });
    this.insertChild(submitButton.getElement());
  }

  private static inputHandlerField(
    input: BaseInputText,
    fieldName: string,
    errorElement: BaseElement,
    countCharacter: number,
  ) {
    input.removeClassName('input_empty');
    if (input.isValid()) {
      errorElement.setTextContent(' ');
    } else if (input.isValueMissing()) {
      errorElement.setTextContent(`You need enter ${fieldName}`);
      input.setClassName('input_empty');
    } else if (input.isPatternMismatch()) {
      errorElement.setTextContent(
        `Your ${fieldName} should start with a capital and only contain A-Z, a-z, and '-'.`,
      );
    } else if (input.isTooShort()) {
      errorElement.setTextContent(
        `Your ${fieldName} value must contain at least ${3 + countCharacter} characters`,
      );
    }
  }
}
