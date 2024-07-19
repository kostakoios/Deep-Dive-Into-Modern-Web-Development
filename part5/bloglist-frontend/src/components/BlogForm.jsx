import React from 'react'

const BlogForm = ({onSubmit, title, titleHandleChange, 
    author, authorHandleChange, url, urlHandleChange}) => {
  return (
    <div>
        <form onSubmit={onSubmit}>
        <div>
        title:
        <input
            type="text"
            value={title}
            name="title"
            onChange={titleHandleChange}
        />
        </div>
        <div>
        author:
        <input
            type="text"
            value={author}
            name="author"
            onChange={authorHandleChange}
        />
        </div>
        <div>
        url:
        <input
            type="text"
            value={url}
            name="url"
            onChange={urlHandleChange}
        />
        </div>
        <button type="submit">create</button>
    </form>
    </div>
  )
}

export default BlogForm