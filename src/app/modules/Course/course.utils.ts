/* eslint-disable @typescript-eslint/no-explicit-any */
import { excludeFieldsForGetAllCourses } from './course.constant';

export const dateDifferenceInWeeks = (
  startDateInString: string,
  endDateInString: string,
) => {
  const startDate: Date = new Date(startDateInString);
  const endDate: Date = new Date(endDateInString);

  // Calculate the difference in milliseconds
  const differenceMs: number = endDate.getTime() - startDate.getTime();
  // Convert milliseconds to weeks
  const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  const durationInWeeks = Math.ceil(differenceMs / millisecondsInWeek);
  return durationInWeeks;
};
export const generateQueryObject = (query: Record<string, string>) => {
  const queryObject: any = { ...query };

  excludeFieldsForGetAllCourses?.forEach((each) => delete queryObject[each]);
  if (query?.minPrice)
    queryObject['price'] = { $gte: parseFloat(query?.minPrice) };
  if (query?.maxPrice) {
    if (queryObject?.price) {
      queryObject['price'].$lte = parseFloat(query?.maxPrice);
    } else {
      queryObject['price'] = { $lte: query?.maxPrice };
    }
  }
  if (query?.level) queryObject['details.level'] = query?.level;
  if (query?.tags) queryObject['tags.name'] = query?.tags;
  if (query?.durationInWeeks)
    queryObject['durationInWeeks'] = parseFloat(query?.durationInWeeks);

  return queryObject;
};
