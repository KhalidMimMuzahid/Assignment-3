import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryControllers } from './category.controller';
import { categoryValidation } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(categoryValidation.createCategoryValidationSchemaByZod),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategory);
export const categoryRoutes = router;
