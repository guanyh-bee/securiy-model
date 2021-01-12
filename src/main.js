import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  * as echarts from 'echarts'
import './assets/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL='http://localhost:8080'
axios.interceptors.request.use(config=>{
  if(config.url == '/login'){return config;}else {
    let  token = window.sessionStorage.getItem("token");
    // console.log(config);
    if(token){

      config.headers['token']=token;

      return config;
    }else {
      router.push('/')
    }
  }


},error => {
  return Promise.reject(error)
});
// axios.interceptors.response.use(result=>{
//
//   if(result.config.url=='/login')return result;
//
//   return result
// })

Vue.use(VueAxios, axios)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
