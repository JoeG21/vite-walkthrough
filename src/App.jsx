import { useState } from 'react'
import './style.css'

export default function App() {
  const [newItem, setNewItem] = useState("")
  // will re-render the component causing infinite loop 
  // NOTE: Whenever the state/prop update the component re-render!!!
  // setNewItem('dad')
  const [todos, setTodos] = useState([])

  /*
  handleSubmit is updating the the todos array
  it's adding to it and keeping the old/current array
  */
  function handleSubmit(e) {
    // so it don't refresh when the event updates
    e.preventDefault()

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
        ...currentTodos, {id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    // we are simply updating the newItem state so it get rids of the current text
    setNewItem("")
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
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'> New Item</label>
          <input value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type='text'
            id='item'
          />
        </div>
        <button className='btn'> Add </button>
      </form>

      <h1 className='header'> Todo List </h1>
      <ul className='list'>
        {/* this is short-circuiting */}
        {todos.length === 0 && 'No Todo'}
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input type='checkbox' checked={todo.completed}
                /* 
                whenever we click on the checkbox the toggleTodo gets call
                then we are passing in the todo ID and checked attribute
                to the toggleTodo fun
                */
                onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              
              <button className='btn btn-danger'
              // passing in function so we can call deleteTodo fun on click
              onClick={() => deleteTodo(todo.id)}
              > 
                Delete 
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}