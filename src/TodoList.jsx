import { TodoItems } from "./TodoItems"

export function TodoList({ todos, toggleTodo, deleteTodo }) {

    return (
        <>
            <ul className='list'>
                {/* this is short-circuiting */}
                {todos.length === 0 && 'No Todo'}
                {todos.map(todo => {
                    return (
                        <TodoItems {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
                        // id={todo.id} 
                        // completed={todo.completed} 
                        // title={todo.title} 
                        // key={todo.id}/>
                    )
                })}
            </ul>
        </>
    )
}