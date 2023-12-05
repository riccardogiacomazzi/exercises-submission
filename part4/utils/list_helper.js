//dummy function that returns 1
const dummy = (blogs) => (blogs = 1);

//list test
const totalLikes = (blogs) => {
  const initialValue = 0;
  const likes = blogs.map((blogs) => blogs.likes);
  const likesSum = likes.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
  return likesSum;
};

module.exports = {
  dummy,
  totalLikes,
};
