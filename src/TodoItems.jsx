export function TodoItems({ completed, id, title, toggleTodo, deleteTodo }) {
    return (
        <li>
            <label>
                <input type='checkbox' checked={completed}
                /* 
                whenever we click on the checkbox the toggleTodo gets call
                then we are passing in the todo ID and checked attribute
                to the toggleTodo fun
                */
                onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
            </label>

            <button className='btn btn-danger'
            // passing in function so we can call deleteTodo fun on click
            onClick={() => deleteTodo(id)}
            >
                Delete
            </button>
        </li>
    )
}