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
      days: () => this.days.value = this.dateCalculator.days,
      weeks: () => this.weeks.value = this.dateCalculator.weeks,
      periods: () => this.periods.value = this.dateCalculator.periods
    };

    Object.entries(updates).forEach(([name, updateFn]) => {
      if (name !== exclusion) updateFn();
    });

    this.updateLongDates();
  }

  addInputListener(inputEle, inputName) {
    inputEle.addEventListener('input', () => {
      let val = isNaN(Number(inputEle.value)) ? inputEle.value : Number(inputEle.value);
      if (inputEle === this.endDate) {
        let standardDatePlusOne = addDate(standardizeDate(val), {days: 1});
        val = format(standardDatePlusOne, 'yyyy-MM-dd');
      }
      this.dateCalculator.updateValues({[inputName]: val});
      this.updateExcept(inputName);
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
    const inputs = this.inputs;
    let inputName = '';
    inputs.forEach((input) => {
      if (input === this.startDate) {
        inputName = 'startDate';
      } else if (input === this.endDate) {
        inputName = 'endDate';
      } else if (input === this.days) {
        inputName = 'days';
      } else if (input === this.weeks) {
        inputName = 'weeks';
      } else if (input === this.periods) {
        inputName = 'periods';
      }
      this.addInputListener(input, inputName);
    });
    this.addPrevListener();
    this.addNextListener();
  }

}

export default function dateController(startDate) {
  return new DateDisplay(startDate);
}