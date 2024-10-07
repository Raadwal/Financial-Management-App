import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import classes from "../css/MainNavigation.module.css"

const MainNavigation = () => {
    const { setAuth } = useAuth()

    const handleLogout = () => {
        setAuth(null); 
      };
    

    return (
        <header className={classes.header}>
            <div>
                <Link to="savings-goals">Savings Goals</Link>
                <Link to="categories">Categories</Link>
            </div>
            <div>
            <Link to="../login" onClick={handleLogout}>Logout</Link>
            </div>
        </header>
    )
}

export default MainNavigation