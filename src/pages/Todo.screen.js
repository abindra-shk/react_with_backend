import axios from "axios";
import { useEffect, useState } from "react"
import { TodoForm } from "../components/modules/todo/todo.form";
import { EditTodoForm } from "../components/modules/todo/edit-todo.form";
import { TaskList } from "../components/modules/todo/TaskList";
import { Nav } from "../components/partials/Nav";
import { useSelector } from "react-redux";
import { loginState } from "../store/user/reducer";

export const TodoScreen = ()=>{
    const [tasks,setTasks] = useState([]);
    const [tasksTodo, setTasksTodo] = useState([]);
    const [tasksInProgress, setTasksInProgress] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);
    const [mode, setMode] = useState('add');
    const [selectedTask, setSelectedTask] = useState({
        _id: '',
        title: '',
        status:''
    });

    const currentState = useSelector(loginState)
    console.log(currentState)

    useEffect(()=>{
        (async ()=>{
            await loadTasks();
            await loadByStatus('InProgress');
            await loadByStatus('Todo');
            await loadByStatus('Done');
        })();
    },[])

    const createTask = async(task)=>{
       try{
        const res = await axios.post("http://localhost:8081/todo",task);
        await loadTasks();

        if(task.status === "Todo"){
            await loadByStatus('Todo');
        } 
        else if (task.status === "InProgress"){
            await loadByStatus('InProgress');
        }
        else if (task.status === "Done"){
            await loadByStatus('Done');
        }
       }catch(e){
        console.log(e);
       }
    }

    const deleteTask = async (_id)=>{
        try{
            const res = await axios.delete("http://localhost:8081/todo/"+_id);
            await loadTasks();
            await loadByStatus('Todo');
            await loadByStatus('InProgress');
            await loadByStatus('Done');
           }catch(e){
            console.log(e);
           }
    }
    const updateTask = async (_id)=>{
        try{
            const res = await axios.put("http://localhost:8081/todo/"+selectedTask._id, selectedTask);
            await loadTasks();
            await loadByStatus('Todo');
            await loadByStatus('InProgress');
            await loadByStatus('Done');
            resetEditForm();
           }catch(e){
            console.log(e);
           }
    }

    const resetEditForm=()=>{
        setSelectedTask({
            _id:'',
            title:'',
            status:''
        })
    }
    const loadTasks = async ()=>{
        const res = await axios.get('http://localhost:8081/todo');
        setTasks(res.data.data)
    }

    const loadSelectedTask =async (id)=>{
        setMode('edit');
        const res = await axios.get("http://localhost:8081/todo/"+id);
        setSelectedTask(res.data.data);
    } 

    const loadByStatus = async (status) => {
        try {
          const res = await axios.get(`http://localhost:8081/todo/status/${status}`);
          if (status === 'Todo') {
            setTasksTodo(res.data.data);
          } else if (status === 'InProgress') {
            setTasksInProgress(res.data.data);
          } else if (status === 'Done') {
            setTasksDone(res.data.data);
          }
          
        } catch (error) {
          console.log(error);
        }
      };
    
    const changeStatus = async (taskId, val) => {
        const options = ['Todo','InProgress','Done'];

        const updatedTasks =tasks.map(task => {
            if(task._id === taskId){
                const currentIndex = options.indexOf(task.status);
                const newIndex = currentIndex + val;
                if (newIndex >= 0 && newIndex < options.length){
                    task.status = options[newIndex];
                    axios.put("http://localhost:8081/todo/"+task._id, task);
                }
            }
            return task;
            
        });
        setTasks(updatedTasks);
        await loadTasks();
        await loadByStatus('Todo');
        await loadByStatus('InProgress');
        await loadByStatus('Done');
        // console.log(updatedTasks)
    }

return <section>
    <Nav/>
    <h1>TodoScreen</h1>
    {mode === 'add' ?
        <TodoForm submit={createTask}/>
    :
        <EditTodoForm selectedTask={selectedTask} setSelectedTask={setSelectedTask} submitForm={updateTask} mode={'add'} setMode={setMode}/>
    }
    <div className="tasks-columns">
        <TaskList tasks={tasksTodo} status={'Todo'} loadSelectedTask={loadSelectedTask} deleteTask={deleteTask} changeStatus={changeStatus} />
        <TaskList tasks={tasksInProgress} status={'InProgress'} loadSelectedTask={loadSelectedTask} deleteTask={deleteTask} changeStatus={changeStatus}/>
        <TaskList tasks={tasksDone} status={'Done'} loadSelectedTask={loadSelectedTask} deleteTask={deleteTask} changeStatus={changeStatus}/>
    </div>
</section>
}