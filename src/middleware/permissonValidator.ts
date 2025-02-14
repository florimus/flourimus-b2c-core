import { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Middleware to check if the user has the required permission.
 *
 * @param {string} permisson - The permission string to check against the user's permissions.
 * @returns {RequestHandler} - The middleware function to handle the permission validation.
 *
 * @throws {Error} - Throws an error if there is an issue during permission validation.
 */
const hasPermission = (permisson: string): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement permission validation
    const userPermissons = res.locals?.permisson;

    const accessible = userPermissons.includes(permisson);

    if (accessible) {
      return next();
    }

    res.status(403).json({
      error: 'Forbidden: You do not have permission to access this resource',
    });
  };
};

export default hasPermission;
