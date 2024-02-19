import { TReview } from './review.inteface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
};
