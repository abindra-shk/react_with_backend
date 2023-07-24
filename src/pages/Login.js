import { LoginForm } from "../components/modules/user/login"

export const login = ()=> {
    console.log(localStorage.getItem("username"));

    return <section>
        <LoginForm/>
        
    </section>
}