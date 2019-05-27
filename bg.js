const body = document.querySelector('body');

const IMG_NUMBER = 1;

function handleImgLoad() {
  console.log('Finished loading');
}

function paintImage(imgNumber) {
  const div = document.createElement('div');
  //   image.src = `images/${imgNumber + 1}.png`;
  const url = 'https://source.unsplash.com/category/landscape';
  div.style.backgroundImage = `url(${url})`;
  div.classList.add('bgImage');
  body.appendChild(div);
  div.addEventListener('loadend', handleImgLoad);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = getRandom();
  paintImage(randomNumber);
}

init();
