function roundToDecimals(number, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
}

function addStrCommas(str) {
  const [int, dec] = str.split('.');
  const intSplit = int.split('');
  for (let i = intSplit.length; i > 0; i -= 3) {
    i !== intSplit.length && intSplit.splice(i, 0, ',');
  }
  
  if (dec === undefined || dec === '') {
    return intSplit.join('');
  }
  
  return intSplit.join('') + '.' + dec;
}

function cpmCalculator({budget = null, cpm = null, impressions = null}) {
  if (budget === null) {
    budget = roundToDecimals((impressions / 1000) * cpm, 2);
  } else if (cpm === null) {
    cpm = roundToDecimals((budget / impressions) * 1000, 2);
  } else if (impressions === null) {
    impressions = roundToDecimals((budget / cpm) * 1000, 0);
  }
  return {budget, cpm, impressions};
}

class CpmDisplay {
  constructor() {
    this.budget = document.getElementById('budget');
    this.budgetDigits = document.querySelector('.budget-digits');
    this.cpm = document.getElementById('cpm');
    this.cpmDigits = document.querySelector('.cpm-digits');
    this.impressions = document.getElementById('impressions');
    this.impressionsDigits = document.querySelector('.impression-digits');

    this.calculate = document.getElementById('calculate');
    this.clear = document.getElementById('clear');
    [this.budget, this.cpm, this.impressions].map((input) => input.value = 0);

    this.addListeners();
  }

  get metricPairs() {
    return {
      budget: Number(this.budget.value),
      cpm: Number(this.cpm.value),
      impressions: Number(this.impressions.value)
    };
  }

  showValueError(show) { 
    const valueError = document.getElementById('cpm-value-error');
    const cpmInputs = document.querySelectorAll('.cpm-inputlabels>div>input');
    const cpmInputNodes = [...cpmInputs];
    if (show === true) {
      valueError.classList.add('show');
      cpmInputNodes.forEach((node) => node.classList.add('show'));
    } else if (show === false) {
      valueError.classList.remove('show');
      cpmInputNodes.forEach((node) => node.classList.remove('show'));
    }
  } 

  calculateMissingValue() {
    const keys = Object.keys(this.metricPairs);
    const givenValues = Object.fromEntries(
      keys.filter((key) => this.metricPairs[key] !== 0)
      .map((key) => [key, this.metricPairs[key]])
    );
    if (Object.keys(givenValues).length === 2) {
      this.showValueError(false);
      return cpmCalculator(givenValues);
    } else {
      this.showValueError(true);
      return false;
    }
  }

  updateValues() {
    const newValues = this.calculateMissingValue();
    if (newValues) {
      this.budget.value = newValues.budget;
      this.cpm.value = newValues.cpm;
      this.impressions.value = newValues.impressions;
      this.budgetDigits.textContent = addStrCommas(this.budget.value);
      this.cpmDigits.textContent = addStrCommas(this.cpm.value);
      this.impressionsDigits.textContent = addStrCommas(this.impressions.value);
    }
  }

  showCommaValueListeners() {
    this.budget.addEventListener('input', () => {
      this.budgetDigits.textContent = addStrCommas(this.budget.value);
    });
    this.cpm.addEventListener('input', () => {
      this.cpmDigits.textContent = addStrCommas(this.cpm.value);
    });
    this.impressions.addEventListener('input', () => {
      this.impressionsDigits.textContent = addStrCommas(this.impressions.value);
    });
  }

  addListeners() {
    this.showCommaValueListeners();
    this.calculate.addEventListener('click', () => {
      this.updateValues();
    });
    this.clear.addEventListener('click', () => {
      this.showValueError(false);
      this.budget.value = 0;
      this.cpm.value = 0;
      this.impressions.value = 0;
      this.budgetDigits.textContent = 0;
      this.cpmDigits.textContent = 0;
      this.impressionsDigits.textContent = 0;
    });
  }
}

export default function cpmController() {
  return new CpmDisplay();
}