import { Router } from 'express';
import auth from '../../middleware/auth';
import { adminController } from './admin.controller';

const router = Router();


router.delete(
  '/blogs/:id',
  auth('admin'),
 adminController.deletedBlogByAdmin
);
router.patch(
  '/:userId/block',
  auth('admin'),
 adminController.userBlocked
);

export const adminRouter = router;
