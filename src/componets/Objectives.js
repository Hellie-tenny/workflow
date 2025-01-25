import { useState, useEffect } from "react";
import Objective from "./Objective";

const Objectives = () => {

    const [objectives, setObjectives] = useState([]);
    const [targetItem, setTargetItem] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newMilestone, setNewMilestone] = useState("");
    const [targetMilestone, setTargetMilestone] = useState("");
    const [targetObjective, setTargetObjective] = useState("");

    function closePopup() {
        document.getElementById('deleteDialog-container').classList.remove('active');
    }

    function openPopup(id) {
        document.getElementById('deleteDialog-container').classList.add('active');
        setTargetMilestone(id);
        console.log("The delete button has been clicked!!", targetItem);
    }

    function openDeleteMilestonePopup(objectiveId, milestoneId) {
        setTargetObjective(objectiveId);
        setTargetMilestone(milestoneId);

        document.getElementById('deleteMilestoneDialog-container').classList.add('active');
    }

    function deleteObjective(id) {
        const updatedObjectives = objectives.filter((objective) => objective.id !== targetItem);
        localStorage.setItem('objectives', JSON.stringify(updatedObjectives));
        setObjectives(updatedObjectives);
        console.log("Objective deleted", id)
    }

    function addToList(e) {
        e.preventDefault();

        if (newTitle !== "") {
            const newItem = { id: Date.now(), title: newTitle, done: false, milestones: [] }
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

    function openMilestonePopup(id) {
        document.getElementById('addmilestone-dialog-container').classList.add('active');
        setTargetItem(id);
    }

    function closeMilestonePopup() {
        document.getElementById('addmilestone-dialog-container').classList.remove('active');
    }

    function closeDeleteMilestonePopup() {
        document.getElementById('deleteMilestoneDialog-container').classList.remove('active');
    }

    function handleAddMilestone(e) {
        e.preventDefault();

        if (newMilestone !== "") {
            const newMilestoneObj = { id: Date.now(), title: newMilestone, done: false };

            const updatedObjectives = objectives.map((objective) => objective.id === targetItem ? { ...objective, milestones: [...objective.milestones, newMilestoneObj] } : objective);
            localStorage.setItem('objectives', JSON.stringify(updatedObjectives));
            setObjectives(updatedObjectives);
            setNewMilestone("");
        }

    }

    function milestoneDone(objectiveid, milestoneid, doneStatus) {
        const updatedMilestones = objectives.map((objective) => objective.id === objectiveid ? {
            ...objective, milestones: objective.milestones.map((milestone) =>
                milestone.id === milestoneid ? { ...milestone, done: !doneStatus } : milestone)
        } : objective);

        localStorage.setItem('objectives', JSON.stringify(updatedMilestones));
        setObjectives(updatedMilestones);

        console.log(updatedMilestones);
    }

    function deleteMilestone(objectiveId, milestoneId) {
        const updatedMilestones = objectives.map(
            (objective) =>
                objective.id === objectiveId ?
                    {
                        ...objective,
                        milestones: objective.milestones.filter(
                            (milestone) => milestone.id !== milestoneId
                        )
                    } : objective

        );

        // console.log(updatedMilestones);

        localStorage.setItem('objectives', JSON.stringify(updatedMilestones));
        setObjectives(updatedMilestones);
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
                    Are you sure you want to delete this Objective?
                    <div>
                        <button onClick={() => deleteObjective(targetItem)}>Yes</button>
                        <button onClick={closePopup}>NO</button>
                    </div>
                </div>
            </div>

            <div className="deleteMilestoneDialog-container" id="deleteMilestoneDialog-container" onClick={closeDeleteMilestonePopup}>
                <div className="deleteMilestoneDialog">
                    Are you sure you want to delete this Milestone?
                    <div>
                        <button onClick={() => deleteMilestone(targetObjective, targetMilestone)}>Yes</button>
                        <button onClick={closeDeleteMilestonePopup}>NO</button>
                    </div>
                </div>
            </div>

            <div className="addmilestone-dialog-container" id="addmilestone-dialog-container">
                <div className="addmilestone-dialog">
                    <h2>Add Milestone</h2>
                    <div>
                        <form onSubmit={handleAddMilestone}>
                            <input placeholder="Type milestone" value={newMilestone} onChange={(e) => setNewMilestone(e.target.value)} />
                            <div>
                                <button onClick={handleAddMilestone}>Add</button>
                                <button onClick={closeMilestonePopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <form>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add to list..." /> <button onClick={addToList}>ADD</button>
            </form>

            <ul>
                {objectives.map(objective => (
                    <li key={objective.id} className={objective.done ? "done" : ""} >


                        <Objective
                            objective={objective}
                            updateDone={updateDone}
                            openMilestonePopup={openMilestonePopup}
                            openPopup={openPopup}
                            milestoneDone={milestoneDone}
                            openDeleteMilestonePopup={openDeleteMilestonePopup}
                        />


                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Objectives;