import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successfullMessage, setSuccessfullMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const getUser = await loginService.login({ username, password, })
      console.log('getUser: ', getUser)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(getUser))
      setUser(getUser)
      blogService.setToken(getUser.token)
      setUsername('')
      setPassword('')
      setSuccessfullMessage('User Logedin successfully!')
      setTimeout(() => {
        setSuccessfullMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlogLikes = async (newObject) => {
    try {
      const updatedObject = await blogService.update(newObject.id, newObject)
      setBlogs(blogs.map(blog => updatedObject.id !== blog.id ? blog : updatedObject))
    } catch (err) {
      setErrorMessage(err, 'Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlogById = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.map(blog => blog.id !== blogId))
    } catch (err) {
      setErrorMessage(err, 'Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogUser')
      setUser(null)
      setSuccessfullMessage('User Loged out successfully!')
      setTimeout(() => {
        setSuccessfullMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Logout Problem')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessfullMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author}`)
      setTimeout(() => {
        setSuccessfullMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Creation blog error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 15000)
    }
  }
  console.log('user: ', errorMessage)
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="new Blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage === null ? <div></div> : <Notification message={errorMessage} classname={'error'} />}
        {successfullMessage === null ? <div></div> : <Notification message={successfullMessage} classname={'success'} />}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      {errorMessage === null ? <div></div> : <Notification message={errorMessage} classname={'error'} />}
      {successfullMessage === null ? <div></div> : <Notification message={successfullMessage} classname={'success'} />}

      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      {blogForm()}
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes}  removeBlogById={removeBlogById}/>
      )}
    </div>
  )
}

export default App