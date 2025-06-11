import { Component } from "../../core/Component";
import template from "./not-found.template.hbs";

export class NotFound extends Component {
    constructor() {
        super();
        this.template = template();
        this.state = {}
    }
}

customElements.define("not-found", NotFound);
