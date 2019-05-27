const clockContainer = document.querySelector('.js-clock'),
  clockTitle = clockContainer.querySelector('.js-title');

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const mins = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${addZero(hours)} : ${addZero(mins)} : ${addZero(
    seconds
  )}`;
}

function addZero(val) {
  return val < 10 ? `0${val}` : val;
}

function init() {
  setInterval(getTime, 1000);
}

init();
