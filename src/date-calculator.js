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
    this.startDate = {
      el: document.getElementById('start-date'),
      name: 'startDate',
      val: this.dateCalculator.startDate
    };
    this.endDate = {
      el: document.getElementById('end-date'),
      name: 'endDate',
      val: this.dateCalculator.endDate
    };
    this.days = {
      el: document.getElementById('days'),
      name: 'days',
      val: this.dateCalculator.days
    };
    this.weeks = {
      el: document.getElementById('weeks'),
      name: 'weeks',
      val: this.dateCalculator.weeks
    };
    this.periods = {
      el: document.getElementById('periods'),
      name: 'periods',
      val: this.dateCalculator.periods
    };
  }

  updateDisplay() {
    this.startDate.el.valueAsDate = this.startDate.val;
    this.endDate.el.valueAsDate = this.endDate.val;
    this.days.el.value = this.days.val;
    this.weeks.el.value = this.weeks.val;
    this.periods.el.value = this.periods.val;
  }

  inputListener(input) {
    input.el.addEventListener('input', () => {
      this.dateCalculator.updateValues({[input.name]: input.val});
    });
  }

}

export default function dateController(startDate) {
  const dateDisplay = new DateDisplay(startDate);
  return dateDisplay;
}