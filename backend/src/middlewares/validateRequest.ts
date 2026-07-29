import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

const validateRequest =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction) => {
    console.log("Body:", req.body);

    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;