import { IBlog } from './blog.interface';
import User from '../Auth/auth.schema';
import AppError from '../../errors/AppError';
import Blog from './blog.schema';

const createBlogPost = async (payload: IBlog) => {
  // Check if user already exists in the database
  const user = await User.findById(payload.author);

  if (!user || user.isBlocked) {
    throw new AppError(404, 'Invalid user. You can not create a blog post');
  }
  const result = await Blog.create(payload);

  if (!result) {
    throw new AppError(500, 'Failed to create blog post');
  }
  return result;
};
const updateBlogPost = async (
  id: string,
  userId: string,
  payload: Partial<IBlog>,
) => {
  // Check if user already exists in the database

  const user = await User.findById(userId);

  if (!user || user.isBlocked) {
    throw new AppError(404, 'Invalid user. You can not update this blog');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(500, 'Failed to create blog post');
  }
  return result;
};

export const blogService = {
  createBlogPost,
  updateBlogPost,
};
