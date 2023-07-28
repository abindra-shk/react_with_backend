export const TaskList = (props) =>{
    const isTodo = props.status === 'Todo';
    const isCompleted = props.status === 'Done';

    return <>
        <div className={"tasks-list"}>
            <h2>{props.status}</h2>
            <div className="tasks">
                {props.tasks.map((v, key) => (
                    <div className={"card"} key={key}>
                        <div>{v.title}</div>
                        <p>{v.status}</p>
                       {console.log(v)}
                        <div className="button-area">
                            <button onClick={()=>props.loadSelectedTask(v._id)}>Edit Task</button>
                            <button onClick={()=>props.deleteTask(v._id)}>Delete Task</button>
                            {!isTodo && <i className="material-icons" onClick={()=>props.changeStatus(v._id,-1)} >chevron_left</i>}
                            {!isCompleted && <i className="material-icons" onClick={()=>props.changeStatus(v._id,1)} >chevron_right</i>}
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    </>
}