import { createGlobalStyle } from "styled-components";

/* Calendar popup */
export const CalendarStyles = createGlobalStyle`
.react-datepicker,
.react-datepicker * {
  font-family: "JosefinSans", sans-serif;
  color: #090801;
}

.react-datepicker {
  font-size: 1.2rem;
  width: auto !important;
  min-width: 22.5rem;
  border-radius: 0.7rem;
  border: 0.1rem solid #f57a00;
  box-shadow: 0 0.2rem 0.7rem rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.react-datepicker__time-container {
  width: 9rem;
}

.react-datepicker__time-box {
  padding: 0.6rem;
}

.react-datepicker__time-list-item {
  font-size: 1rem;
}

.react-datepicker__header {
  background-color: #f57a00;
  border-bottom: none;
}

.react-datepicker__date--selected,
.react-datepicker__day--keyboard-selected {
  background-color: #f57a00;
  border-radius: 50%;
  color: white;
}
`;
