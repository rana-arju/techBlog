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
  const isBlogExist = await Blog.findById(id);
  if (!user || user.isBlocked) {
    throw new AppError(404, 'Invalid user. You can not update this blog');
  }
  const author = isBlogExist?.author;
  if (author?.toString() !== userId) {
    throw new AppError(403, 'You can not update this blog');
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(500, 'Failed to update blog post');
  }
  return result;
};
const deleteBlogPost = async (id: string, userId: string, role: string) => {
  // this blog exists or not
  const isBlogExist = await Blog.findById(id);
  const user = await User.findById(userId);

  if (!isBlogExist) {
    throw new AppError(404, 'This blog post not exist');
  }

  if (!user || user.isBlocked) {
    throw new AppError(404, 'Invalid user. You can not update this blog');
  }
  // Check if user already exists in the database
  if (role === 'admin') {
    const result = await Blog.findByIdAndDelete(id);
    console.log('result admin', result);
    return result;
  }
  if (isBlogExist.author.toString() !== userId) {
    throw new AppError(403, 'You can not delete this blog');
  }
  const result = await Blog.findByIdAndDelete(id);
  console.log('result', result);

  return result;
};

export const blogService = {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
