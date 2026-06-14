import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import sanitizeHtml from 'sanitize-html';

/**
 * Recursively sanitizes HTML tags out of strings in payloads.
 */
function sanitizeValue(value: any): any {
  if (typeof value === 'string') {
    return sanitizeHtml(value, {
      allowedTags: [], // Strip all HTML tags globally
      allowedAttributes: {},
    });
  } else if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  } else if (typeof value === 'object' && value !== null) {
    const sanitized: any = {};
    for (const key of Object.keys(value)) {
      sanitized[key] = sanitizeValue(value[key]);
    }
    return sanitized;
  }
  return value;
}

/**
 * Middleware that sanitizes all incoming body properties.
 */
export function sanitizeBody(req: Request, _res: Response, next: NextFunction): void {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  next();
}

/**
 * Middleware that enforces a Zod schema validation on request body,
 * stripping all unexpected properties.
 */
export function validateBody(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // parseAsync strips any unmapped/unexpected fields in the Zod schema
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err: any) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Input validation failed at endpoint boundary',
          details: err.errors,
          status: 400,
        },
      });
    }
  };
}
