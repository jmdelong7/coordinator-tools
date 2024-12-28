import dateController from "./date-calculator";
import { cpmController } from "./cpm-calculator";
import { taxCalculator, TaxDisplay } from "./production-tax-calculator";
import { standardizeDate, updateDates } from "./creative-deadline";
import { subDays } from "date-fns";
import './styles/main.css';
import './styles/date-calculator.css';
import './styles/cpm-calculator.css';
import './styles/tax-calculator.css';

const startDate = '2025-06-02';
const dateInterface = dateController(startDate);
window.dateInterface = dateInterface;

const cpm = cpmController();
window.cpm = cpm;

window.taxCalculator = taxCalculator;
window.taxDisplay = new TaxDisplay;

window.subDays = subDays;
window.standardizeDate = standardizeDate;
window.updateDates = updateDates;
