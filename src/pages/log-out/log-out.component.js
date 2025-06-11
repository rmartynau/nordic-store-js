import { Component } from '../../core/Component';
import template from '../log-out/log-out.template.hbs';
import { ROUTES } from '../../constants/routes';

import { useUserStore } from "../../hooks/useUserStore";
import { TOAST_TYPE } from '../../constants/toast';
import { useNavigate } from '../../hooks/useNavigate';
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";

import "../../components/router-link/router-link.component";

export class logOut extends Component {
    constructor() {
        super();
        this.template = template({
            routes: ROUTES,
        });
        this.state = {
            isLoading: false,
            user: null,
        }
    }

    toggleIsLoading = () => {
        this.setState({
          ...this.state,
          isLoading: !this.state.isLoading,
        });
      };

    logout = () => {
        this.toggleIsLoading()
        const { setUser } = useUserStore();
        authService
        .logOut()
        .then(() => {
          setUser(null);
          useToastNotification({ type: TOAST_TYPE.success, message: 'Success!' });
          useNavigate(ROUTES.home);
        })
    
        .catch((message) => {
          useToastNotification({ message });
        })
        .finally(() => {
          this.toggleIsLoading();
        });
      } 
    
      onClick = ({ target }) => {
        if (target.closest(".logout-btn")) {
          this.logout();
        }
      };

      setUser() {
        const { getUser } = useUserStore();
        this.setState({
          ...this.state,
          user: getUser(),
        });
      }
    
      componentDidMount() {
        this.addEventListener("click", this.onClick);
      }
    
      componentWillUnmount() {
        this.removeEventListener("click", this.onClick);
      }
    
}

customElements.define("logout-page", logOut);