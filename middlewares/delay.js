/**
 * Delay middleware
 * Used to simulate delay on each response up to 1 sec (by default).
 * Can be customized by URL query string parameter `delay` (in ms).
 */
module.exports = (req, res, next) => {
  let delay = parseInt(req.query.delay);

  if (!delay) {
    delay = Math.floor((Math.random() * 10)) * 100;
  }

  setTimeout(() => {
    next();
  }, delay);
};
