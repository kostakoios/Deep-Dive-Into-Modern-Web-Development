import { useEffect, useState } from "react";
import usersService from "../services/users";
import blogService from "../services/blogs";
import ShowUsersGeneralInfo from "./ShowUsersGeneralInfo";
import LogedInUser from "./LogedInUser";
import { useDispatch } from "react-redux";
import { appendUser } from "../reducers/userReducer";


const Users = () => {
    const dispatch = useDispatch();
    const [allUsersData, setAllUsersData] = useState(null);
    const loggedUserJson = window.localStorage.getItem("loggedBlogUser");

    useEffect(() => {
        if (loggedUserJson) {
            const user = JSON.parse(loggedUserJson);
            dispatch(appendUser(user))
            blogService.setToken(user.token);
            usersService.setToken(user.token);
            // blogService.getAll().then((blogs) => dispatch(appendBlogList(blogs.sort((a, b) => b.likes - a.likes))));
        }
        const fetchUsers = async () => {
            const usersData = await usersService.getAllusers();
            setAllUsersData(usersData);
        };
        fetchUsers();
    }, []);
    console.log('token inside of users.jsx is: ', blogService.token)
    return (
    <div>
        <LogedInUser />
        <ShowUsersGeneralInfo allUsersData={allUsersData} />
    </div>

    )
};

export default Users;
