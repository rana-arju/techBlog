import { Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExistByEmail(email: string): Promise<IUser>;
}