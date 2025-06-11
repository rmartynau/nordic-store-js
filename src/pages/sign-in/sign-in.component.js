import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { extractFormData } from "../../utils/extractFormData";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useUserStore";
import { TOAST_TYPE } from "../../constants/toast";


export class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      errors: {
        email: "",
      },
      isLoading: false,
    };

    this.template = template({
      routes: ROUTES
    });
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  signInUser = (evt) => {
    evt.preventDefault();
    const { setUser } = useUserStore();
    const formData = extractFormData(evt.target);
    this.toggleIsLoading();
    authService
      .signIn(formData.email, formData.password)
      .then((data) => {
        setUser({ ...data.user });
        useToastNotification({
          message: "Success!!!",
          type: TOAST_TYPE.success,
        });
        useNavigate(ROUTES.home);
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.addEventListener("submit", this.signInUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.signInUser);
  }

}

customElements.define("sign-in-page", SignIn);
