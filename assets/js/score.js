//Out of scoped variables 
// console.log("Script loaded");
const contHighScore = document.getElementById("highscores");


//Reconfirming if the results are from localStorage 
function getHighScore() {
 const storedHighScores = localStorage.getItem("scores");
 if (storedHighScores !== null) {
  const hold = JSON.parse(storedHighScores);
  showHighScores(hold);
 }
}

//The aim of this is to show the highscore on the highscore page
function showHighScores(highScore) {

 // console.log(contHighScore);
 if (contHighScore) {

 }
 highScore.forEach(function (score) {
  console.log(score);
  const itemList = document.createElement('li');
  itemList.textContent = `${score.initials} - ${score.score}`;
  contHighScore.appendChild(itemList);
 });

 console.log(contHighScore);
 // } else {
 //  console.log("Invalid HighScore: ", highScore, contHighScore);
}
//   console.log("Invalid HighScore: ", highScore);

//  console.log("Highscore is: ", highScore);

function emptyHighScores() {
 localStorage.clear();
 if (contHighScore) {
  const childNodes = contHighScore.children;
  for (let i = childNodes.length - 1; i >= 0; i--) {
   contHighScore.removeChild(childNodes[i])
  }
 }
}
const clearEl = document.getElementById("clear");
if (clearEl) {
 clearEl.addEventListener("click", emptyHighScores);  //Event Listener 
}

getHighScore();

// console.log("Score JS is loading");
// console.log("Saved Data: ", testData)
// console.log("Saved Data: ", typeof testData)
