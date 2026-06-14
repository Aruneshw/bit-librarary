import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

export function authorize(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const role = req.userRole;

    if (!role) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN_ROLE',
          message: 'Access denied: Role identifier missing',
          status: 403,
        },
      });
      return;
    }

    if (!allowedRoles.includes(role)) {
      res.status(403).json({
        error: {
          code: 'FORBIDDEN_ROLE',
          message: 'Access denied: Insufficient privileges',
          status: 403,
        },
      });
      return;
    }

    next();
  };
}
