import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { appendUser } from "../reducers/userReducer";
import { updateBlogComment, updateBlogLikes as updateBlogLikesAction } from '../reducers/bloglistReducer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const BlogDetails = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const [blogInfo, setBlogInfo] = useState(null)
  const [newComment, setNewComment] = useState('')
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

  const addComment = async (event) => {
    event.preventDefault()
    console.log('add comment function')
    if (newComment !== '') {
      const returnedBlog = await blogService.createComment(blogId, { comment: newComment });
      // Update the local state with the new comment
      setBlogInfo((prevBlogInfo) => ({
        ...prevBlogInfo,
        comments: prevBlogInfo.comments.concat(newComment)
      }));
      dispatch(updateBlogComment(returnedBlog));
      setNewComment('')
    } else {
      alert('Enter new comment than click on add comment!')
    }

  }

  return (
    <div>
      <h1>{blogInfo.title}</h1>
      <a href={blogInfo.url} target='_blank'>{blogInfo.url}</a>
      <p>{blogInfo.likes} likes</p>
      <Button variant="contained" onClick={handleBlogLikes}>like</Button>
      <p>Added by {blogInfo.author}</p>
      <h3>Comments</h3>
      <form onSubmit={addComment}>

        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue={newComment}
          variant="filled"
          size="small"
          placeholder="add comment"
          onChange={({ target }) => setNewComment(target.value)}
        />

        <Button type="submit" variant="contained">add Comment</Button>
      </form>
      <ul>
        {blogInfo.comments && blogInfo.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>

    </div>
  )
}

export default BlogDetails
