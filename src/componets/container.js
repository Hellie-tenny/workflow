import { useEffect, useState } from "react";

export default function Container() {

    const[newTitle, setNewTitle] = useState("");
    const[todos, setTodos] = useState([]);

    function addToList(e) {
        e.preventDefault();

        const newItem = {id: Date.now(), title: newTitle}
        const updatedList = [...todos, newItem];
        setTodos(updatedList);
        localStorage.setItem('todos', JSON.stringify(updatedList));
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