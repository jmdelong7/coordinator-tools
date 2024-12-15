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
  'Amtrak DC': '6.00',
  'Atlanta': '8.90',
  'Austin': '8.25',
  'Boston': '6.25',
  'Chicago': '10.50',
  'Las Vegas': '8.375',
  'Los Angeles': '10.25',
  'Minneapolis': '7.375',
  'New Jersey': '6.625',
  'New York': '8.875',
  'Philadelphia': '8.00',
  'Pittsburgh': '7.00',
  'Portland': '0.00',
  'San Francisco': '8.63',
  'Seattle KCM': '10.35',
  'Seattle Sound': '10.35'
};

export class TaxDisplay {
  constructor() {
    this.taxRates = marketTaxRates;
    this.input = document.getElementById('cost');
    this.taxTable = document.getElementById('tax-table');
  }

  createTaxTableRow(market, taxRate) {
    return `
      <div class="tax-table-row" role="button">
        <p class="tax-table-market">${market}</p>
        <p class="tax-table-rate">${taxRate}%</p>
      </div>
    `;
  }

  displayTaxTable() {
    Object.entries(marketTaxRates).forEach(([market, rate]) => {
      this.taxTable.innerHTML = this.taxTable.innerHTML + this.createTaxTableRow(market, rate);
    });
  }
}