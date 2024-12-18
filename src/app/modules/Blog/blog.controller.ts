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
export const blogsController = {
  createBlog,
};
