import { ROUTES } from "../../constants/routes";
import { Component } from "../../core/Component";
import template from "./cart.template.hbs";
import { apiService } from '../../services/Api';
import { mapResponseApiData } from '../../utils/api';
import { useUserStore } from "../../hooks/useUserStore";

export class CartPage extends Component {
  constructor() {
    super();
    this.template = template({
        routes: ROUTES,
    });
    
    this.state = {
      data: [],
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

  // getProducts = () => {
  //   apiService
  //   .get("/order")
  //   .then(({ data }) => {
  //     this.setState({
  //       ...this.state,
  //       data: mapResponseApiData(data),
  //     });
  //   })
  // };

  deleteItem = async ({ target }) => {
    const cartBtnDelete = target.closest(".clear");
    if (cartBtnDelete) {
      let id = target.parentElement.parentElement.dataset.id;
      console.log(id);
      await apiService.delete(`/order/${id}`);
      const { data } = await apiService.get("/order");
      const result = mapResponseApiData(data ?? {});
      this.setState({
        ...this.state,
        data: result,
      });
    }
  };

  // onClick = ({ target }) => {
  //   const { getUser } = useUserStore()
  //   if (target.closest(".clear")) {
  //     this.toggleIsLoading()
  //     apiService.delete("/order").then(() => {
  //       apiService.get("/order").then(({ data }) => {
  //         this.setState({
  //           ...this.state,
  //           cart: data,
  //           user: getUser()
  //         });
  //       })
  //     });
  //   }
  // };

  async init() {
    try {
      const { getUser } = useUserStore();
      const { data } = (await apiService.get("/order"));
      const result = mapResponseApiData(data);
      this.setState({
        ...this.state,
        user: getUser(),
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // init = async() => {
  //   this.toggleIsLoading()
  //   try {
  //     const { getUser } = useUserStore();
  //     const { data } = await apiService.get("/order");
  //     const result = mapResponseApiData(data);
  //     this.setState({
  //       ...this.state,
  //       user: getUser(),
  //       cart: result,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     this.toggleIsLoading()
  //   }
  // }

  componentDidMount() {
    this.init();
    // this.getProducts();
    this.addEventListener("click", this.deleteItem);
  }

  componentWillUnmount() {
    this.init();
    this.removeEventListener("click", this.deleteItem);
  }
}



customElements.define("cart-page", CartPage);
