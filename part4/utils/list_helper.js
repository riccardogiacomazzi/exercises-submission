const _ = require("lodash");

//dummy function that returns 1
const dummy = (blogs) => (blogs = 1);

//list test
const totalLikes = (blogs) => {
  const initialValue = 0;
  const likes = blogs.map((blogs) => blogs.likes);
  const likesSum = likes.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
  return likesSum;
};

//most likes test
const favoriteBlog = (blogs) => {
  if (blogs.length != 0) {
    const mostLikes = blogs.reduce((favorite, blog) => (favorite.likes > blog.likes ? favorite : blog));
    return {
      title: mostLikes.title,
      author: mostLikes.author,
      likes: mostLikes.likes,
    };
  } else {
    return 0;
  }
};

// author with the most blogs
const mostBlogs = (blogs) => {
  if (blogs.length != 0) {
    const blogByAuthor = _.groupBy(blogs, "author");
    const authorMostBlogs = _.maxBy(Object.keys(blogByAuthor), (author) => blogByAuthor[author].length);
    const numberOfBlogs = blogByAuthor[authorMostBlogs].length;
    return {
      author: authorMostBlogs,
      blogs: numberOfBlogs,
    };
  } else {
    return 0;
  }
};

//most likes per author
const mostLikes = (blogs) => {
  if (blogs.length != 0) {
    const blogByAuthor = _.groupBy(blogs, "author");
    const authorMostLikes = _.maxBy(Object.keys(blogByAuthor), (author) => _.sumBy(blogByAuthor[author], "likes"));
    const totalLikesByAuthor = _.sumBy(blogByAuthor[authorMostLikes], "likes");
    return {
      author: authorMostLikes,
      likes: totalLikesByAuthor,
    };
  } else {
    return 0;
  }
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
