import { roundToDecimals } from "./cpm-calculator";

const marketTaxRates = {
  'Amtrak DC': '6.000',
  'Atlanta': '8.900',
  'Austin': '8.250',
  'Boston': '6.250',
  'Chicago': '10.500',
  'Las Vegas': '8.375',
  'Los Angeles': '10.250',
  'Minneapolis': '7.375',
  'New Jersey': '6.625',
  'New York': '8.875',
  'Philadelphia': '8.000',
  'Pittsburgh': '7.000',
  'Portland': '0.000',
  'San Francisco': '8.630',
  'Seattle KCM': '10.350',
  'Seattle Sound': '10.350'
};

export function taxCalculator(taxRate, cost) {
  const taxAdded = roundToDecimals(cost * (1 + taxRate), 2);
  const taxSubtracted = roundToDecimals(cost / (1 + taxRate), 2);

  return { taxAdded, taxSubtracted };
}

export class TaxDisplay {
  constructor() {
    this.cost = document.getElementById('tax-cost');
    this.taxTable = document.getElementById('tax-table');
    this.selectedMarket = 'Chicago';
    this.prevSelectedMarket = 'Chicago';
    
    this.displayTaxTable();
    this.addTaxTableListeners();
    
    document.getElementById('chicago').classList.add('selectedTaxMarket');
  }

  createTaxTableRow(market, taxRate) {
    const dashCase = market.split(' ').join('-').toLowerCase();
    return `
      <div class="tax-table-row" role="button" id=${dashCase}>
        <p class="tax-table-market">${market}</p>
        <p class="tax-table-rate">${taxRate} <span class="tax-percent">%</span></p>
      </div>
    `;
  }

  markSelectedRow(market) {
    this.prevSelectedMarket = this.selectedMarket;
    const prevDashCaseMarket = this.prevSelectedMarket.split(' ').join('-').toLowerCase();
    const prevRow = document.getElementById(prevDashCaseMarket);
    prevRow.classList.remove('selectedTaxMarket');
    this.selectedMarket = market;
  }
  
  addTaxTableListeners() {
    const taxTableRows = [...this.taxTable.children];
    taxTableRows.forEach((row) => {
      row.addEventListener('click', () => {
        const market = row.firstElementChild.textContent;
        this.markSelectedRow(market);
        row.classList.add('selectedTaxMarket');
      });
    });
  }

  displayTaxTable() {
    Object.entries(marketTaxRates).forEach(([market, rate]) => {
      this.taxTable.innerHTML = this.taxTable.innerHTML + this.createTaxTableRow(market, rate);
    });
  }

}