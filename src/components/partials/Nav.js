
import { Link } from "react-router-dom"
import { useSelector} from "react-redux";
import { loginState } from "../../store/user/reducer";

export const Nav = (props) => {
    // const count = useSelector(state=>state.countReducer.count);
    const currentState = useSelector(loginState)
    return<>
        <nav>

            <div className="nav-items">
                <div className="search">
                    <div>
                        <i className="material-icons">search</i>
                    </div>
                    <input type="text" placeholder={"Quick search"} onChange={props.changeKeyword}/>
                </div>
                <div className="nav-item"><Link to="/home">{currentState.username}</Link></div>


            </div>
            
        </nav>
        </>
}