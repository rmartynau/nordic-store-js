import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';
import { apiService } from '../../services/Api';
// import { useCartStorage } from "../../hooks/useCartStorage";

import "../../components/router-link/router-link.component";

// import { store } from "../../store/Store";
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

//   addToCard = (e) => {
//   const addToCartButton = e.target.closest('.add-to-cart');
//   if (!addToCartButton) return;

//   // Use `closest()` to find the wrapping element that contains all the data
//   const productElement = addToCartButton.closest('[data-img][data-name][data-price]');
//   if (!productElement) {
//     console.warn('Product element not found for clicked button.');
//     return;
//   }

//   const price = productElement.dataset.price;
//   const name = productElement.dataset.name;
//   const img = productElement.dataset.img;

//   const cartItems = { price, name, img };

//   apiService.post('/order', cartItems).then(() => {
//     this.setState({
//       ...this.state,
//       orderCart: this.state.orderCart?.concat(cartItems),
//     });
//     console.log(cartItems);
//   });
//   useToastNotification({
//     message: "Product in the cart!",
//     type: TOAST_TYPE.success,
//   });
// };

  addToCard = (e) => {
    if (e.target.closest(".add-to-cart")) {
      let id = e.target.parentElement.parentElement.dataset.id;
      let price = e.target.parentElement.parentElement.dataset.price;
      let name = e.target.parentElement.parentElement.parentElement.dataset.name;
      let img = e.target.parentElement.parentElement.parentElement.dataset.img;
      
      const cartItems = { price, name, img };

      apiService.post("/order", cartItems).then(() => {
        console.log(id, cartItems);
        this.setState({
          ...this.state,
          orderCart: this.state.orderCart?.concat(cartItems),
        });
      })
      useToastNotification({
        message: "Product in the cart!",
        type: TOAST_TYPE.success,
      });
    }
      // useToastNotification({
      //   message: "This product is already in the cart :)",
      //   type: TOAST_TYPE.info,
      // });
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.setLinks();
    this.getProducts();
    this.addEventListener("click", this.addToCard);
    
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.addToCard);
    this.getProducts();
  }
}

customElements.define('home-page', HomePage);