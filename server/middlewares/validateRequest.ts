import { AnyZodObject, ZodDiscriminatedUnion, ZodDiscriminatedUnionOption, ZodTypeAny, ZodUnion } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validateRequest = (schema: AnyZodObject | ZodUnion<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).json({
        message: 'Incorrect form inputs',
        errors: e.errors,
      });
    }
  };
};

export { validateRequest };
