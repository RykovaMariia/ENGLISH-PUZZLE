export interface BaseElementProps {
  tagName: string;
  classNames?: string | string[];
  textContent?: string;
  parentNode?: HTMLElement;
  attribute?: AttributeElement;
}

export interface AttributeElement {
  name: string;
  value: string;
}
