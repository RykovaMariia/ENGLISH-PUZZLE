import { BaseElementProps } from '../interfaces/element-props';
import { BaseElement } from './base-element';

export type BaseInputTextType = Omit<BaseElementProps, 'tagName' | 'attribute'>;

export class BaseInputText extends BaseElement<HTMLInputElement> {
  constructor(props: BaseInputTextType, id?: string, cb?: (e: Event) => void) {
    super({ tagName: 'input', attribute: { name: 'type', value: 'text' }, ...props });
    if (cb) this.setHandler(cb);
    if (id) this.setId(id);
  }

  setId(idName: string) {
    this.setAttribute({ name: 'id', value: idName });
  }

  setRequired() {
    this.element.required = true;
  }

  setHandler(cb: (e: Event) => void) {
    if (typeof cb === 'function') {
      this.element.addEventListener('input', (e) => cb(e));
    }
  }

  isValid() {
    return this.element.validity.valid;
  }

  isValueMissing() {
    return this.element.validity.valueMissing;
  }

  isPatternMismatch() {
    return this.element.validity.patternMismatch;
  }

  isTooShort() {
    return this.element.validity.tooShort;
  }
}
