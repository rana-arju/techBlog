import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const registrationUser = catchAsync(async (req, res) => {
  const result = await authServices.registrationUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Login successful',
    data: result,
  });
});

export const userController = {
  registrationUser,
  loginUser,
};
