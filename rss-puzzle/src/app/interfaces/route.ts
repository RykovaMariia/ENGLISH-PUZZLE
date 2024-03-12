import { BaseElement } from '../components/base-element';

export interface Route {
  path: string;
  component: () => Promise<BaseElement>;
}
