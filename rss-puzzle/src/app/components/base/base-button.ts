import { BaseElementProps } from '../interfaces/element-props';
import { BaseElement } from './base-element';

export type BaseButtonType = Omit<BaseElementProps, 'tagName'>;

export class BaseButton extends BaseElement {
  constructor(props: BaseButtonType, cb?: (e: Event) => void) {
    super({ tagName: 'button', ...props });
    if (cb) this.setHandler(cb);
  }

  disableButton() {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = true;
    }
  }

  setHandler(cb: (e: Event) => void) {
    if (typeof cb === 'function') {
      this.element.addEventListener('click', (e) => cb(e));
    }
  }
}
