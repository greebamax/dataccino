module.exports = (app) => {
  app.get('/test', (req, res) => {
    res.send({
      statusCode: 200,
    });
  });
};
