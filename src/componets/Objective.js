import { useState } from "react";
const Objective = (props) => {

    const [milestonesOpen, setMilestonesOpen] = useState(false);

    function toggleMilestones() {
        setMilestonesOpen(!milestonesOpen);
    }

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
            <div className="progress">
                <div className="progress-indicator" style={{ width: `${100}%` }}></div>
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