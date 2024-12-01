import { useState } from "react";

export default function Container() {

    const [todos, setToDos] = useState(
        [
            {
                id: 1,
                title: "Make Money"
            },
            {
                id: 1,
                title: "Make Money"
            },
            {
                id: 1,
                title: "Make Money"
            },
            {
                id: 1,
                title: "Make Money"
            }
        ]
    );


    return (
        <div className="container">

            <form>
                <input type="text" placeholder="Add to list" /> <button>ADD</button>
            </form>

            <ul>
                {todos.map(todo => (
                    <li>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}