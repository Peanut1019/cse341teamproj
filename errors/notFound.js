const createError = require("http-errors");

function notFound(req, res, next) {
  const error = createError(404, `URL "${req.originalUrl}" was not found`);
  return next(error);
}

module.exports = { notFound };
