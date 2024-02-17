import { z } from 'zod';

const createCategoryValidationSchemaByZod = z.object({
  body: z.object({
    name: z.string(),
  }),
});

const updateCategoryValidationSchemaByZod = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});

export const categoryValidation = {
  createCategoryValidationSchemaByZod,
  updateCategoryValidationSchemaByZod,
};
