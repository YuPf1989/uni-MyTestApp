import Vue from 'vue'
import store from './store/store.js'
import App from './App'

Vue.prototype.$store = store;
Vue.prototype.baseUrl = 'http://47.93.136.56:7011/appInterface/patient/';

Vue.config.productionTip = false;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
