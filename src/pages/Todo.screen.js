import axios from "axios";
import { useEffect, useState } from "react"
import { TodoForm } from "../modules/todo/todo.form";


export const TodoScreen = ()=>{
    const [tasks,setTasks] = useState([]);

    useEffect(()=>{
        (async ()=>{
            await loadTasks();
        })();
    },[])

    const createTask = async(task)=>{
       try{
        const res = await axios.post("http://localhost:8081/todo",task);
        await loadTasks();
       }catch(e){
        console.log(e);
       }
    }
    const deleteTask = async (_id)=>{
        try{
            const res = await axios.delete("http://localhost:8081/todo/"+_id);
            await loadTasks();
           }catch(e){
            console.log(e);
           }
    }


    const loadTasks = async ()=>{
        const res = await axios.get('http://localhost:8081/todo');
        setTasks(res.data.data)
    }
return <section>
    <h1>TodoScreen</h1>
    <TodoForm submit={createTask}/>
    {/* <div>
        {tasks.map((v,key)=><h6 key={key}>{v._id}.{v.title}</h6>)}
    </div> */}
    <div className={"tasks-list"}>
            <h2>Tasks List</h2>
        <div className="tasks">
            {tasks.map((v, key) => (
                <div className={"card"} key={key}>
                    <div>{v.title}</div>
                    <p>{v.status}</p>
                    <button>Edit Task</button>
                    <button onClick={()=>deleteTask(v._id)}>Delete Task</button>
                    
                </div>
            ))}
        </div>
    </div> 
</section>
}