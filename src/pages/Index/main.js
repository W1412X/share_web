import { createApp } from "vue";
import '@mdi/font/css/materialdesignicons.min.css';
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// Components
import App from "./App.vue";
import router from "../../router";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(vuetify)
  .use(router)
  .mount("#app");