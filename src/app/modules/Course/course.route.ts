import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseControllers } from './course.controller';
import { courseValidation } from './course.validation';
// import { courseValidation } from './course.validation';
// import { courseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(courseValidation.createCourseValidationSchemaByZod),
  courseControllers.createCourse,
);
export const courseRoutes = router;
