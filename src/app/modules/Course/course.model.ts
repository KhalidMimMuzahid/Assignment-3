import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTag } from './course.interface';
const tagSchema = new Schema<TTag>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});
const detailSchema = new Schema<TDetails>({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  description: { type: String },
});
const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  tags: { type: [tagSchema] },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number, required: true },
  details: [detailSchema],
});

courseSchema.pre('save', function () {
  // const startDate: Date = new Date(this?.startDate);
  // const endDate: Date = new Date(this?.endDate);
  // // Calculate the difference in milliseconds
  // const differenceMs: number = endDate.getTime() - startDate.getTime();
  // // Convert milliseconds to weeks
  // const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  // const durationInWeeks = Math.ceil(differenceMs / millisecondsInWeek);
  // this.durationInWeeks = durationInWeeks;
});

export const Course = model<TCourse>('Course', courseSchema);
