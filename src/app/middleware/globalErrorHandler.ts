import { ErrorRequestHandler } from 'express';
import { IErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let error: IErrorSources = [
    {
      path: '',
      message: err.message,
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err?.name == 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err.code && err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err.name == 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    error = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    error = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    error = [
      {
        path: '',
        message: err.message,
      },
    ];
  }
  res.status(statusCode).json({
    success: false,
    message,
    error,
    statusCode,
    stack: config.node_env === 'production' ? undefined : err.stack, // Avoid exposing full error details in production
  });
};
