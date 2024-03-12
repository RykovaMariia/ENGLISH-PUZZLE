import { AppRoute } from '../enums/app-route';
import { IRouter } from '../interfaces/router';

export function createRoutes(router: IRouter) {
  return [
    {
      path: '',
      component: async () => {
        const { Login } = await import('../pages/login-page/login');
        return new Login(router);
      },
    },
    {
      path: AppRoute.Login,
      component: async () => {
        const { Login } = await import('../pages/login-page/login');
        return new Login(router);
      },
    },
    {
      path: AppRoute.NotFound,
      component: async () => {
        const { NotFound } = await import('../pages/not-found-page/not-found');
        return new NotFound(router);
      },
    },
  ];
}
