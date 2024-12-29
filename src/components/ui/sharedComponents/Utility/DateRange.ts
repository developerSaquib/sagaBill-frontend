/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";

// date range function which returns the from date and to date as per requisrement
export function getDatesByDateRange(dateRange: number): [any, any] {
  var date1: any; // Selected date by user
  var date2: any;
  switch (dateRange) {
    // 1.start of day and now
    case 1:
      date1 = dayjs().startOf("day"); // Start of today
      date2 = dayjs(); // Current date and time
      break;
    //2.start of month and Now
    case 2:
      // Calculate the start of the week (Sunday is considered the first day of the week)
      //   date1 = new Date(currentDate);
      //   const startOfMonth = new Date(
      //     currentDate.getFullYear(),
      //     currentDate.getMonth(),
      //     1
      //   );

      //   const formatDate = (date: any) => date.toISOString().slice(0, -1) + "Z";
      //   date2 = formatDate(date1);
      //   date1 = formatDate(startOfMonth);
      date1 = dayjs().startOf("month"); // Start of the current month
      date2 = dayjs(); // Current date and time
      break;
    // current week to now
    case 3:
      date1 = dayjs().startOf("week"); // Start of the current week (Sunday)
      date2 = dayjs(); // Current date and time
      break;

    // //4.  Calculate the start and end of the previous month
    // case 4:
    //   // Calculate the start of the previous month
    //   date1 = new Date(
    //     currentDate.getFullYear(),
    //     currentDate.getMonth() - 1,
    //     1
    //   );
    //   // Calculate the end of the previous month
    //   date2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    //   date1 = dayjs(date1.toDateString());
    //   date2 = dayjs(date2.toDateString());
    //   break;

    // // 5. Calculate the start previous year
    // case 5:
    //   date1 = new Date(currentDate.getFullYear(), 0, 1);
    //   date2 = new Date(currentDate);
    //   date1 = dayjs(date1.toDateString());
    //   date2 = dayjs(date2.toDateString());
    //   break;

    // //6.  Calculate the start and end of the previous year
    // case 6:
    //   date1 = new Date(currentDate.getFullYear() - 1, 0, 1);
    //   date2 = new Date(currentDate.getFullYear() - 1, 11, 31);
    //   date1 = dayjs(date1.toDateString());
    //   date2 = dayjs(date2.toDateString());
    //   break;

    // //9.  Calculate the start of apple quarter and currrent date
    // case 9:
    //   // Determine the start date of Apple's fiscal quarter
    //   let startOfQuarter;

    //   if (currentDate.getMonth() >= 9) {
    //     // October, November, December
    //     startOfQuarter = new Date(currentDate.getFullYear(), 9, 1); // Q1: October 1st
    //   } else if (currentDate.getMonth() >= 6) {
    //     // July, August, September
    //     startOfQuarter = new Date(currentDate.getFullYear(), 6, 1); // Q4: July 1st
    //   } else if (currentDate.getMonth() >= 3) {
    //     // April, May, June
    //     startOfQuarter = new Date(currentDate.getFullYear(), 3, 1); // Q3: April 1st
    //   } else {
    //     // January, February, March
    //     startOfQuarter = new Date(currentDate.getFullYear(), 0, 1); // Q2: January 1st
    //   }
    //   // Format the dates using dayjs
    //   date1 = dayjs(startOfQuarter.toDateString()).format("YYYY-MM-DD");
    //   date2 = dayjs(currentDate.toDateString()).format("YYYY-MM-DD");
    //   break;

    // //11.  Calculate the yesterday date
    // case 11:
    //   date2 = new Date();
    //   date1 = dayjs(date1).subtract(1, "day");
    //   date2 = dayjs(date2);
    //   break;

    // //12.  Calculate the start and end of the previous week
    // case 12:
    //   // Calculate how many days to subtract to get the previous week's Sunday
    //   const daysToSubtractForStartOfPreviousWeek = currentDate.getDay() + 7;
    //   // Create a new date object for the start of the previous week (last week's Sunday)
    //   let startOfPreviousWeek = new Date(currentDate);
    //   startOfPreviousWeek.setDate(
    //     currentDate.getDate() - daysToSubtractForStartOfPreviousWeek
    //   );
    //   // Create a new date object for the end of the previous week (last week's Saturday)
    //   let endOfPreviousWeek = new Date(startOfPreviousWeek);
    //   endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6);
    //   // Format the dates using dayjs
    //   date1 = dayjs(startOfPreviousWeek.toDateString());
    //   date2 = dayjs(endOfPreviousWeek.toDateString());
    //   break;

    default:
      date1 = dayjs(Date.now());
      date2 = dayjs(Date.now());
    // code block
  }
  // const formatDate = (date: any) => date.toISOString();
  // date1 = formatDate(date1.toDate());
  // date2 = formatDate(date2.toDate());
  return [date1.format("YYYY-MM-DD"), date2.format("YYYY-MM-DD")];
}
