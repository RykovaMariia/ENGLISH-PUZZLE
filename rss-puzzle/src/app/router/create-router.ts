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

// eslint-disable-next-line max-lines-per-function
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
        const { Game } = await import('../pages/game-page/game');
        return new Game(router);
      },
    },
    {
      path: AppRoute.Results,
      component: async () => {
        const { Results } = await import('../pages/results-page/result-page');
        return new Results(router);
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
