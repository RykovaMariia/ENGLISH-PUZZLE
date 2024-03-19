import { AppRoute } from '../enums/app-route';
import { IRouter } from '../interfaces/router';
import { localStorageService } from '../services/storage-service';

const returnStartOrLoginPage = async (router: IRouter) => {
  if (localStorageService.getData('userFullName')) {
    const { Start } = await import('../pages/start-page/start');
    return new Start(router);
  }
  const { Login } = await import('../pages/login-page/login');
  return new Login(router);
};

export function createRoutes(router: IRouter) {
  return [
    {
      path: '',
      component: async () => {
        return returnStartOrLoginPage(router);
      },
    },
    {
      path: AppRoute.Login,
      component: async () => {
        return returnStartOrLoginPage(router);
      },
    },
    {
      path: AppRoute.Start,
      component: async () => {
        return returnStartOrLoginPage(router);
      },
    },
    {
      path: AppRoute.Game,
      component: async () => {
        if (localStorageService.getData('userFullName')) {
          const { Game } = await import('../pages/game-page/game');
          return new Game(router);
        }
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
