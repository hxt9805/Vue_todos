/* 
  数据存储的工具模块
*/

export function saveTodos(key_value) {
  localStorage.setItem('todos_key', JSON.stringify(key_value))
}

export function readTodos() {
  return JSON.parse(localStorage.getItem('todos_key') || "[]")
}