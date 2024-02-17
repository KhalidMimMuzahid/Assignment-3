import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { categoryServices } from './category.service';
import httpStatus from 'http-status';

const createCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(req.body);

  //   send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});
const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDB();

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: result,
  });
});
export const categoryControllers = {
  createCategory,
  getAllCategory,
};
