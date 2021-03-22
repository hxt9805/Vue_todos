<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List 
        :todos="todos" 
        :deleteTodo="deleteTodo" 
        :updateTodo="updateTodo"
      />
      <Footer 
        :todos="todos" 
        :checkAll="checkAll" 
        :clearCompletedTodos="clearCompletedTodos" 
      />
    </div>
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'
import List from './components/List'
import { saveTodos,readTodos } from "./utils/storageUtils";

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
    // 模拟异步读取数据操作
    setTimeout(() => {
      this.todos = readTodos('todos_key')
    }, 10);
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