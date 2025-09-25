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

  deleteItem = async ({ target }) => {
    const cartBtnDelete = target.closest(".clear");
    if (cartBtnDelete) {
      let id = target.dataset.id;
      
      await apiService.delete(`/order/${id}`);
      const { data } = await apiService.get("/order");
      const result = mapResponseApiData(data ?? {});
      this.setState({
        ...this.state,
        data: result,
      });
    }
  };

  async init() {
    try {
      const { getUser } = useUserStore();
      const { data } = (await apiService.get("/order"));
      const result = mapResponseApiData(data);
      this.setState({
        ...this.state,
        data: result,
        user: getUser()
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.init();
    this.addEventListener("click", this.deleteItem);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.deleteItem);
  }
}



customElements.define("cart-page", CartPage);
