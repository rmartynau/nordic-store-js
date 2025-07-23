import { Component } from '../../core/Component';
import template from './home.template.hbs';
import { ROUTES } from '../../constants/routes';
import { apiService } from '../../services/Api';

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

  addToCard = (e) => {
    if (e.target.closest(".add-to-cart")) {
      let price = e.target.parentElement.parentElement.dataset.price;
      let name = e.target.parentElement.parentElement.parentElement.dataset.name;
      let img = e.target.parentElement.parentElement.parentElement.dataset.img;
      
      const cartItems = { price, name, img };
      apiService.post("/order", cartItems).then(() => {
        console.log(cartItems);
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
  };

  // onClick = ({ target }) => {
  //   const productCartBtn = target.closest(".add-to-cart");

  //   if (productCartBtn) {
	// 		const { product } = this.state;
  //     const { setItem } = useCartStorage();
  //     setItem(product.id, {
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
	// 			image: product.image,
  //     });
	// 		useToastNotification({
	// 			type: TOAST_TYPE.success,
	// 			message: 'Product In Cart!'
	// 		});
  //   }
  // };

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