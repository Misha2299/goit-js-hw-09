const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);
btnStop.disabled = true;

function onStart(event) {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop(event) {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(timerId);
}
