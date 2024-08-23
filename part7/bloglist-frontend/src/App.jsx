// import { useState, useEffect } from "react";
// import Blog from "./components/Blog";
// import blogService from "./services/blogs";
// import loginService from "./services/login";
// import usersService from "./services/users";
// import Notification from "./components/Notification";
// import LoginForm from "./components/LoginForm";
// import BlogForm from "./components/BlogForm";
// import Togglable from "./components/Togglable";
// import ShowUsersGeneralInfo from "./components/ShowUsersGeneralInfo"
// import { useDispatch, useSelector } from 'react-redux'
// import { appendBlogList, createBlogList, deleteBlogitem, updateBlogLikes as updateBlogLikesAction } from './reducers/bloglistReducer'
// import { appendUser, removeUser } from './reducers/userReducer'
// import { Routes, Route, Link } from 'react-router-dom'

// const App = () => {
//   const dispatch = useDispatch()
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   // const [user, setUser] = useState(null);
//   const [allUsersData, setAllUsersData] = useState(null)
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [successfullMessage, setSuccessfullMessage] = useState(null);
//   const [loginVisible, setLoginVisible] = useState(false);
//   const blogs = useSelector(state => state.bloglist)
//   const loggedUserJson = window.localStorage.getItem("loggedBlogUser");

//   const user = useSelector(state => state.user)

//   console.log('blogs: ', blogs)
//   console.log('allUsersData: ', allUsersData)
//   useEffect(() => {
//     if (loggedUserJson) {
//       blogService.getAll().then((blogs) => dispatch(appendBlogList(blogs.sort((a, b) => b.likes - a.likes))));
//     }
//   }, [dispatch, loggedUserJson]);

//   useEffect(() => {
//     usersService.getAllusers().then(usersData => setAllUsersData(usersData))
//     if (loggedUserJson) {
//       const user = JSON.parse(loggedUserJson);
//       dispatch(appendUser(user))
//       // setUser(user);
//       blogService.setToken(user.token);
//     }
//   }, []);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const getUser = await loginService.login({ username, password });
//       console.log("getUser: ", getUser);
//       window.localStorage.setItem("loggedBlogUser", JSON.stringify(getUser));
//       dispatch(appendUser(getUser))
//       // setUser(getUser);
//       blogService.setToken(getUser.token);
//       setUsername("");
//       setPassword("");
//       setSuccessfullMessage("User Logedin successfully!");
//       setTimeout(() => {
//         setSuccessfullMessage(null);
//       }, 5000);
//     } catch (exception) {
//       setErrorMessage("wrong credentials");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 5000);
//     }
//   };

//   const updateBlogLikes = async (newObject) => {
//     try {
//       const updatedObject = await blogService.update(newObject.id, newObject);
//       dispatch(updateBlogLikesAction(updatedObject));  // Dispatch the updateBlogLikes action
//       // setBlogs(
//       //   blogs.map((blog) =>
//       //     updatedObject.id !== blog.id ? blog : updatedObject,
//       //   ),
//       // );
//     } catch (err) {
//       setErrorMessage(err, "Wrong credentials");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 5000);
//     }
//   };

//   const removeBlogById = async (blogId) => {
//     try {
//       await blogService.deleteBlog(blogId);
//       dispatch(deleteBlogitem(blogId))
//     } catch (err) {
//       setErrorMessage(err, "Wrong credentials");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 5000);
//     }
//   };

//   const handleLogout = async (event) => {
//     event.preventDefault();
//     try {
//       window.localStorage.removeItem("loggedBlogUser");
//       dispatch(removeUser(null))
//       // setUser(null);
//       setSuccessfullMessage("User Loged out successfully!");
//       setTimeout(() => {
//         setSuccessfullMessage(null);
//       }, 5000);
//     } catch (exception) {
//       console.log(exception);
//       setErrorMessage("Logout Problem");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 5000);
//     }
//   };

