import { IUser } from './auth.interface';
import User from './auth.schema';

const registrationUserIntoDB = async (userData: IUser): Promise<IUser> => {
  // Check if user already exists in the database
  const user = await User.isUserExistByEmail(userData.email);

  if (user) {
    throw new Error('User already exists.');
  }
  const result = await User.create(userData);
  return result;
};

export const authServices = {
  registrationUserIntoDB,
};
