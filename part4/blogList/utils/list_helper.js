// Load the full build.
const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return array.length === 0 ? 0 : array.length === 1 ? array[0].likes : array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  if (array.length === 0) {
    return 0;
  }
  const reducer = (prev, current) => (prev && prev.likes > current.likes) ? prev : current;
  let obj = array.reduce(reducer);   
  return {title: obj.title, author: obj.author, likes: obj.likes}
}

const mostBlogs = (array) => {
  if (array.length === 0) {
    return 0;
  }
  const authors = {};
  array.forEach(el => {
    if (authors.hasOwnProperty(el.author)) {
      authors[el.author] = authors[el.author] + 1; 
    } else {
      console.log("author name:", el.author);
      authors[el.author] = 1;
    }
  })
  const finalResult = Object.entries(authors).reduce((a, b) => authors[a] > authors[b] ? a : b);
  return {author: finalResult[0], blogs: finalResult[1]};
} 

const mostBlogsByLodash = (array) => {
   // Flatten the blogs from each user
   const blogs = _.flatMap(array, user => user.blogs);

   // Count the number of blogs for each author
   const authorCounts = _.countBy(blogs, 'author');
 
   // Find the author with the maximum number of blogs
   const topAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);
 
   return {
     author: topAuthor,
     blogs: authorCounts[topAuthor]
   };
}
const mostLikes = (array) => {
  if (array.length === 0) {
    return 0;
  }
  const reducer = (prev, current) => (prev && prev.likes > current.likes) ? prev : current;
  let obj = array.reduce(reducer);   
  return {author: obj.author, likes: obj.likes};
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  mostBlogsByLodash
};