//First step get the start button working 
const startEl = document.getElementById("time");


// create a start timer 
let clockTime = 60;


//This will decrease
function startButton() {
 let startTimer = setInterval(function () {
  clockTime--;
  startEl.textContent = clockTime;
  console.log('Time left,' + clockTime);

  if (clockTime === 0) {
   clearInterval(startTimer);
   alert('⏰Time is Up⏰');
  }
 }, 1000);
}

startButton()

//event listeners will be placed here

startEl.addEventListener("click", startButton);