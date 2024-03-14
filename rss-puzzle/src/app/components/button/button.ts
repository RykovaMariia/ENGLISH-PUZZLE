import './button.scss';

import { BaseElement, TaggedElementProps } from '../base-element';

export class Button extends BaseElement<HTMLButtonElement> {
  constructor(props: TaggedElementProps, cb?: (e: Event) => void) {
    super({ tagName: 'button', ...props });
    if (cb) this.setHandler(cb);
    this.setClassName('button');
  }

  disableButton() {
    this.element.disabled = true;
  }

  enableButton() {
    this.element.disabled = false;
  }

  setHandler(cb: (e: Event) => void) {
    this.element.addEventListener('click', (e) => cb(e));
  }
}
