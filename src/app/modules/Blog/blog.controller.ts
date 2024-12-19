import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const author = req?.user?.userId;
  const data = req.body;

  const result = await blogService.createBlogPost({ ...data, author });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Blog created successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req?.user?.userId;
  const result = await blogService.updateBlogPost(id, userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Your blog updated successfully',
    data: result,
  });
});
const deletedBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user as JwtPayload;
  await blogService.deleteBlogPost(id, userId, role);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog deleted successful',
  });
});
const getAlldBlogs = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await blogService.getAllBlogs(query);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blogs fetched successfully',
    data: result,
  });
});
export const blogsController = {
  createBlog,
  updateBlog,
  deletedBlog,
  getAlldBlogs,
};
