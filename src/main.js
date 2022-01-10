import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'
import cookie from './plugins/cookie'

createApp(App).use(cookie).use(store).use(router).use(VueAxios, axios).mount('#app')
