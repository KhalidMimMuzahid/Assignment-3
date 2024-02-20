import { z } from 'zod';

const createCourseValidationSchemaByZod = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    }),
    instructor: z.string(),
    categoryId: z.string({
      required_error: 'categoryId is required',
      invalid_type_error: 'categoryId must be a string',
    }),
    price: z.number(),
    tags: z.array(
      z.object({
        name: z.string(),
        isDeleted: z.boolean().default(false),
      }),
    ),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: z.object({
      level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      description: z.string(),
    }),
  }),
});


const updateCourseValidationSchemaByZod = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title is required',
        invalid_type_error: 'title must be a string',
      })
      .optional(),
    instructor: z.string().optional(),
    categoryId: z
      .string({
        required_error: 'categoryId is required',
        invalid_type_error: 'categoryId must be a string',
      })
      .optional(),
    price: z.number().optional(),
    tags: z
      .array(
        z.object({
          name: z.string(),
          isDeleted: z.boolean().default(false),
        }),
      )
      .optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: z
      .object({
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const courseValidation = {
  createCourseValidationSchemaByZod,
  updateCourseValidationSchemaByZod,
};
