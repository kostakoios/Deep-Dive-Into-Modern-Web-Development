import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'
import blogService from '../services/blogs'
import LogedInUser from './LogedInUser'
import { useDispatch } from 'react-redux'
import { appendUser } from "../reducers/userReducer";

const User = () => {
  const dispatch = useDispatch()
  const userId = useParams().id
  const [userInfo, setUserInfo] = useState(null)
  const loggedUserJson = window.localStorage.getItem("loggedBlogUser");

  useEffect(() => {
    console.log('now I am inside of user.jsx: ', blogService.token)
    if (loggedUserJson) { 
                 const user = JSON.parse(loggedUserJson);
        dispatch(appendUser(user))
        usersService.setToken(user.token);
      usersService.getUserData(userId).then(userData => setUserInfo(userData))
     }
  }, [])

  console.log('userInfo: ', userInfo)
  return (
    <div>
      <LogedInUser />

      <h2>{userInfo && userInfo.username}</h2>
      <h3>added blogs</h3>
      <ul>
      {userInfo && userInfo["blogs"].map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User
