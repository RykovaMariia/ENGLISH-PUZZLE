import { Login } from './components/login/login';

export class App {
  private login = new Login();

  start() {
    document.body.prepend(this.login.getElement());
  }
}
