import { useState } from "react";
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Blog = ({ blog, updateBlogLikes, removeBlogById }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: "rgb(99, 118, 221)",
    padding: "2px",
    margin: "0 0 3px 3px",
    cursor: "pointer",
    borderRadius: "6px",
  };

  const handleBlogLikes = () => {
    updateBlogLikes({ ...blog, likes: blog.likes + 1 });
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      console.log("blog id: ", blog.id);
      removeBlogById(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <span className="blogTitle">
        <Link to={`/blogs/${blog.id}`} >
          {blog.title}
        </Link>
      </span>
      <span className="blogAuthor"> {blog.author}</span>
      <Button onClick={() => setVisible(!visible)} variant="contained">   
      {visible ? "hide" : "view"}{" "}
      </Button>

      {visible && (
        <div className="visibleDetails">
          <p>{blog.url}</p>
          <p>
            <span id="bloglikes">{blog.likes}</span>
            <button onClick={handleBlogLikes}>like</button>
          </p>
          <p>{blog.author}</p>
          <button onClick={removeBlog} style={removeButtonStyle}>
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
