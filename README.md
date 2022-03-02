## Queries
getAllTodos
```
{
  getAllTodos {
    name
    completed
    date
    priority
  }
}
```

addTodo
```
mutation {
  addTodo(name: "Complete the final assessment", priority: Normal) {
    name
    completed
    date
    priority
  }
}
```

getTodo
```
{
  getTodo(id: 1){
    name
    completed
    date
    priority
  }
}
```

completeTodo
```
mutation {
  completeTodo(id: 1) {
    name
    completed
    date
    priority
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
    date
    priority
  }
}
```
Incomplete
```
{
  getCompletedTodos(type: False) {
    name
    completed
    date
    priority
  }
}
```

sortByPriority
```
{
  sortByPriority {
    name
    completed
    date
    priority
  }
}
```