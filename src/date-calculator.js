import { add as addDate } from 'date-fns';

export default class DateCalculator {
  constructor(startDate) {
    this.startDate = startDate;
    this.updateValues({ weeks: 4 });
  }

  updateValues({ weeks = null, days = null, periods = null}) {
    if (weeks !== null) {
      this.weeks = weeks;
      this.days = weeks * 7;
      this.periods = weeks / 4;
      this.endDate = addDate(this.startDate, {weeks: weeks});  
    } else if (days !== null) {
      this.days = days;
      this.weeks = days / 7;
      this.periods = days / 28;
      this.endDate = addDate(this.startDate, {days: days});
    } else if (periods !== null) {
      this.periods = periods;
      this.weeks = periods * 4;
      this.days = periods * 28;
      this.endDate = addDate(this.startDate, {weeks: this.weeks});
    }
  }

}