import { AppRoute } from '../enums/app-route';
import { IRouter } from '../interfaces/router';
import { Route } from '../interfaces/route';
import { createRoutes } from './create-router';

interface UserRequest {
  path?: string;
  resource?: string;
}

function parseUrl(url: string) {
  const result: UserRequest = {};
  const path = url.split('/');
  [result.path = '', result.resource = ''] = path;
  return result;
}

export class Router implements IRouter {
  private routerOutlet: HTMLElement | null = null;

  private routes: Route[] = createRoutes(this);

  constructor() {
    window.addEventListener('popstate', this.browserChangeHandler.bind(this));
  }

  init(routerOutlet: HTMLElement) {
    this.routerOutlet = routerOutlet;
    const path = window.location.pathname.slice(1);
    this.navigate(path);
  }

  navigate(url: string) {
    const request = parseUrl(url);

    const pathForFind =
      request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route = this.routes.find((item) => item.path === pathForFind);

    if (!route) {
      this.redirectedToNotFound();
      return;
    }

    route.component().then((component) => {
      if (!this.routerOutlet) {
        return;
      }
      this.routerOutlet.innerHTML = '';
      this.routerOutlet.append(component.getElement());
      window.history.pushState({}, '', url);
    });
  }

  redirectedToNotFound() {
    const routeNotFound = this.routes.find((item) => item.path === AppRoute.NotFound);

    if (routeNotFound) {
      this.navigate(routeNotFound.path);
    }
  }

  browserChangeHandler() {
    const path = window.location.pathname.slice(1);
    this.navigate(path);
  }
}

export const router = new Router();
