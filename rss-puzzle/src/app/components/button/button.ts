import { BaseElement, TaggedElementProps } from '../base-element';

export class Button extends BaseElement {
  constructor(props: TaggedElementProps, cb?: (e: Event) => void) {
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
