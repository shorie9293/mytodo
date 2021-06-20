import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import './assets/sass/style.scss';
import { FontAwesomeIcon } from "@/plugins/font-awesome";

createApp(App)
  .component("fa", FontAwesomeIcon)
  .mount("#app");

