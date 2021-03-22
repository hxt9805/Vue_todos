import Vue from 'vue';
import App from "./App.vue"; //引入自定义组件


import './base.css'

// 创建一个全局的, 用于绑定事件监听和方法事件的对象: Global Event Bus (全局事件总线 )
// 事件总线就是一个vm对象
// 将其挂载到Vue的原型对象上, 所有的组件对象就都可以看到这个事件总线对象
// 所有组件对象的原型对象是一个vm对象, 那么这个这个vm的原型对象就是Vue的原型对象
// Vue原型对象是组件对象的原型的原型链上的对象
// Vue.prototype.$globalEventBus = new Vue();

new Vue({
  beforeCreate(){ // 尽量早地执行挂载全局事件总线对象的操作
    Vue.prototype.$globalEventBus = this
  },
  components: { //注册组件()后面才能写组件标签
    App: App
  },
  template: `<App/>`
}).$mount('#root')