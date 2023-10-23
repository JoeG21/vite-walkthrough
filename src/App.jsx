import { useEffect, useState } from 'react'
import './style.css'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'

export default function App() {
  // will re-render the component causing infinite loop 
  // NOTE: Whenever the state/prop update the component re-render!!!
  // setNewItem('dad')
  const [todos, setTodos] = useState(() => {
    const localVal = localStorage.getItem("ITEMS")
    if (localVal == null) return []
    return JSON.parse(localVal)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    /* 
    NOTE: When you have to use the current value
    you need to pass in a function and return
    */
    setTodos((currentTodos) => {
      /* 
      we are keeping the current and adding to it
      then we are assigning 'id', 'title', 'completed' attributes to each todo
      */
      return [
        ...currentTodos, {id: crypto.randomUUID(), title: title, completed: false },
      ]
    })
  }


  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        // simply checking which todo by id
        if (todo.id == id) {
        /* 
        NOTE: Anytime you're updating your state make sure
        you are NOT mutating instead make new state object
        */ 
          return {...todo, completed}
        }
        // if it is not matching the id then simply return the todo w no changes
        return todo
      })
    })
  }

  /* 
  checking every todo id and making sure 
  it don't equal to the id we are trying to delete
  if it does then we are filtering it out
  */ 
  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className='header'> Todo List </h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}