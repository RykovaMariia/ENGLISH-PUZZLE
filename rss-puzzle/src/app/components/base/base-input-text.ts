import { BaseElementProps } from '../interfaces/element-props';
import { BaseElement } from './base-element';

export type BaseInputTextType = Omit<BaseElementProps, 'tagName' | 'attribute'>;

export class BaseInputText extends BaseElement {
  constructor(props: BaseInputTextType) {
    super({ tagName: 'input', attribute: { name: 'type', value: 'text' }, ...props });
  }

  setId(idName: string) {
    this.setAttribute({ name: 'id', value: idName });
  }

  addRequired() {
    if (this.element instanceof HTMLInputElement) {
      this.element.required = true;
    }
  }
}
