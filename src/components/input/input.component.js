import { Component } from "../../core/Component";
import template from "./input.template.hbs";

export class Input extends Component {
  constructor() {
    super();
    this.template = template({
      error: this.getAttribute("error"),
    });
    this.state = {
      type: this.getAttribute("type") ?? "text",
      value: this.getAttribute("value") ?? "",
      placeholder: this.getAttribute("placeholder") ?? "",
      label: this.getAttribute("label"),
      className: this.getAttribute("class-name"),
      name: this.getAttribute("name"),
    };
  }
}

customElements.define("ui-input", Input);
