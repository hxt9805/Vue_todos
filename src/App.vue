<template>
  <div>
    <h2> {{title}} </h2>
    <blogs></blogs>
  </div>
</template>

<script>

import Blogs from './components/Blogs.vue'

export default { //配置对象
  name: 'App',
  components:{
    Blogs
  },
  data() {
    return {
      title:'APP组件使用'
    };
  }
};
</script>


<style>
</style>