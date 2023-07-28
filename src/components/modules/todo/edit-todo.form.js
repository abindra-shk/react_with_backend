import { useState } from "react";

export const EditTodoForm  =(props)=>{
    console.log(props)
    const submitForm=async (e)=>{
        e.preventDefault();
        await props.submitForm(props.selectedTask)
        props.setMode('add');
    }

    const formHandler=(e)=>{
        props.setSelectedTask({
            ...props.selectedTask,
            [e.target.name]: e.target.value
        })
    }
    return <form className="common-form" onSubmit={submitForm}>
        <input value={props.selectedTask._id} name="_id" placeholder="Enter id" disabled required onChange={formHandler}/>
        <input value={props.selectedTask.title} name="title" placeholder="Enter title" required onChange={formHandler}/>
        
        <select type="text" name="status" value={props.selectedTask.status} onChange={formHandler}>
            <option value="Todo">To do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
        </select>
        <button type="submit" disabled={props.selectedTask.id ===''}>Submit</button>
    </form>
}