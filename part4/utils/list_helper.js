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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
