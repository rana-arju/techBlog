/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUser {
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistByEmail(email: string): Promise<IUser>;
  isUserExistById(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextpassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}
