import { useState, useEffect } from "react";

const Objectives = () => {

    const [objectives, setObjectives] = useState([]);
    const [targetItem, setTargetItem] = useState("");
    const [newTitle, setNewTitle] = useState("");

    function closePopup() {
        document.getElementById('deleteDialog-container').classList.remove('active');
    }

    function openPopup(id) {
        document.getElementById('deleteDialog-container').classList.add('active');
        setTargetItem(id);
    }

    function deleteObjective(id) {
        const updatedObjectives = objectives.filter((objective) => objective.id !== id);
        localStorage.setItem('objectives', JSON.stringify(updatedObjectives));
        setObjectives(updatedObjectives);
    }

    function addToList(e) {
        e.preventDefault();

        if (newTitle !== "") {
            const newItem = { id: Date.now(), title: newTitle, done: false }
            const updatedList = [...objectives, newItem];
            setObjectives(updatedList);
            localStorage.setItem('objectives', JSON.stringify(updatedList));
            setNewTitle("");
        }
    }

    function updateDone(id) {
        const updatedObjectives = objectives.map((objective) => objective.id === id ? { ...objective, done: !objective.done } : objective);
        console.log(updatedObjectives);
        localStorage.setItem('objectives', JSON.stringify(updatedObjectives));
        setObjectives(updatedObjectives);
    }

    useEffect(() => {
        if (localStorage.getItem('objectives') != null) {
            setObjectives(JSON.parse(localStorage.getItem('objectives')));
        } else {
            setObjectives([]);
        }
        console.log("This is what is supposed to be the initial useEffect!");
        // console.log(JSON.parse(localStorage.getItem('objectives')).length);
        // localStorage.getItem('todos') ? setTodos(localStorage.getItem('todos')) : setTodos([]);
    }, []);

    return (
        <div className="objectives-container">

            <div className="deleteDialog-container" id="deleteDialog-container" onClick={closePopup}>
                <div className="deleteDialog">
                    Are you sure you want to delete this item?
                    <div>
                        <button onClick={() => deleteObjective(targetItem)}>Yes</button><button onClick={closePopup}>NO</button>
                    </div>
                </div>
            </div>

            <form>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add to list..." /> <button onClick={addToList}>ADD</button>
            </form>

            <ul>
                {objectives.map(objective => (
                    <li key={objective.id} className={objective.done ? "done" : ""} >
                        <div>
                            <input type="checkbox" checked={objective.done} onChange={() => updateDone(objective.id)} />
                            {objective.title}
                        </div>
                        <div><i className="fa-regular fa-trash-can" onClick={() => openPopup(objective.id)}></i></div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Objectives;