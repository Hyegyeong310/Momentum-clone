const body: HTMLElement = document.querySelector('body');

const IMG_NUMBER: number = 1;

function handleImgLoad(): void {
  console.log('Finished loading');
}

function paintImage(imgNumber: number): void {
  const div: HTMLElement = document.createElement('div');
  //   image.src = `images/${imgNumber + 1}.png`;
  const url: string = 'https://source.unsplash.com/collection/4888690';
  div.style.backgroundImage = `url(${url})`;
  div.classList.add('bgImage');
  body.appendChild(div);
  div.addEventListener('loadend', handleImgLoad);
}

function getRandomNum(): number {
  const number: number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function bgInit(): void {
  const randomNumber: number = getRandomNum();
  paintImage(randomNumber);
}

bgInit();
