import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';
import { apiService } from '../../services/Api';

import "../../components/router-link/router-link.component";

import { useUserStore } from "../../hooks/useUserStore";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { mapResponseApiData } from '../../utils/api';

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template();
    this.state = {
      links: [
       {
         label: "Sign In",
         href: ROUTES.singIn,
       },
       {
        label: "My Cart",
        href: ROUTES.singIn,
      },
      ],

      products: [],
      orderCart: [],
      isLoading: false,
      user: null,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  setLinks = () => {
      const { getUser } = useUserStore();
      if (getUser()) {
        this.setState({
          links: [
            {
              label: "My Cart",
              href: ROUTES.cart,
            },
            {
              label: "LogOut",
              href: ROUTES.logOut,
            },
          ],
        });
      }
  };

  getProducts = () => {
    apiService
    .get("/products")
    .then(({ data }) => {
      this.setState({
        ...this.state,
        products: mapResponseApiData(data),
      });
    })
  };

  addToCard = async ({ target }) => {

    const btn = target.closest('.add-to-cart');
    if (!btn) return;
    
    const { id, price, name, img } = btn.dataset;
  
    if (this.state.orderCart?.some(item => item.id === id)) {
      useToastNotification({ 
        message: 'This Product Already In Cart :)', 
        type: TOAST_TYPE.info });
      return;
    }

    await apiService.patch(`/order/${id}`, { id, price, name, img }).then(() => {
     this.setState({
     ...this.state,
     orderCart: this.state.orderCart?.concat({ id, price, name, img }),
      });
    })
    useToastNotification({ message: 'Product In Cart!', type: TOAST_TYPE.success });
  };


  componentDidMount() {
    this.setLinks();
    this.getProducts();
    this.addEventListener("click", this.addToCard);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.addToCard);
  }
}

customElements.define('home-page', HomePage);