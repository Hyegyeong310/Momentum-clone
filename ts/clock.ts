const clockContainer: HTMLElement = document.querySelector('.js-clock'),
  clockTitle: HTMLElement = clockContainer.querySelector('.js-title'),
  clockList: HTMLElement = clockContainer.querySelector('.js-clockList');

function appendElem(parent: HTMLElement, ...elem: HTMLElement[]): HTMLElement {
  for (let i: number = 0; i < elem.length; i++) {
    parent.appendChild(elem[i]);
  }
  return parent;
}

function getTime(): void {
  clockList.innerText = '';
  const date: Date = new Date();
  const days: HTMLElement = paintClock(date.getDate(), 'days');
  const hours: HTMLElement = paintClock(date.getHours(), 'hours');
  const mins: HTMLElement = paintClock(date.getMinutes(), 'minutes');
  const seconds: HTMLElement = paintClock(date.getSeconds(), 'seconds');
  appendElem(clockList, days, hours, mins, seconds);
}

function paintClock(time: number, text: string): HTMLElement {
  const li: HTMLElement = document.createElement('li');
  const h1: HTMLElement = document.createElement('h1');
  const span: HTMLElement = document.createElement('span');
  h1.innerText = addZero(time);
  span.innerText = text;
  return appendElem(li, h1, span);
}

function addZero(val: number): string {
  return val < 10 ? `0${val}` : `${val}`;
}

function clockInit(): void {
  setInterval(getTime, 1000);
}

clockInit();
