import {
  add as addDate, 
  sub as subDate,
  differenceInCalendarDays,
  nextMonday,
  previousMonday,
} from 'date-fns';

export default class DateCalculator {
  constructor(startDate) {
    this.startDate = startDate;
    this.updateValues({weeks: 4});
  }

  #propogateDayDifference(endDate, startDate) {
    const dayDifference = differenceInCalendarDays(endDate, startDate);
    this.weeks = dayDifference / 7;
    this.days = dayDifference;
    this.periods = dayDifference / 28;
  }

  #updateStartDate(newStartDate) {
    this.startDate = newStartDate;
    this.endDate = addDate(this.startDate, {weeks: this.weeks});
    this.#propogateDayDifference(this.endDate, newStartDate);
  }

  #updateEndDate(newEndDate) {
    this.endDate = newEndDate;
    this.startDate = subDate(this.endDate, {weeks: this.weeks});
    this.#propogateDayDifference(newEndDate, this.startDate);
  }

  #updateWeeks(newWeeksValue) {
    this.weeks = newWeeksValue;
    this.endDate = addDate(this.startDate, {weeks: newWeeksValue});
    this.#propogateDayDifference(this.endDate, this.startDate);
  }

  #updateDays(newDaysValue) {
    this.days = newDaysValue;
    this.endDate = addDate(this.startDate, {days: newDaysValue});
    this.#propogateDayDifference(this.endDate, this.startDate);
  }

  #updatePeriods(newPeriodsValue) {
    this.periods = newPeriodsValue;
    this.endDate = addDate(this.startDate, {weeks: newPeriodsValue * 4});
    this.#propogateDayDifference(this.endDate, this.startDate);
  }

  updateValues({startDate = null, endDate = null, weeks = null, days = null, periods = null}) {
    if (startDate !== null) {
      this.#updateStartDate(startDate);
    } else if (endDate !== null) {
      this.#updateEndDate(endDate);
    } else if (weeks !== null) {
      this.#updateWeeks(weeks);
    } else if (days !== null) {
      this.#updateDays(days);
    } else if (periods !== null) {
      this.#updatePeriods(periods);
    }
    this.endDate = subDate(this.endDate, ({days: 1}));
    if (this.days <= 0) {
      this.endDate = null;
      this.weeks = null;
      this.days = null;
      this.periods = null;
    }
  }

  getNextMonday(date) {
    const monday = nextMonday(date);
    this.updateValues({startDate: monday});
  }

  getPreviousMonday(date) {
    const monday = previousMonday(date);
    this.updateValues({startDate: monday});
  }
}