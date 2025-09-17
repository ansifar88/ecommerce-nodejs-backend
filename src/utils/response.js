export const successResponse = (res, statusCode = 200, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message :"Success",
    data,
  });
};