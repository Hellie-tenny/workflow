import { useState, useEffect } from "react";
const Objective = (props) => {

    const [milestonesOpen, setMilestonesOpen] = useState(false);
    const [completedMilestones, setCompletedMilestones] = useState([]);
    const [completedPercentage, setCompletedMilestonesPercentage] = useState(0);

    function toggleMilestones() {
        setMilestonesOpen(!milestonesOpen);
    }

    useEffect(() => {
        const completedMilestones = props.objective.milestones.filter((milestone) => milestone.done);
        setCompletedMilestones(completedMilestones);
        console.log("These are the completed Milestones", completedMilestones);
        console.log(localStorage.getItem('todos'));
        setCompletedMilestonesPercentage((Number(completedMilestones.length) / Number(props.objective.milestones.length)) * 100);
    }, [props.objective.milestones]);

    return (
        <div className="objective">
            <div className="objective-container">
                <div className="objective-header">

                    <input type="checkbox" checked={props.objective.done} onChange={() => props.updateDone(props.objective.id)} />
                    <span>{props.objective.title}</span>
                </div>
                <div className="objective-controls">
                    <i className="fa-regular fa-plus" onClick={() => props.openMilestonePopup(props.objective.id)}></i>
                    <i className="fa-regular fa-trash-can" onClick={() => props.openPopup(props.objective.id)}></i>
                    <i id="arrow" className={milestonesOpen ? "fa-solid fa-angle-down rotate" : "fa-solid fa-angle-down rotated-back"} onClick={toggleMilestones}></i>
                </div>
            </div>
            <div className="objective-progress">
                <div className="progress-indicator" style={{ width: `${completedPercentage}%` }}></div>
            </div>

            <div className={milestonesOpen ? "milestones open" : "milestones closed"}>
                {
                    props.objective.milestones.map((milestone) => (
                        <div key={milestone.id} className={milestone.done ? "milestone done" : "milestone"}>
                            <div className="left">
                                <input type="checkbox" checked={milestone.done ? "checked" : false} onChange={() => props.milestoneDone(props.objective.id, milestone.id, milestone.done)} />
                                 {milestone.title}
                            </div>

                            <div className="right">
                                <i className="fa-regular fa-trash-can" onClick={() => props.openDeleteMilestonePopup(props.objective.id, milestone.id)}></i>
                            </div>

                            
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default Objective;