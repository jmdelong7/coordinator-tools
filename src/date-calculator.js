import {
  add as addDate,
  sub as subDate, 
  differenceInCalendarDays,
  nextMonday,
  previousMonday,
  parseISO,
  startOfDay,
  format
} from 'date-fns';
import { roundToDecimals } from "./cpm-calculator";

function standardizeDate(date) {
  const standardDate = startOfDay(parseISO(date));
  return standardDate;
}

class DateCalculator {
  constructor(startDate) {
    this.startDate = standardizeDate(startDate);
    this.updateValues({weeks: 4});
  }

  #propogateDateDifference(endDate, startDate) {
    let difference = differenceInCalendarDays(endDate, startDate);
    difference < 1 || difference > 279972 ? difference = 0 : difference;
    this.days = difference;
    this.weeks = difference / 7;
    this.periods = difference / 28;
  }

  #updateStartDate(newStartDate) {
    if (newStartDate.getFullYear() <= 2791) {
      this.startDate = newStartDate;
      this.endDate = addDate(this.startDate, {weeks: this.weeks});
      this.#propogateDateDifference(this.endDate, newStartDate);
    }
  }

  #updateEndDate(newEndDate) {
    if (newEndDate.getFullYear() <= 2791) {
      this.endDate = newEndDate;
      this.#propogateDateDifference(newEndDate, this.startDate);
    }
  }
  
  #updateDays(newDaysValue) {
    if (newDaysValue > 0 && newDaysValue <= 279972) {
      this.days = newDaysValue;
      this.endDate = addDate(this.startDate, {days: newDaysValue});
      const difference = differenceInCalendarDays(this.endDate, this.startDate);
      this.weeks = difference / 7;
      this.periods = difference / 28;
    }
  }

  #updateWeeks(newWeeksValue) {
    if (newWeeksValue > 0 && newWeeksValue <= 39996) {
      this.weeks = newWeeksValue;
      this.endDate = addDate(this.startDate, {weeks: newWeeksValue});
      const difference = differenceInCalendarDays(this.endDate, this.startDate);
      this.days = difference;
      this.periods = difference / 28;
    }
  }

  #updatePeriods(newPeriodsValue) {
    if (newPeriodsValue > 0 && newPeriodsValue <= 9999) {
      this.periods = newPeriodsValue;
      this.endDate = addDate(this.startDate, {weeks: newPeriodsValue * 4});
      const difference = differenceInCalendarDays(this.endDate, this.startDate);
      this.days = difference;
      this.weeks = difference / 7;
    }
  }

  updateValues({startDate = null, endDate = null, weeks = null, days = null, periods = null}) {
    if (startDate !== null) {
      this.#updateStartDate(standardizeDate(startDate));
    } else if (endDate !== null) {
      this.#updateEndDate(standardizeDate(endDate));
    } else if (days !== null) {
      this.#updateDays(days);
    } else if (weeks !== null) {
      this.#updateWeeks(weeks);
    } else if (periods !== null) {
      this.#updatePeriods(periods);
    }
  }

  getPrevMonday() {
    const monday = format(previousMonday(this.startDate), 'yyyy-MM-dd');
    this.updateValues({startDate: monday});
  }

  getNextMonday() {
    const monday = format(nextMonday(this.startDate), 'yyyy-MM-dd');
    this.updateValues({startDate: monday});
  }

}

class DateDisplay {
  constructor(startDate) {
    this.dateCalculator = new DateCalculator(startDate);

    this.startDate = document.getElementById('start-date');
    this.endDate = document.getElementById('end-date');
    this.days = document.getElementById('days');
    this.weeks = document.getElementById('weeks');
    this.periods = document.getElementById('periods');

    this.prevMonday = document.getElementById('prev-monday');
    this.nextMonday = document.getElementById('next-monday');

    this.dateRangeError = document.getElementById('date-range-error');

    this.longStart = document.getElementById('date-start-long');
    this.longEnd = document.getElementById('date-end-long');
    
    this.updateExcept(startDate);
    this.addListeners();
  }

  get inputs() {
    return [this.startDate, this.endDate, this.days, this.weeks, this.periods];
  }

  get longStartDate() {
    return format(this.dateCalculator.startDate, 'PPPP');
  }

  get longEndDate() {
    return format(standardizeDate(this.endDate.value), 'PPPP');
  }

  updateLongDates() {
    this.longStart.textContent = this.longStartDate;
    this.longEnd.textContent = this.longEndDate;
  }
  
  updateExcept(exclusion) {
    const updates = {
      startDate: () => this.startDate.valueAsDate = this.dateCalculator.startDate,
      endDate: () => this.endDate.valueAsDate = subDate(this.dateCalculator.endDate, {days: 1}),
      days: () => this.days.value = roundToDecimals(this.dateCalculator.days, 3),
      weeks: () => this.weeks.value = roundToDecimals(this.dateCalculator.weeks, 3),
      periods: () => this.periods.value = roundToDecimals(this.dateCalculator.periods, 3)
    };

    Object.entries(updates).forEach(([name, updateFn]) => {
      if (name !== exclusion) updateFn();
    });

    this.updateLongDates();
  }

  valueInputListener(inputEle, inputName) {
    inputEle.addEventListener('input', () => {
      this.dateCalculator.updateValues({[inputName]: Number(inputEle.value)});
      this.updateExcept(inputName);
    });
  }

  startDateListener() {
    this.startDate.addEventListener('input', () => {
      const yearMonthDay = this.startDate.value.split('-');
      const filtered = yearMonthDay.filter((num) => Number(num) <= 0);
      if (filtered.length === 0) {
        this.dateCalculator.updateValues({['startDate']: this.startDate.value});
        this.updateExcept('startDate');
      }
    });
  }

  endDateListener() {
    this.endDate.addEventListener('input', () => {
      const yearMonthDay = this.endDate.value.split('-');
      const filtered = yearMonthDay.filter((num) => Number(num) <= 0);
      if (filtered.length === 0 && Number(yearMonthDay[0]) <= 2791) {
        const standardDatePlusOne = addDate(standardizeDate(this.endDate.value), {days: 1});
        const newEndDate = format(standardDatePlusOne, 'yyyy-MM-dd');
        this.dateCalculator.updateValues({['endDate']: newEndDate});
        this.updateExcept('endDate');
      }
      this.showRangeError();
    });
  }

  addPrevListener() {
    this.prevMonday.addEventListener('click', () => {
      this.dateCalculator.getPrevMonday();
      this.updateExcept();
    });
  }

  addNextListener() {
    this.nextMonday.addEventListener('click', () => {
      this.dateCalculator.getNextMonday();
      this.updateExcept();
    });
  }

  addListeners() {
    this.valueInputListener(this.days, 'days');
    this.valueInputListener(this.weeks, 'weeks');
    this.valueInputListener(this.periods, 'periods');
    this.startDateListener();
    this.endDateListener();
    this.addPrevListener();
    this.addNextListener();
  }

  showRangeError() {
    const difference = differenceInCalendarDays(
      this.dateCalculator.endDate, this.dateCalculator.startDate);
    if (difference <= 1 || difference > 279972) {
      this.inputs.forEach((input) => input.classList.add('show'));
      this.dateRangeError.classList.add('show');
    } else {
      this.inputs.forEach((input) => input.classList.remove('show'));
      this.dateRangeError.classList.remove('show');
    }
  }
}

export default function dateController(startDate) {
  return new DateDisplay(startDate);
}