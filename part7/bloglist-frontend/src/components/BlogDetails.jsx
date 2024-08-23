import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import LogedInUser from './LogedInUser'
import { useDispatch } from 'react-redux'
import { appendUser } from "../reducers/userReducer";
import { updateBlogLikes as updateBlogLikesAction } from '../reducers/bloglistReducer';

const BlogDetails = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const [blogInfo, setBlogInfo] = useState(null)
  const loggedUserJson = window.localStorage.getItem("loggedBlogUser");

  useEffect(() => {
    console.log('now I am inside of user.jsx: ', blogService.token)
    if (loggedUserJson) { 
        const user = JSON.parse(loggedUserJson);
        dispatch(appendUser(user))
        blogService.setToken(user.token);
        blogService.getBlogData(blogId).then(blogData => setBlogInfo(blogData))
     }
  }, [dispatch, blogId, loggedUserJson])

  if (!blogInfo) {
    return null
  }


  const handleBlogLikes = async () => {
    let newObject = { ...blogInfo, likes: blogInfo.likes + 1 }
    const updatedObject = await blogService.update(newObject.id, newObject);
    dispatch(updateBlogLikesAction(updatedObject));
    setBlogInfo(updatedObject); // Update the local state to reflect the new likes count
  };

  return (
    <div>
      <h1>{blogInfo.title}</h1>
      <a href={blogInfo.url} target='_blank'>{blogInfo.url}</a>  
      <p>{blogInfo.likes} likes</p>
      <button onClick={handleBlogLikes}>like</button>
      <p>Added by {blogInfo.author}</p>
      <h3>Comments</h3>
      <ul>
      {blogInfo.comments && blogInfo.comments.map((comment, index) => <li key={index}>{comment}</li> )}
      </ul>
      
    </div>
  )
}

export default BlogDetails
