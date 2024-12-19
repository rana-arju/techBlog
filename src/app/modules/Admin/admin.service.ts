import AppError from '../../errors/AppError';
import User from '../Auth/auth.schema';
import Blog from '../Blog/blog.schema';

const userBlockByAdmin = async (id: string, userId: string) => {
  // Check if user already exists in the database

  const admin = await User.isUserExistById(id);
  const user = await User.isUserExistById(userId);

  if (!admin || admin.isBlocked || admin?.role !== 'admin') {
    throw new AppError(401, 'Invalid user. You can not blocked any user!');
  }
  if (!user || user.isBlocked) {
    throw new AppError(404, 'User already blocked or not exist');
  }

  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    {
      new: true,
    },
  );

  if (!result) {
    throw new AppError(500, 'Failed to block user');
  }
  return result;
};
const deleteBlogByAdmin = async (
  blogId: string,
  userId: string,
  role: string,
) => {
  // this blog exists or not
  const isBlogExist = await Blog.findById(blogId);
  const user = await User.isUserExistById(userId);

  if (!isBlogExist) {
    throw new AppError(404, 'This blog not exist');
  }

  if (!user || user.isBlocked || role !== 'admin') {
    throw new AppError(404, 'Invalid user. You can not delete any blog posts');
  }

  const result = await Blog.findByIdAndDelete(blogId);

  return result;
};
export const adminService = {
  userBlockByAdmin,
  deleteBlogByAdmin,
};
