let resultEl = document.getElementById('Results');
let buttEl = document.getElementById('butt');
let leftEl = document.getElementById('left');
let centerEl = document.getElementById('center');
let rightEl = document.getElementById('right');
let allimg = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempts = 0;
let finishedimg = [];
let nameArray = [];
let votesArray = [];
let viewsArray = [];

function img(name){
  this.name = name.split('.')[0];
  this.jpg = `img/${name}`;
  this.votes = 0;
  this.views = 0;
  finishedimg.push(this);
}
for (let i = 0; i < allimg.length; i++) {
  new img(allimg[i]);
  nameArray[i] = finishedimg[i].name;
}
let Limg = -1;
let Cimg = -1;
let Rimg = -1;
let temLimg = -1;
let temCimg = -1;
let temRimg = -1;
function randomjpg(){
  while (Limg === temLimg || Limg === temCimg || Limg === temRimg){
    Limg = Math.floor(Math.random()*allimg.length);
  }
  while (Cimg === Limg || Cimg === temLimg || Cimg === temCimg || Cimg === temRimg){
    Cimg = Math.floor(Math.random()*allimg.length);
  }
  while (Rimg === Limg || Rimg === Cimg || Rimg === temLimg || Rimg === temCimg || Rimg === temRimg){
    Rimg = Math.floor(Math.random()*allimg.length);
  }
  leftEl.setAttribute('src', finishedimg[Limg].jpg);
  finishedimg[Limg].views++;
  temLimg = Limg;
  centerEl.setAttribute('src', finishedimg[Cimg].jpg);
  finishedimg[Cimg].views++;
  temCimg = Cimg;
  rightEl.setAttribute('src', finishedimg[Rimg].jpg);
  finishedimg[Rimg].views++;
  temRimg = Rimg;
  console.log(`${temLimg},${temCimg},${temRimg}`);
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
  chart();
}
function chart(){
  for (let i = 0; i <finishedimg.length; i++){
    votesArray[i] = finishedimg[i].votes;
    viewsArray[i] = finishedimg[i].views;
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [{
        label: 'Votes',
        data: votesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      },{
        label: 'Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  document.getElementById('a').style.border = "black solid";
  document.getElementById('Results').style.borderRight = "black solid";
}

