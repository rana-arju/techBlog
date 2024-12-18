import { Router } from 'express';
import { userRoutes } from '../modules/Auth/auth.route';
import { blogRouter } from '../modules/Blog/blog.route';

const router = Router();
const moduleRouter = [
  {
    path: '/auth',
    module: userRoutes,
  },
  {
    path: '/blogs',
    module: blogRouter,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
