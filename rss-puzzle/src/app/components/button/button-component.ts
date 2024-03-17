import './button.scss';

import { BaseComponent, TaggedElementProps } from '../base-component';

export class ButtonComponent extends BaseComponent<HTMLButtonElement> {
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
