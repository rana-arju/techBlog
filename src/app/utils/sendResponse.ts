import { Response } from 'express';

const sendResponse = <T>(
  res: Response,
  data: {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: T;
  },
) => {
  res.status(data.statusCode).json({
    message: data.message,
    data: data.data,
    success: data.success,
  });
};

export default sendResponse;
