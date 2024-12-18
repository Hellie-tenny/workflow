import { useEffect, useState } from "react";
import Todolist from "./Todolist";
import Objectives from "./Objectives";

export default function Container() {

    const [newTitle, setNewTitle] = useState("");
    const [todos, setTodos] = useState([]);
    const [targetItem, setTargetItem] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);
    const [completedPercentage, setCompletedPercentage] = useState(0);
    const [page, setPage] = useState("todolist");

    function addToList(e) {
        e.preventDefault();

        if (newTitle !== "") {
            const newItem = { id: Date.now(), title: newTitle, done: false }
            const updatedList = [...todos, newItem];
            setTodos(updatedList);
            localStorage.setItem('todos', JSON.stringify(updatedList));
            setNewTitle("");
        }
    }

    function switchPages(selectedPage) {
        if (page === selectedPage) {
            return;
        } else {
            setPage(selectedPage);
        }
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
        // console.log(JSON.parse(localStorage.getItem('todos')).length);
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
                <span className={page === "todolist" ? "active" : ""} onClick={() => switchPages("todolist")}>To-do List</span><span className={page === "objectives" ? "active" : ""} onClick={() => switchPages("objectives")}>Objectives</span>
            </div>

            {page === "todolist" ?

                <Todolist
                    completedPercentage={completedPercentage}
                    newTitle={newTitle}
                    setNewTitle={setNewTitle}
                    addToList={addToList}
                    todos={todos}
                    updateDone={updateDone}
                    openPopup={openPopup}
                /> :

                page === "objectives" ?

                    <Objectives />

                    : null


            }

        </div>
    );
}