import { useEffect, useState } from "react";

export default function Container() {

    const[newTitle, setNewTitle] = useState("");
    const[todos, setTodos] = useState([]);

    function addToList(e) {
        e.preventDefault();

        const newItem = {id: Date.now(), title: newTitle, done: false}
        const updatedList = [...todos, newItem];
        setTodos(updatedList);
        localStorage.setItem('todos', JSON.stringify(updatedList));
    }

    function updateDone(id){
        const updatedTodos = todos.map((todo) => todo.id === id ? {...todo, done: !todo.done} : todo);
        console.log(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
    }

    useEffect(() => {
        if (localStorage.getItem('todos') != null) {
            setTodos(JSON.parse(localStorage.getItem('todos')));
        } else {
            setTodos([]);
        }
        console.log("This is what is supposed to be the initial useEffect!")
        // localStorage.getItem('todos') ? setTodos(localStorage.getItem('todos')) : setTodos([]);
    }, []);

    useEffect(() => {
        console.log(localStorage.getItem('todos'));
    }, [todos]);

    return (
        <div className="container">

            <form>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add to list..." /> <button onClick={addToList}>ADD</button>
            </form>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.done ? "done" : ""} >
                        <div>
                            <input type="checkbox" checked={todo.done} onChange={() =>updateDone(todo.id)} />
                            {todo.title}
                        </div>
                        <div><i class="fa-regular fa-trash-can"></i></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}