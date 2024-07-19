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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
      console.log('now I am here inside: ', exception)
      setErrorMessage('Wrong username or password')
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

  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const newObject = { title, author, url }
      const returnedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(returnedBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setSuccessfullMessage(`A new blog ${title} by ${author}`)
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
      <BlogForm
        onSubmit={handleBlog}
        title={title}
        titleHandleChange={({ target }) => setTitle(target.value)}
        author={author}
        authorHandleChange={({ target }) => setAuthor(target.value)}
        url={url}
        urlHandleChange={({ target }) => setUrl(target.value)}
      />
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App