import { useEffect, useState } from "react";

export default function Container() {

    const[newTitle, setNewTitle] = useState("");
    const[todos, setTodos] = useState([]);

    function addToList(e) {
        e.preventDefault();

        const newItem = {id: Date.now(), title: newTitle}

        setTodos([...todos, newItem]);
    }

    // useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(todos));
    // }, [todos]);

    return (
        <div className="container">

            <form>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add to list" /> <button onClick={addToList}>ADD</button>
            </form>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}