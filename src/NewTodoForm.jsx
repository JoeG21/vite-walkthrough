import { useState } from "react"

export function NewTodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState("")

  /*
  handleSubmit is updating the the todos array
  it's adding to it and keeping the old/current array
  */
  function handleSubmit(e) {
    // so it don't refresh when the event updates
    e.preventDefault()
    if (newItem === "") return 

    addTodo(newItem)

    // we are simply updating the newItem state so it get rids of the current text
    setNewItem("")
  }


    return (
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
    )
}