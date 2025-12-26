const successResponse = (res, data, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    timestamp: new Date().toISOString(),
    data,
  });
};

const errorResponse = (
  res,
  message = "Internal Server Error",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
