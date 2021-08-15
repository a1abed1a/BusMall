let resultEl = document.getElementById('Results');
let buttEl = document.getElementById('butt');
let leftEl = document.getElementById('left');
let centerEl = document.getElementById('center');
let rightEl = document.getElementById('right');
let allimg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempts = 0;
let finishedimg = [];
function img(name){
  this.name = name.split('.')[0];
  this.jpg = `img/${name}`;
  this.votes = 0;
  this.views = 0;
  finishedimg.push(this);
}
for (let i = 0; i < allimg.length; i++) {
  new img(allimg[i]);
}
let Limg;
let Cimg;
let Rimg;
function randomjpg(){
  Limg = Math.floor(Math.random()*allimg.length);
  Cimg = Math.floor(Math.random()*allimg.length);
  Rimg = Math.floor(Math.random()*allimg.length);
  while (Cimg === Limg){
    Cimg = Math.floor(Math.random()*allimg.length);
  }
  while (Rimg === Limg || Rimg === Cimg){
    Rimg = Math.floor(Math.random()*allimg.length);
  }
  leftEl.setAttribute('src', finishedimg[Limg].jpg);
  finishedimg[Limg].views++;
  centerEl.setAttribute('src', finishedimg[Cimg].jpg);
  finishedimg[Cimg].views++;
  rightEl.setAttribute('src', finishedimg[Rimg].jpg);
  finishedimg[Rimg].views++;
}
randomjpg();
leftEl.addEventListener('click', clicking);
centerEl.addEventListener('click', clicking);
rightEl.addEventListener('click', clicking);
function clicking(event){
  if(attempts < maxAttempts){
    let clickedImage = event.target.id;
    if(clickedImage === 'leftEl'){
      finishedimg[Limg].votes++;
    }else if(clickedImage === 'centerEl'){
      finishedimg[Cimg].votes++;
    }else{
      finishedimg[Rimg].votes++;
    }
    randomjpg();
    attempts++;
  }else if (attempts === maxAttempts){
    button();
    attempts++;
  }
  console.log(attempts);
  leftEl.addEventListener('click', clicking);
  centerEl.addEventListener('click', clicking);
  rightEl.addEventListener('click', clicking);

}
function button(){
  let buttonEl = document.createElement('button');
  buttonEl.textContent = 'View Results';
  buttonEl.onclick = Results;
  buttEl.appendChild(buttonEl);
}
function Results(){
  console.log('lol');
  for (let i = 0; i < finishedimg.length; i++) {
    let liEl = document.createElement('li');
    resultEl.appendChild(liEl);
    liEl.textContent = `${finishedimg[i].name} has ${finishedimg[i].votes} votes and  ${finishedimg[i].views} views.`;
  }
  buttEl.innerHTML = '';
}
