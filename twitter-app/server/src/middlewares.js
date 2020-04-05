const emoji = require('node-emoji')

const notFound = ((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

const errorHandling = ((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? emoji.random() : error.stack,
    emoji: emoji.random()
  });
});

module.exports = {
  notFound,
  errorHandling
}