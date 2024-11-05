import dateController from "./date-calculator";

const startDate = new Date(2024, 11, 30);
const dateInterface = dateController(startDate);
window.dateInterface = dateInterface;