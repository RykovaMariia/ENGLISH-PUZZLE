import { AttributeElement, BaseElementProps } from '../interfaces/element-props';

export class BaseElement {
  protected element: HTMLElement;

  constructor(props: BaseElementProps) {
    this.element = document.createElement(props.tagName);
    if (props.classNames) {
      this.setClassName(props.classNames);
    }
    if (props.textContent) {
      this.setTextContent(props.textContent);
    }
    if (props.parentNode) {
      this.insertChild(props.parentNode);
    }
    if (props.attribute) {
      this.setAttribute(props.attribute);
    }
  }

  getElement() {
    return this.element;
  }

  setClassName(classNames: string[] | string) {
    if (typeof classNames === 'string') {
      this.element.classList.add(classNames);
    } else {
      classNames.forEach((el) => this.element.classList.add(el));
    }
  }

  setTextContent(text: string) {
    if (text) {
      this.element.innerText = text;
    }
  }

  insertChild(child: HTMLElement): void {
    this.element.append(child);
  }

  insertChildren(children: BaseElement[]): void {
    children.forEach((el) => this.insertChild(el.getElement()));
  }

  public setAttribute(attribute: AttributeElement) {
    if (attribute) {
      this.element.setAttribute(attribute.name, attribute.value);
    }
  }
}
