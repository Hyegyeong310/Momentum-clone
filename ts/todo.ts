const toDoForm: HTMLElement = document.querySelector('.js-toDoForm'),
  toDoInput: HTMLInputElement = toDoForm.querySelector('input'),
  toDoBtn: HTMLElement = toDoForm.querySelector('i'),
  toDoList: HTMLElement = document.querySelector('.js-toDoList');

const TODOS_LS: string = 'toDos';

let toDos: any[] = [];
let newId: number = 0;

function deleteToDo(evt: Event): void {
  const li = (<HTMLElement>evt.target).parentNode;
  toDoList.removeChild(li);
  const cleanToDos: any[] = toDos.filter(
    (toDo: any) => toDo.id !== parseInt(li['id'])
  );
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(): void {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text: string): void {
  const li: HTMLElement = document.createElement('li');
  const delBtn: HTMLElement = document.createElement('i');
  const span: HTMLElement = document.createElement('span');
  delBtn.classList.add('far', 'fa-times-circle');
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = String(++newId);
  toDoList.appendChild(li);
  const toDoObj: any = {
    text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(evt: Event): void {
  evt.preventDefault();
  const currentValue: string = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function loadToDos(): void {
  const loadedToDos: string = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos: any[] = JSON.parse(loadedToDos);
    parsedToDos.forEach((toDo: any) => paintToDo(toDo.text));
  }
}

function todoInit(): void {
  loadToDos();
  toDoBtn.addEventListener('click', handleSubmit);
  toDoForm.addEventListener('submit', handleSubmit);
}

todoInit();
