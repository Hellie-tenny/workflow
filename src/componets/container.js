import { useEffect, useState } from "react";

export default function Container() {

    const [newTitle, setNewTitle] = useState("");
    const [todos, setTodos] = useState([]);
    const [targetItem, setTargetItem] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);
    const [completedPercentage, setCompletedPercentage] = useState(0);

    function addToList(e) {
        e.preventDefault();

        const newItem = { id: Date.now(), title: newTitle, done: false }
        const updatedList = [...todos, newItem];
        setTodos(updatedList);
        localStorage.setItem('todos', JSON.stringify(updatedList));
        setNewTitle("");
    }

    function deleteTodo(id) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
    }

    function closePopup() {
        document.getElementById('deleteDialog-container').classList.remove('active');
    }

    function openPopup(id) {
        document.getElementById('deleteDialog-container').classList.add('active');
        setTargetItem(id);
    }

    function updateDone(id) {
        const updatedTodos = todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo);
        console.log(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
    }

    //just testing if my auto save is on  

    useEffect(() => {
        if (localStorage.getItem('todos') != null) {
            setTodos(JSON.parse(localStorage.getItem('todos')));
        } else {
            setTodos([]);
        }
        console.log("This is what is supposed to be the initial useEffect!");
        console.log(JSON.parse(localStorage.getItem('todos')).length);
        // localStorage.getItem('todos') ? setTodos(localStorage.getItem('todos')) : setTodos([]);
    }, []);

    useEffect(() => {
        const completed = todos.filter((todo) => todo.done);
        setCompletedTodos(completed);
        console.log("These are the completed todos", completedTodos);
        console.log(localStorage.getItem('todos'));
        setCompletedPercentage((Number(completed.length) / Number(todos.length)) * 100);
    }, [todos]);

    return (
        <div className="container">

            <div className="deleteDialog-container" id="deleteDialog-container" onClick={closePopup}>
                <div className="deleteDialog">
                    Are you sure you want to delete this item?
                    <div>
                        <button onClick={() => deleteTodo(targetItem)}>Yes</button><button onClick={closePopup}>NO</button>
                    </div>
                </div>
            </div>

            <div className="menu">
                <span className="active">To-do List</span><span>Objectives</span>
            </div>

            <div className="progress">
                <div className="progress-indicator" style={{ width: `${completedPercentage}%` }}></div>
            </div>

            <form>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add to list..." /> <button onClick={addToList}>ADD</button>
            </form>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.done ? "done" : ""} >
                        <div>
                            <input type="checkbox" checked={todo.done} onChange={() => updateDone(todo.id)} />
                            {todo.title}
                        </div>
                        <div><i className="fa-regular fa-trash-can" onClick={() => openPopup(todo.id)}></i></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}