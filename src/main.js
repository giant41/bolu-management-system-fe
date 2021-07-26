import {createApp} from 'vue'
import router from './router'
import App from './App.vue'
import './axios'
import store from './vuex'
import Swal from "./useSwal";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Swal);
app.mount('#app')

