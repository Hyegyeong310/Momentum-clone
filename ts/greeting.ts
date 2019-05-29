const form: HTMLElement = document.querySelector('.js-form'),
  input: HTMLInputElement = form.querySelector('input'),
  greeting: HTMLElement = document.querySelector('.js-greetings');

const USER_LS: string = 'currentUser',
  SHOWING_CN: string = 'showing';

function saveName(text: string): void {
  localStorage.setItem(USER_LS, text);
}

function nameHandleSubmit(evt: Event): void {
  evt.preventDefault();
  const currentValue: string = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(): void {
  form.classList.add(SHOWING_CN);
  form.addEventListener('submit', nameHandleSubmit);
}

function paintGreeting(text: string): void {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello, ${text}`;
}

function loadName(): void {
  const currentUser: string = localStorage.getItem(USER_LS);
  if (currentUser === null || currentUser === '') {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function greetingInit(): void {
  loadName();
}

greetingInit();
