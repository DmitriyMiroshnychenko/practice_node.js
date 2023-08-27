module.exports = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const stackTrace = error.stack || " ";
  res.status(statusCode).json({ error: error.massage, stackTrace });
};
