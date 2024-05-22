const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  if (array.length === 0) {
    return 0;
  }
  const reducer = (prev, current) => (prev && prev.likes > current.likes) ? prev : current;
  let obj = array.reduce(reducer);   
  return {title: obj.title, author: obj.author, likes: obj.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};