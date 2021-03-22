<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List 
        :todos="todos" 
        
        
      />
      <Footer 
        :todos="todos" 
        :checkAll="checkAll" 
        :clearCompletedTodos="clearCompletedTodos" 
      >
        <!-- 在父组件中解析好后传入的 -->
        <input type="checkbox" v-model="isCheckAll" slot="left" />
        <span slot="middle">
          <span>已完成 {{completeSize}} </span> / 全部{{todos.length}}
        </span>
        <button slot="right" class="btn btn-danger" v-show="completeSize>0" @click="clearCompletedTodos" >清除已完成任务</button>
      </Footer>
    </div>
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import { saveTodos,readTodos } from "./utils/storageUtils";

import PubSub from 'pubsub-js'



export default { //配置对象
  components:{
    Header,
    Footer,
    List,
  },
  data() {
    return {
      todos:[
        {id:1,title:'A',completed:false},
        {id:2,title:'B',completed:true},
        {id:3,title:'C',completed:false},
      ],
    }
  },
  computed:{
      completeSize () {
        return this.todos.reduce((preTotal,todo)=> preTotal + (todo.completed ? 1 : 0), 0)
        // return this.todos.filter(todo=>todo.completed).length
      },
      isCheckAll:{
        get(){
          
          return this.todos.length === this.completeSize && this.completeSize>0 ? true : false
        },
        set(value){ //当前勾选状态的Boolean值
          this.checkAll(value)
        }
      }
    },
  methods:{
    addTodo(todo){
      this.todos.push(todo)
    },
    deleteTodo(index){
      this.todos.splice(index,1)
    },
    clearCompletedTodos(){
      this.todos = this.todos.filter(todo=>!todo.completed)
    },
    checkAll(isCheckAll){
        this.todos.forEach(todo=>{todo.completed = isCheckAll})
    },
    updateTodo(todo,isCheck){
      todo.completed = isCheck
    }
  },
  watch:{
    todos:{
      deep:true,
      // handler(value){ // value为最新的todos
      //   saveTodos('todos_key',value)
      // }
      handler: saveTodos // 为什么这么写 , 参考仿写Promise里面就用到了
    }
  },
  mounted(){

    //订阅消息
    // 注意这里的回调函数如果写成function的话,当中的this不是当前vm,而是PubSub的this,但是不知道它的this是谁
    // 所以需要用箭头函数, 因为箭头函数没有自己的this, 其this是外层作用域的this
    PubSub.subscribe('updateTodo', (msg,{todo,isCheck}) => {
      this.updateTodo(todo,isCheck)
    });


    // 模拟异步读取数据操作
    setTimeout(() => {
      this.todos = readTodos('todos_key')
    }, 10)

    //通过xxx来绑定事件监听
    this.$globalEventBus.$on('deleteTodo',this.deleteTodo)
  },
  //在组件销毁前, 移除自定义监听
  beforeDestroy(){
    this.$globalEventBus.$off('deleteTodo')
  }
};
</script>


<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>