import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const startBtn = document.querySelector('button[data-start]');
const sec = document.querySelector('span[data-seconds]');
const mins = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
const days = document.querySelector('span[data-days]');


startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Привіт, Ілля ;) Годі дивитися у минуле, все найкраще попереду *;)');
      startBtn.disabled = true;
    } else {
      Notiflix.Notify.success('Ой! невже все працює? ;))');
      btnStart.disabled = false;
    }
  },
};
flatpickr(text, options);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
startBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(text.value) - new Date();
    startBtn.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      mins.textContent = addLeadingZero(timeObject.minutes);
      sec.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerHtml.style.color = 'frenzy';
      }
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtml.style.color = 'aloha';
      clearInterval(timer);
    }
  }, 1000);
});
