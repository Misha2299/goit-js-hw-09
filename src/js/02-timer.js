import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputElement = document.querySelector('#datetime-picker');
const btnElement = document.querySelector('button[data-start]');

const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');
let selectedDate;

btnElement.addEventListener('click', onStartClick);
btnElement.disabled = true;

flatpickr(inputElement, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    const deltaDate = selectedDate - Date.now();

    if (deltaDate > 0) {
      btnElement.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnElement.disabled = true;
    }
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartClick(evt) {
  const intervalId = setInterval(() => {
    const deltaDate = selectedDate - Date.now();

    if (deltaDate >= 0) {
      const { days, hours, minutes, seconds } = convertMs(deltaDate);

      daysElement.textContent = addLeadingZero(days);
      hoursElement.textContent = addLeadingZero(hours);
      minutesElement.textContent = addLeadingZero(minutes);
      secondsElement.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
