import Route from "route-parser";
import { eventEmitter } from "./EventEmitter";
import { EVENT_TYPES } from "../constants/eventTypes";
import { ROUTES } from "../constants/routes";

export class Router extends HTMLElement {
  constructor() {
    super();
    this.activeRoute = {};
    this.outlet = this.querySelector("app-outlet");
  }

  get routes() {
    return Array.from(this.querySelectorAll("app-route")).map((route) => ({
      path: new Route(route.getAttribute("path")),
      title: route.getAttribute("title"),
      component: route.getAttribute("component"),
    }));
  }

  setDocumentTitle(title) {
    document.title = title || document.title;
  }

  findActiveRoute(url) {
    const activeRoute = this.routes.find((route) => route.path.match(url));
    const params = activeRoute?.path?.match(url);

    return { ...activeRoute, params };
  }

  navigate(url) {
    const matchedRoute = this.findActiveRoute(url);
    if (matchedRoute.component) {
      window.history.pushState(null, "", url);
      this.render(matchedRoute);
    } else {
      window.history.pushState(null, "", ROUTES.notFound);
      this.render(this.routes[this.routes.length - 1]);
    }
  }

  setComponentParams(params, view) {
    for (let key in params) {
      view.setAttribute(key, params[key]);
    }
  }

  render(activeRoute) {
    const { component, title, params } = activeRoute;
    const view = document.createElement(component);
    this.setComponentParams(params, view);
    this.setDocumentTitle(title);
    this.outlet.innerHTML = "";
    this.outlet.append(view);
  }

  onPopState = () => {
    const activeRoute = this.findActiveRoute(window.location.pathname);
    this.render(activeRoute);
  };

  onChangeRoute = (evt) => {
    this.navigate(evt.detail.target);
  };

  connectedCallback() {
    this.navigate(window.location.pathname);
    window.addEventListener("popstate", this.onPopState);
    eventEmitter.on(EVENT_TYPES.changeRoute, this.onChangeRoute);
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this.onPopState);
    eventEmitter.off(EVENT_TYPES.changeRoute, this.onChangeRoute);
  }
}

customElements.define("app-router", Router);
