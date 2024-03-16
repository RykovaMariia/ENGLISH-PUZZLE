interface BaseElementProps {
  tagName: string;
  classNames?: string | string[];
  textContent?: string | null;
  parentNode?: HTMLElement;
  attribute?: AttributeElement;
}

export type TaggedElementProps = Omit<BaseElementProps, 'tagName'>;

interface AttributeElement {
  name: string;
  value: string;
}

export class BaseElement<T extends HTMLElement = HTMLElement> {
  protected element: T;

  constructor(props: BaseElementProps) {
    this.element = document.createElement(props.tagName) as T;
    this.setClassName(props.classNames ?? '');
    this.setTextContent(props.textContent ?? '');
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
      this.element.classList.add(...classNames);
    }
  }

  removeClassName(className: string) {
    this.element.classList.remove(className);
  }

  getTextContent() {
    return this.element.innerText;
  }

  setTextContent(text: string) {
    this.element.innerText = text;
  }

  insertChild(child: HTMLElement): void {
    this.element.append(child);
  }

  insertChildren(children: BaseElement[]): void {
    children.forEach((el) => this.insertChild(el.getElement()));
  }

  setAttribute(attribute: AttributeElement) {
    if (attribute) {
      this.element.setAttribute(attribute.name, attribute.value);
    }
  }

  getChildren(): HTMLElement[] {
    return Array.from(this.element.children) as HTMLElement[];
  }

  destroy() {
    this.element.remove();
  }

  setStyleWidth(width: number | string) {
    this.element.style.width = `${width}px`;
  }
}
