import { Router } from 'express';
import { blogsController } from './blog.controller';
import validationRequest from '../../middleware/validationRequest';
import { blogValidation } from './blog.validation';
import auth from '../../middleware/auth';

const router = Router();

router.post(
  '/',
  auth('admin', 'user'),
  validationRequest(blogValidation.blogCreateValidation),
  blogsController.createBlog,
);
router.patch(
  '/:id',
  auth('user'),
  validationRequest(blogValidation.blogUpdateValidation),
  blogsController.updateBlog,
);

export const blogRouter = router;
