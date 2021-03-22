<template>
  <div>
    <h2>Blog列表</h2>
    <ul>
      <blog v-for="blog in blogs" :key="blog.id" :blog="blog"></blog>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Blog from './Bolg'
  export default {
    components: {
      Blog
    },
    data() {
      return {
        blogs: [
          {id:123,title:'hxt'},
          {id:234,title:'lmr'},
          {id:345,title:'rt'},
        ]
      }
    },
  }
</script>

<style scoped>
/* scoped: 限定当前组件的样式只对当前组件有效,对外部和内部的其它组件无效 */
  h2{
    color: skyblue;
    font-size: 40px;
  }

</style>
