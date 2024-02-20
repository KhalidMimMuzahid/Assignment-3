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
