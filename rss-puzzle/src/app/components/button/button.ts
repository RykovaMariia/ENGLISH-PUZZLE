import './button.scss';

import { BaseElement, TaggedElementProps } from '../base-element';

export class Button extends BaseElement {
  constructor(props: TaggedElementProps, cb?: (e: Event) => void) {
    super({ tagName: 'button', ...props });
    if (cb) this.setHandler(cb);
    this.setClassName('button');
  }

  disableButton() {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = true;
    }
  }

  enableButton() {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = false;
    }
  }

  setHandler(cb: (e: Event) => void) {
    if (typeof cb === 'function') {
      this.element.addEventListener('click', (e) => cb(e));
    }
  }
}
