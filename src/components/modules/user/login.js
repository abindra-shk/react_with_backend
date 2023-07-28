import { useState } from "react";
import { compileStringAsync } from "sass";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginState } from "../../../store/user/reducer";
import { useNavigate } from "react-router";
import { authenticateUser } from "../../../store/user/actions";

export const LoginForm  =(props)=>{
    const [user,setUser] = useState({ username:'',password:''})

    const currentState = useSelector(loginState)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const submitForm=async (e)=>{
        e.preventDefault();
        try{    
            // const res = await axios.post("http://localhost:8081/user/login",user);

            // // console.log(res)
            // dispatch({type: 'SET_USERNAME', payload: res.data.data.username})

            
            // // console.log('res ' , res);
            // localStorage.setItem("username",res.data.data.username);
            // console.log(localStorage.getItem("username"));
            dispatch(authenticateUser(user))
            navigate('/todo')
           }catch(e){
            console.log(e);
           }
    }

    const formHandler=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    return <form className="edit-form" onSubmit={submitForm}>
        <input  type="text" name="username"  placeholder="Enter Username" required onChange={formHandler}/>
        <input type="password" name="password"  placeholder="Enter Password" required onChange={formHandler}/>
        <button type="submit" >Submit</button>
    </form>
}