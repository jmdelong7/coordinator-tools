import DateCalculator from "./date-calculator";

const sd = new Date(2024, 11, 30);

const dateCalculator = new DateCalculator(sd);
window.dateCalculator = dateCalculator;