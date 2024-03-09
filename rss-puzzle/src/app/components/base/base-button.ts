import { BaseElementProps } from '../interfaces/element-props';
import { BaseElement } from './base-element';

export type BaseButtonType = Omit<BaseElementProps, 'tagName'>;

export class BaseButton extends BaseElement {
  constructor(props: BaseButtonType) {
    super({ tagName: 'button', ...props });
  }

  disableButton() {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = true;
    }
  }
}
