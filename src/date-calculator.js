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
    this.startDateInput = document.getElementById('start-date');
    this.endDateInput = document.getElementById('end-date');
    this.daysInput = document.getElementById('days');
    this.weeksInput = document.getElementById('weeks');
    this.periodsInput = document.getElementById('periods');
    this.updateDisplay();
  }

  updateDisplay(name = null, value = null) {
    this.dateCalculator.updateValues({[name]: value});
    this.startDateInput.valueAsDate = this.dateCalculator.startDate;
    this.endDateInput.valueAsDate = this.dateCalculator.endDate;
    this.daysInput.value = this.dateCalculator.days;
    this.weeksInput.value = this.dateCalculator.weeks;
    this.periodsInput.value = this.dateCalculator.periods;
  }

  addInputListener(input) {
    input.addEventListener('input', (event) => {
      this.updateDisplay('days', event.value);
    });
  }

}

export default function dateController(startDate) {
  return new DateDisplay(startDate);
}