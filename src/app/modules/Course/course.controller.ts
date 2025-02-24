import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
// import httpStatus from 'http-status';
import { courseServices } from './course.service';
import httpStatus from 'http-status';

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
const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.updateCourseIntoDB(courseId, req.body);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});
const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const payload: object = req?.query;
  const result = await courseServices.getAllCoursesFromDB(payload);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    data: result,
  });
});
export const courseControllers = {
  createCourse,
  updateCourse,
  getAllCourses,
};
