import React, {useState} from 'react'
import { appendUser, removeUser } from '../reducers/userReducer'
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import { useNavigate } from 'react-router-dom';

const LogedInUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successfullMessage, setSuccessfullMessage] = useState(null);

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            window.localStorage.removeItem("loggedBlogUser");
            dispatch(removeUser(null))
            navigate('/login')
            setSuccessfullMessage("User Loged out successfully!");
            setTimeout(() => {
                setSuccessfullMessage(null);
            }, 5000);
        } catch (exception) {
            console.log(exception);
            setErrorMessage("Logout Problem");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <div>
            <Notification message={errorMessage} classname="error" />
            <Notification message={successfullMessage} classname="success" />
            <h2>blogs</h2>
            {user.name} logged in <br />
            <button onClick={handleLogout}>Loged out </button>
        </div>
    )
}

export default LogedInUser
