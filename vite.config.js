import { defineConfig } from "vite";
import { handlebars } from "./plugins/handlebars";


export default defineConfig({
    plugins: [handlebars()],
});
