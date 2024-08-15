import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

test("renders content", () => {
  const blog = {
    title: "My new Book!",
    author: "koutinio",
  };

  const { container } = render(<Blog blog={blog} />);

  const blogTitle = container.querySelector(".blogTitle");
  screen.debug(blogTitle);

  const blogAuthor = container.querySelector(".blogAuthor");
  screen.debug(blogAuthor);

  expect(blogTitle).toHaveTextContent("My new Book!");
  expect(blogAuthor).toHaveTextContent("koutinio");
});

test(`clicking the button shows the blog's URL and number of likes`, async () => {
  const blog = {
    title: "My new Book!",
    author: "koutinio",
    url: "http://google.com",
    likes: 10,
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const urlElement = screen.getByText("http://google.com");
  const likesElement = screen.getByText("10");

  expect(urlElement).toBeDefined();
  expect(likesElement).toBeDefined();
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "My new Book!",
    author: "koutinio",
    url: "http://google.com",
    likes: 10,
  };

  const mockUpdateBlogLikes = vi.fn();

  render(<Blog blog={blog} updateBlogLikes={mockUpdateBlogLikes} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockUpdateBlogLikes).toHaveBeenCalledTimes(2);
});

test("<BlogForm /> calls the event handler with correct details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText("Title");
  const inputAuthor = screen.getByPlaceholderText("Author");
  const inputUrl = screen.getByPlaceholderText("Url");
  const createButton = screen.getByText("create");

  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "Jamson Arnautovich");
  await user.type(inputUrl, "http://www.hello.com");

  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("Jamson Arnautovich");
  expect(createBlog.mock.calls[0][0].url).toBe("http://www.hello.com");
});
