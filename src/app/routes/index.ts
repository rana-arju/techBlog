import { Router } from 'express';
import { userRoutes } from '../modules/Auth/auth.route';

const router = Router();
const moduleRouter = [
  {
    path: '/auth',
    module: userRoutes,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.module);
});

export default router;
