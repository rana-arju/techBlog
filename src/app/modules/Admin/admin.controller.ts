import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';

const userBlocked = catchAsync(async (req, res) => {
  const id = req?.user?.userId;
  const { userId } = req.params;

  await adminService.userBlockByAdmin(id, userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User blocked successfully',
  });
});
const deletedBlogByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user as JwtPayload;
  await adminService.deleteBlogByAdmin(id, userId, role);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog deleted successfully',
  });
});
export const adminController = {
  userBlocked,
  deletedBlogByAdmin,
};
