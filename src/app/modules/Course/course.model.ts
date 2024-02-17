import { Schema, model } from 'mongoose';
import { TCourse, TDetail, TTag } from './course.interface';
const tagSchema = new Schema<TTag>({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});
const detailSchema = new Schema<TDetail>({
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

export const Course = model<TCourse>('Course', courseSchema);
