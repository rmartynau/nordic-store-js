import { Component } from "../../core/Component";
import template from "./loader.template.hbs";

export class Loader extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      isLoading: JSON.parse(this.getAttribute("loading")),
      className: this.getAttribute("class-name"),
    };
  }
}

customElements.define("ui-loader", Loader);
