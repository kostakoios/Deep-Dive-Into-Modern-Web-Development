import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders content', () => {
    const blog = {
        title: 'My new Book!',
        author: 'koutinio'
    }

    const { container } = render(<Blog blog={blog} />)

    const blogTitle = container.querySelector('.blogTitle')
    screen.debug(blogTitle)

    const blogAuthor = container.querySelector('.blogAuthor')
    screen.debug(blogAuthor)

    expect(blogTitle).toHaveTextContent('My new Book!')
    expect(blogAuthor).toHaveTextContent('koutinio')

})


test(`clicking the button shows the blog's URL and number of likes`, async () => {
    const blog = {
        title: 'My new Book!',
        author: 'koutinio',
        url: 'http://google.com',
        likes: 10
    }

    render(
      <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.getByText('http://google.com')
    const likesElement = screen.getByText('10')

    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
  })