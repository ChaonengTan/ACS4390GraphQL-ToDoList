## Queries
getAllTodos
```
{
  getAllTodos {
    name
  }
}
```

addTodo
```
mutation {
  addTodo(name: "Complete the final assessment") {
    name
  }
}
```

getTodo
```
{
  getTodo(id: 1){
    name
  }
}
```

completeTodo
```
mutation {
  completeTodo(id: 1) {
    name
    completed
  }
}
```

getCompletedTodos
Completed
```
{
  getCompletedTodos(type: True) {
    name
    completed
  }
}
```
Incomplete
```
{
  getCompletedTodos(type: False) {
    name
    completed
  }
}
```