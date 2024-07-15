import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const getUser = await loginService.login({username, password,})
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
    } catch(exception) {
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
    } catch(exception) {
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
      const newObject = {title, author, url }
      const returnedBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(returnedBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setSuccessfullMessage(`A new blog ${title} by ${author}`)
      setTimeout(() => {
        setSuccessfullMessage(null)
      }, 5000)
    } catch(exception) {
      console.log(exception)
      setErrorMessage('Creation blog error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 15000)
    }
  }
  console.log('user: ', errorMessage)
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={handleBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: 
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: 
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage === null ? <div></div> : <Notification message={errorMessage} classname={'error'}/>}
        {successfullMessage === null ? <div></div> : <Notification message={successfullMessage} classname={'success'} />}  
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      {errorMessage === null ? <div></div> : <Notification message={errorMessage} classname={'error'}/>}
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