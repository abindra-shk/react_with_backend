import { useState } from "react";

export const TodoForm  =(props)=>{
    const [task,setTask] = useState({ title: '', status:'Todo'});
    const submitForm=async (e)=>{
        e.preventDefault();
        await props.submit(task)
    }

    const formHandler=(e)=>{
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }
    return <form className="common-form" onSubmit={submitForm}>
        <input name="title" placeholder="Enter title" required onChange={formHandler}/>
        {/* <input name="status" placeholder="Enter status" required onChange={formHandler}/> */}
        <select type="text" name="status" value={task.status} onChange={formHandler}>
            <option value="Todo">To do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
        </select>
        <button type="submit">Submit</button>
    </form>
}