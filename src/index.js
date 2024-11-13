import dateController from "./date-calculator";
import './styles.css';

const startDate = '2024-12-02';
const dateInterface = dateController(startDate);
window.dateInterface = dateInterface;