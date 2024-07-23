import { render, screen } from '@testing-library/react'
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