import { useSelector, useDispatch } from "react-redux";
import Blog from "./Blog";
import { createBlogList, deleteBlogitem, updateBlogLikes as updateBlogLikesAction } from "../reducers/bloglistReducer";
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

const Home = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.bloglist)
    console.log('blogsssssssssssssss: ', blogs)

    const updateBlogLikes = async (newObject) => {
        const updatedObject = await blogService.update(newObject.id, newObject);
        dispatch(updateBlogLikesAction(updatedObject));
    };

    const removeBlogById = async (blogId) => {
        await blogService.deleteBlog(blogId);
        dispatch(deleteBlogitem(blogId));
    };

    const addBlog = async (blogObject) => {
        const returnedBlog = await blogService.create(blogObject);
        dispatch(createBlogList(returnedBlog));
    };

    return (
        <div>
            <Togglable buttonLabel="new Blog">
                <BlogForm createBlog={addBlog} />
            </Togglable>
            <div className="blog">
                {blogs && blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} removeBlogById={removeBlogById} />
                ))}
            </div>
        </div>
    );
};

export default Home;
