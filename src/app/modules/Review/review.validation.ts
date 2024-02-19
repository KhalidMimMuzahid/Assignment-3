import { z } from 'zod';

const createReviewValidationSchemaByZod = z.object({
  body: z.object({
    courseId: z.string({
      required_error: 'courseId is required',
      invalid_type_error: 'courseId must be a string',
    }),
    rating: z.number({
      required_error: 'rating is required',
      invalid_type_error: 'rating must be a number',
    }),
    review: z.string({
      required_error: 'review is required',
      invalid_type_error: 'review must be a string',
    }),
  }),
});

export const reviewValidation = {
  createReviewValidationSchemaByZod,
};
