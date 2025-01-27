const Todolist = (props) => {


    function closePopup() {
        document.getElementById('deleteDialog-container').classList.remove('active');
    }

    function deleteTodo(id) {
        const updatedTodos = props.todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        props.setTodos(updatedTodos);
    }

    return (
        <div>
            <div className="deleteDialog-container" id="deleteDialog-container" onClick={closePopup}>
                <div className="deleteDialog">
                    Are you sure you want to delete this item?
                    <div>
                        <button onClick={() => deleteTodo(props.targetItem)}>Yes</button><button onClick={closePopup}>NO</button>
                    </div>
                </div>
            </div>

            <div className="progress">
                <div className="progress-indicator" style={{ width: `${props.completedPercentage}%` }}></div>
            </div>

            <form className="main">
                <input type="text" value={props.newTitle} onChange={(e) => props.setNewTitle(e.target.value)} placeholder="Add to list..." /> <button onClick={props.addToList}>ADD</button>
            </form>

            <ul>
                {props.todos.map(todo => (
                    <li key={todo.id} className={todo.done ? "done" : ""} >
                        <div>
                            <input type="checkbox" checked={todo.done} onChange={() => props.updateDone(todo.id)} />
                            {todo.title}
                        </div>
                        <div><i className="fa-regular fa-trash-can" onClick={() => props.openPopup(todo.id)}></i></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todolist;