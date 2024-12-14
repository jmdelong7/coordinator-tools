import { roundToDecimals } from "./cpm-calculator";

export function taxCalculator(addOrRemove, taxRate, value) {
  if (addOrRemove === 'add') {
    const newValue = roundToDecimals(value * (1 + taxRate), 2);
    return newValue;
  } else if (addOrRemove === 'remove') {
    const newValue = roundToDecimals(value / (1 + taxRate), 2);
    return newValue;
  }
}

const marketTaxRates = {
  'Amtrak DC': 6,
  'Atlanta': 8.9,
  'Austin': 8.25,
  'Boston': 6.25,
  'Chicago': 10.5,
  'Las Vegas': 8.375,
  'Los Angeles': 10.25,
  'Minneapolis': 7.375,
  'New Jersey': 6.625,
  'New York': 8.875,
  'Philadelphia': 8,
  'Pittsburgh': 7,
  'Portland': 0,
  'San Francisco': 8.63,
  'Seattle KCM': 10.35,
  'Seattle Sound': 10.35
};

class TaxDisplay {
  constructor(taxRates) {
    this.taxRates = marketTaxRates;
    this.input = document.getElementById('cost');
    this.taxTableContainer = document.getElementById('tax-table-container');
  }

  displayTaxTable() {
    
  }
}