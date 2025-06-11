import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";


import { authService } from "./services/Auth";
import { useToastNotification } from "./hooks/useToastNotification";
import { useUserStore } from "./hooks/useUserStore";
import { apiService } from "./services/Api";
import { API_URLS } from "./constants/api-urls";

import './core/Router';

import './pages/home/home.component';
import './pages/cart/cart.component';
import './pages/sign-in/sign-in.component';
import './pages/sign-up/sign-up.component';
import './pages/log-out/log-out.component';
import './pages/not-found/not-found.component';

import "./components/toast/toast.components";
import "./components/input/input.component";
import "./components/button/button.component";
import "./components/loader/loader.component";

export class App extends Component {
  constructor() {
      super();
      this.template = template({
          routes: ROUTES,
      });
      this.state = {
          isLoading: false,
      };
  }
  toggleIsLoading = () => {
      this.setState({
        ...this.state,
        isLoading: !this.state.isLoading,
      });
  };
  
  initializeApp = async () => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    try {
      const user = await authService.authorizeUser();
      if (user.uid) {
        const { data } = await apiService.get(`${API_URLS.users}/${user.uid}`);
        setUser({ ...user, userProps: data });
      }
    } catch ({ message }) {
      useToastNotification({ message });
    } finally {
      this.toggleIsLoading();
    }
  };

  componentDidMount() {
    this.initializeApp()
  }
}

customElements.define("my-app", App);
