import Vue from 'vue';
import App from "./App.vue"; //引入自定义组件


import './base.css'



new Vue({
  components: { //注册组件()后面才能写组件标签
    App: App
  },
  template: `<App/>`
}).$mount('#root')