/**
 * Delay middleware
 * Used to simulate up to 1 sec delay on each response.
 */
module.exports = (req, res, next) => {
  const delay = Math.floor((Math.random() * 10)) * 100;
  setTimeout(() => {
    next();
  }, delay);
};