//   const addBlog = async (blogObject) => {
//     try {
//       const returnedBlog = await blogService.create(blogObject);
//       dispatch(createBlogList(returnedBlog))
//       setSuccessfullMessage(
//         `A new blog ${returnedBlog.title} by ${returnedBlog.author}`,
//       );
//       setTimeout(() => {
//         setSuccessfullMessage(null);
//       }, 5000);
//     } catch (exception) {
//       console.log(exception);
//       setErrorMessage("Creation blog error");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 15000);
//     }
//   };
//   // console.log("user: ", errorMessage);
//   const loginForm = () => {
//     const hideWhenVisible = { display: loginVisible ? "none" : "" };
//     const showWhenVisible = { display: loginVisible ? "" : "none" };

//     return (
//       <div>
//         <div style={hideWhenVisible}>
//           <button onClick={() => setLoginVisible(true)}>log in</button>
//         </div>
//         <div style={showWhenVisible}>
//           <LoginForm
//             username={username}
//             password={password}
//             handleUsernameChange={({ target }) => setUsername(target.value)}
//             handlePasswordChange={({ target }) => setPassword(target.value)}
//             handleSubmit={handleLogin}
//           />
//           <button onClick={() => setLoginVisible(false)}>cancel</button>
//         </div>
//       </div>
//     );
//   };


//   const showGeneralInfo = () => (
//     <ShowUsersGeneralInfo allUsersData={allUsersData} />
//   )

//   const blogForm = () => (
//     <Togglable buttonLabel="new Blog">
//       <BlogForm createBlog={addBlog} />
//     </Togglable>
//   );

//   const showNotifications = () => (
//     <div>
//       {errorMessage === null ? (
//         <div></div>
//       ) : (
//         <Notification message={errorMessage} classname={"error"} />
//       )}
//       {successfullMessage === null ? (
//         <div></div>
//       ) : (
//         <Notification message={successfullMessage} classname={"success"} />
//       )}
//     </div>
//   )

//   const showBlogList = () => (
//     <div className="blog">
//         {blogs.length > 0 &&
//           blogs
//             .map((blog) => (
//               <Blog
//                 key={blog.id}
//                 blog={blog}
//                 updateBlogLikes={updateBlogLikes}
//                 removeBlogById={removeBlogById}
//               />
//             ))}
//       </div>
//   )

//   if (user === null) {
//     return (
//       <div>
//         <h2>Log in to application</h2>
//         {showNotifications()}
//         {loginForm()}
//       </div>
//     );  
//   }

//   return (
//     <div>
//       {showNotifications()}
//       <h2>blogs</h2>
//       <p>
//         {user.name} logged in <button onClick={handleLogout}>Logout</button>
//       </p>
//       {showGeneralInfo()}
//       {blogForm()}
//       {showBlogList()}
//     </div>
//   );
// };

// export default App;

import { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appendBlogList } from "./reducers/bloglistReducer";
import { appendUser } from "./reducers/userReducer";
import blogService from "./services/blogs";
import Home from "./components/Home";
import Users from "./components/Users";
import Login from "./components/Login";
import User from "./components/User";
import BlogDetails from "./components/BlogDetails";
import LogedInUser from "./components/LogedInUser";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loggedUserJson = window.localStorage.getItem("loggedBlogUser");

  useEffect(() => {
    const fetchData = async () => {
      if (loggedUserJson) {
        const blogs = await blogService.getAll();
        dispatch(appendBlogList(blogs.sort((a, b) => b.likes - a.likes)));

        const user = JSON.parse(loggedUserJson);
        dispatch(appendUser(user));
        blogService.setToken(user.token);
        console.log('token must After set on token: ', user.token)
      }
    };
    fetchData();
  }, [dispatch, loggedUserJson]);
    console.log("userrrrr: ", user)
  return (
    <div>
      <ResponsiveAppBar />
      <h1>Blogs</h1>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={user && user.name ? <Users /> : <Navigate to="/login" />} />
      <Route path="/login" element={user && user.name ? <Navigate to="/users" /> : <Login />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />

      </Routes>
    </div>
  );
};

export default App;
