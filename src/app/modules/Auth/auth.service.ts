import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from './auth.interface';
import User from './auth.schema';
import { createToken } from './auth.utils';

const registrationUserIntoDB = async (userData: IUser): Promise<IUser> => {
  // Check if user already exists in the database
  const user = await User.isUserExistByEmail(userData.email);

  if (user) {
    throw new Error('User already exists.');
  }
  const result = await User.create(userData);
  return result;
};
const loginUser = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (
    !(await User.isUserExistByEmail(payload?.email)) ||
    !(await User.isPasswordMatched(
      payload?.password,
      user?.password as string,
    )) ||
    user?.isBlocked
  ) {
    throw new AppError(401, 'Invalid credentials');
  }

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.token as string,
    config.token_time as string,
  );

  return { token: accessToken };
};
export const authServices = {
  registrationUserIntoDB,
  loginUser,
};
