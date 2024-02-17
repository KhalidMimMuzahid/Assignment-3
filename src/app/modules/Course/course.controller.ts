import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
// import httpStatus from 'http-status';
import { courseServices } from './course.service';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  //   send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});
// const getAllCategory: RequestHandler = catchAsync(async (req, res) => {
//   const result = await categoryServices.getAllCategoryFromDB();

//   //   send response
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Categories retrieved successfully',
//     data: result,
//   });
// });
export const courseControllers = {
  createCourse,
  //   getAllCategory,
};
