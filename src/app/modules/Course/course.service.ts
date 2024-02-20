/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TCourse, TDetails } from './course.interface';
import { Course } from './course.model';
import { dateDifferenceInWeeks } from './course.utils';
import mongoose from 'mongoose';

const createCourseIntoDB = async (payload: TCourse) => {
  const durationInWeeks = dateDifferenceInWeeks(
    payload?.startDate,
    payload?.endDate,
  );

  payload.durationInWeeks = durationInWeeks;
  const result = await Course.create(payload);
  return result;
};
const updateCourseIntoDB = async (_id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //update Basic info
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      _id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
    }
    const updateObject: Record<string, any> = {};
    if (courseRemainingData?.startDate || courseRemainingData?.endDate) {
      const { startDate, endDate } = updatedBasicCourseInfo as TCourse;
      const durationInWeeks = dateDifferenceInWeeks(startDate, endDate);
      updateObject['durationInWeeks'] = durationInWeeks;
    }
    if (details) {
      const { level, description } = details as TDetails;
      if (level) updateObject['details.level'] = level;
      if (description) updateObject['details.description'] = description;
    }
    // update details object and  duration in weeks according to startDate and endDate
    const updatedDetailsAndDurationCourseInfo = await Course.findByIdAndUpdate(
      _id,
      updateObject,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!updatedDetailsAndDurationCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
    }
    // partially update tags array of objects

    const deletedTags = tags
      ?.filter((each) => each.name && each.isDeleted)
      .map((each) => each.name);
    const addedTags = tags?.filter((each) => each.name && !each.isDeleted);

    //deleting all deleted tags
    if ((deletedTags as [])?.length > 0) {
      const deletedData = await Course.findByIdAndUpdate(
        _id,
        {
          $pull: {
            tags: { name: { $in: deletedTags } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!deletedData) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
      }
    }
    if ((addedTags as [])?.length > 0) {
      //adding all added tags
      const addedData = await Course.findByIdAndUpdate(
        _id,
        {
          $addToSet: {
            tags: { $each: addedTags },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!addedData) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const updatedData = await Course.findById(_id).populate('categoryId');
    return updatedData;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
  }
};
// const getAllCategoryFromDB = async () => {
//   const result = await Category.find();
//   return result;
// };

export const courseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
};
