import './form.scss';
import { BaseButton } from '../base/base-button';
import { BaseElement } from '../base/base-element';
import { BaseInputText } from '../base/base-input-text';

const FIELD_NAME = ['First Name', 'Surname'];
const ID = ['firstName', 'surname'];

export class Form extends BaseElement {
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
      const input = new BaseInputText({ classNames: 'input__field' });
      input.setId(ID[i]);
      input.addRequired();
      div.insertChildren([input, label]);
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
    // submitButton.disableButton();
    this.insertChild(submitButton.getElement());
  }
}
