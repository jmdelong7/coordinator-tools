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

  #propogateDateDifference(endDate, startDate) {
    const difference = differenceInCalendarDays(endDate, startDate);
    this.days = difference;
    this.weeks = difference / 7;
    this.periods = difference / 28;
  }

  #updateStartDate(newStartDate) {
    this.startDate = newStartDate;
    this.endDate = addDate(this.startDate, {weeks: this.weeks});
    this.#propogateDateDifference(this.endDate, newStartDate);
  }

  #updateEndDate(newEndDate) {
    this.endDate = newEndDate;
    this.#propogateDateDifference(newEndDate, this.startDate);
  }
  
  #updateDays(newDaysValue) {
    this.days = newDaysValue;
    this.endDate = addDate(this.startDate, {days: newDaysValue});
    const difference = differenceInCalendarDays(this.endDate, this.startDate);
    this.weeks = difference / 7;
    this.periods = difference / 28;
  }

  #updateWeeks(newWeeksValue) {
    this.weeks = newWeeksValue;
    this.endDate = addDate(this.startDate, {weeks: newWeeksValue});
    const difference = differenceInCalendarDays(this.endDate, this.startDate);
    this.days = difference;
    this.periods = difference / 28;
  }

  #updatePeriods(newPeriodsValue) {
    this.periods = newPeriodsValue;
    this.endDate = addDate(this.startDate, {weeks: newPeriodsValue * 4});
    const difference = differenceInCalendarDays(this.endDate, this.startDate);
    this.days = difference;
    this.weeks = difference / 7;
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

  get inputs() {
    return [this.startDate, this.endDate, this.days, this.weeks, this.periods];
  }

  updateDisplay() {
    this.startDate.el.valueAsDate = this.startDate.val;
    this.endDate.el.valueAsDate = this.endDate.val;
    this.days.el.value = this.days.val;
    this.weeks.el.value = this.weeks.val;
    this.periods.el.value = this.periods.val;
  }

  addInputListener(input) {
    input.el.addEventListener('input', () => {
      console.log(input.name, input.val);
      this.dateCalculator.updateValues({[input.name]: input.val});
      console.log(this.dateCalculator);
    });
  }

  addListeners(inputs) {
    inputs.forEach((input) => this.inputListener(input));
  }

}

export default function dateController(startDate) {
  return new DateDisplay(startDate);
}