import { useState } from "react";
import { useDispatch } from "react-redux";
import { appendUser } from "../reducers/userReducer";
import loginService from "../services/login";
import LoginForm from "./LoginForm";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import blogService from '../services/blogs';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successfullMessage, setSuccessfullMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const getUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(getUser));
      dispatch(appendUser(getUser));
      blogService.setToken(getUser.token);

      setUsername("");
      setPassword("");
      navigate("/users")
      setSuccessfullMessage("User Logged in successfully!");
      setTimeout(() => {
        setSuccessfullMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} classname="error" />
      <Notification message={successfullMessage} classname="success" />
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;
