import dateController from "./date-calculator";
import './styles.css';

const startDate = '2024-09-23';
const dateInterface = dateController(startDate);
window.dateInterface = dateInterface;