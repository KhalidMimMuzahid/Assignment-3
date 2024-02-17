import { ObjectId } from 'mongoose';

export type TReview = {
  courseId: ObjectId;
  rating: number;
  review: string;
};
