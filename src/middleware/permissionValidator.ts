import { NextFunction, Request, RequestHandler, Response } from 'express';
import permissionFile from '@src/auth/permissions.json';

interface Permissions {
  [key: string]: string[];
}

/**
 * Middleware to check if the user has the required permission.
 *
 * @param {string} permission - The permission string to check against the user's permissions.
 * @returns {RequestHandler} - The middleware function to handle the permission validation.
 *
 * @throws {Error} - Throws an error if there is an issue during permission validation.
 */
const hasPermission = (permission: string): RequestHandler => {
  return async (_req: Request, res: Response, next: NextFunction) => {

    if (res.locals.role) {
      const allPermissions: Permissions = permissionFile;
      const userPermissions: string[] = allPermissions[res.locals.role] || [];
      const accessible = userPermissions.includes(permission);
      if (accessible) {
        return next();
      }
    }

    res.status(403).json({
      error: 'Forbidden: You do not have permission to access this resource',
    });
  };
};

export default hasPermission;
