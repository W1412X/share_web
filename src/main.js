// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
const vuetify = createVuetify({
  components,
  directives,
})
const app=createApp(App);
app.provide(store);
app.use(router)
  .use(vuetify)
  .use(store)
  .mount('#app');