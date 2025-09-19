export const successResponse = (res, statusCode = 200,message ="Success", data = {}) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message : message,
    data,
  });
};