import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/ErrorResponse';
import { ZodError } from 'zod';
import { requestValidators } from './interfaces/requestValidators';

export function validateRequest(validators: requestValidators) {
  return async (req: Request, res: Response, next: NextFunction) => {
      try{
          if(validators.body) {
              req.body = await validators.body.parse(req.body);
          }
          if(validators.params) {
              req.params = await validators.params.parse(req.params);
          }
          if(validators.query) {
              req.query = await validators.query.parse(req.query);
          }
          next();
      } catch(error) {
          if(error instanceof ZodError) {
            res.status(422);
          }
          next(error);
      }
  }
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
