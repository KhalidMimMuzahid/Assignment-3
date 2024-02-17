import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const startDate: Date = new Date(payload?.startDate);
  const endDate: Date = new Date(payload?.endDate);

  // Calculate the difference in milliseconds
  const differenceMs: number = endDate.getTime() - startDate.getTime();
  // Convert milliseconds to weeks
  const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  const durationInWeeks = Math.ceil(differenceMs / millisecondsInWeek);

  payload.durationInWeeks = durationInWeeks;
  const result = await Course.create(payload);
  return result;
};

// const getAllCategoryFromDB = async () => {
//   const result = await Category.find();
//   return result;
// };

export const courseServices = {
  createCourseIntoDB,
  //   getAllCategoryFromDB,
};
