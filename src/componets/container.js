import { useEffect, useState } from "react";

export default function Container() {

    localStorage.

    const[newTitle, setNewTitle] = useState("");

    function addToList(e) {
        e.preventDefault();

        const newItem = {id: Date.now(), title: newTitle}

        setToDos([...todos, newItem]);
    }

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

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