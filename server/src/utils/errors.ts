import { Response } from 'express';

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: Record<string, string>
): void => {
  const errorResponse: ApiError = {
    success: false,
    message,
  };

  if (errors) {
    errorResponse.errors = errors;
  }

  res.status(statusCode).json(errorResponse);
};

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

