import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import User from '../modules/Auth/auth.schema';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'You are unauthorized to access');
    }

    // if token is valid check
    const decoded = jwt.verify(token, config?.token as string) as JwtPayload;

    const { role, userId } = decoded;
    const user = await User.isUserExistById(userId);

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    //checking is user already bloecked or not
    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(403, 'User already blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(403, 'You are not authorized to access this resource');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
