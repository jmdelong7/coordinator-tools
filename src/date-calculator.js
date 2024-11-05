import {
  add as addDate, 
  differenceInCalendarDays,
  nextMonday,
  previousMonday,
} from 'date-fns';

class DateCalculator {
  constructor(startDate) {
    this.startDate = startDate;
    this.updateValues({weeks: 4});
  }

  #propogateDayDifference(endDate, startDate) {
    const dayDifference = differenceInCalendarDays(endDate, startDate);
    this.days = dayDifference;
    this.weeks = dayDifference / 7;
    this.periods = dayDifference / 28;
  }

  #updateStartDate(newStartDate) {
    this.startDate = newStartDate;
    this.endDate = addDate(this.startDate, {weeks: this.weeks});
    this.#propogateDayDifference(this.endDate, newStartDate);
  }

  #updateEndDate(newEndDate) {
    this.endDate = newEndDate;
    this.#propogateDayDifference(newEndDate, this.startDate);
  }
  
    #updateDays(newDaysValue) {
      this.days = newDaysValue;
      this.endDate = addDate(this.startDate, {days: newDaysValue});
      this.#propogateDayDifference(this.endDate, this.startDate);
    }

  #updateWeeks(newWeeksValue) {
    this.weeks = newWeeksValue;
    this.endDate = addDate(this.startDate, {weeks: newWeeksValue});
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
    } else if (days !== null) {
      this.#updateDays(days);
    } else if (weeks !== null) {
      this.#updateWeeks(weeks);
    } else if (periods !== null) {
      this.#updatePeriods(periods);
    }
  }

  getNextMonday() {
    const monday = nextMonday(this.startDate);
    this.updateValues({startDate: monday});
  }

  getPreviousMonday() {
    const monday = previousMonday(this.startDate);
    this.updateValues({startDate: monday});
  }
}

class DateDisplay {
  constructor(startDate) {
    this.dateCalculator = new DateCalculator(startDate);
    this.startDateEl = document.getElementById('start-date');
    this.endDateEl = document.getElementById('end-date');
    this.daysEl = document.getElementById('days');
    this.weeksEl = document.getElementById('weeks');
    this.periodsEl = document.getElementById('periods');
  }


}

export default function dateController(startDate) {
  const dateDisplay = new DateDisplay(startDate);
  return dateDisplay;
}