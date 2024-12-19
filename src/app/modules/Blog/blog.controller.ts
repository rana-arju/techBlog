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
export const blogsController = {
  createBlog,
  updateBlog,
};
