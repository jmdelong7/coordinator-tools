import {
  subDays,
  parseISO,
  startOfDay,
  format
} from 'date-fns';

function standardizeDate(date) {
  const standardDate = startOfDay(parseISO(date));
  return standardDate;
}

const daysToSubtract = {
  oneweek: 7,
  traditional: 14,
  large: 28,
  banner: 45
};

class DeadlineDisplay {
  constructor(startDate) {
    this.startDate = document.getElementById('deadline-input');
    this.oneweek = {
      short: document.getElementById('deadline-short-oneweek'),
      long: document.getElementById('deadline-long-oneweek')
    };
    this.traditional = {
      short: document.getElementById('deadline-short-traditional'),
      long: document.getElementById('deadline-long-traditional')
    };
    this.large = {
      short: document.getElementById('deadline-short-large'),
      long: document.getElementById('deadline-long-large')
    };
    this.banner = {
      short: document.getElementById('deadline-short-banner'),
      long: document.getElementById('deadline-long-banner')
    };

    this.startDate.addEventListener('input', () => this.updateDates());
    this.startDate.value = startDate;
    this.updateDates();
    this.copyListeners();
  }

  updateDates() {
    if (isNaN(Date.parse(this.startDate.value))) {
      return;
    }
  
    const standardDate = standardizeDate(this.startDate.value);
    const deadlines = {};
  
    Object.entries(daysToSubtract).forEach(([type, days]) => {
      const deadline = subDays(standardDate, days);
      deadlines[type] = {
        short: format(deadline, 'P'),
        long: format(deadline, 'PPPP')
      };
    });
    
    this.oneweek.short.textContent = deadlines.oneweek.short;
    this.oneweek.long.textContent = deadlines.oneweek.long;

    this.traditional.short.textContent = deadlines.traditional.short;
    this.traditional.long.textContent = deadlines.traditional.long;
    
    this.large.short.textContent = deadlines.large.short;
    this.large.long.textContent = deadlines.large.long;

    this.banner.short.textContent = deadlines.banner.short;
    this.banner.long.textContent = deadlines.banner.long; 
  }

  copyListeners() {
    const oneWeekCopy = document.getElementById('oneweek-copy');
    const traditionalCopy = document.getElementById('traditional-copy');
    const largeCopy = document.getElementById('large-copy');
    const bannerCopy = document.getElementById('banner-copy');

    oneWeekCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(this.oneweek.short.textContent);
    });

    traditionalCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(this.traditional.short.textContent);
    });
    
    largeCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(this.large.short.textContent);
    });
    
    bannerCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(this.banner.short.textContent);
    });
  }

}

export default function deadLineController(startDate) {
  return new DeadlineDisplay(startDate);
}