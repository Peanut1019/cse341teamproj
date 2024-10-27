function errorHandler(error, req, res, next) {
  const status = error.status || 500;
  const message =
    status === 500
      ? "Internal Server Error"
      : error.message || "An unexpected error occurred.";

  res.status(status).json({
    error: {
      message: message,
      status: status,
    },
  });
}

module.exports = errorHandler;
