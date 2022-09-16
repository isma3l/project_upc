import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, RequestHandler } from 'express';
import { HttpException } from '@exceptions';

export const validationMiddleware = (
  cls: ClassConstructor<object>,
  field: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return async (req, _res, next) => {
    const obj: object = plainToInstance(cls, req[field as keyof Request]);
    const errors = await validate(obj, {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    });

    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => {
        const constraints = error.constraints;
        return constraints ? Object.values(constraints).join(', ') : '';
      });
      next(new HttpException(400, message.join('. ')));
    } else {
      next();
    }
  };
};
