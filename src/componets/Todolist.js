const Todolist = (props) => {
    return (
        <div>
            <div className="progress">
                <div className="progress-indicator" style={{ width: `${props.completedPercentage}%` }}></div>
            </div>

            <form>
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