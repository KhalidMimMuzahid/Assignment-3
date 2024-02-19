import express from 'express';
import { categoryRoutes } from '../modules/Category/category.routes';
import { courseRoutes } from '../modules/Course/course.route';
import { reviewRoutes } from '../modules/Review/review.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/categories', route: categoryRoutes },
  {
    path: '/course',
    route: courseRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
