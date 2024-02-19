import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { reviewServices } from './review.service';

const createReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body);

  //   send response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
};
