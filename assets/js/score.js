//Out of scoped variables 
const containerHighScore = document.getElementById("highscores");
const clearEl = document.getElementById("clear");

//Reconfirming if the results are from localStorage 
function getHighScores() {
 const storedHighScores = localStorage.getItem("highscores") || [];
 if (storedHighScores !== null) {
  const highScore = JSON.parse(storedHighScores)
  showHighScores(highScore);
 }
}

//The aim of this is to show the highscore on the highscore page
function showHighScores(highScore) {
 highScore.forEach(score => {    //show each highscore on the ol list 
  const itemList = document.createElement('li');
  itemList.textContent = `${score.initials} - ${score.score}`;
  containerHighScore.appendChild(itemList);
 });

 //checking if it show correctly 
 console.log("Highscores is: ", highScore);
}

function emptyHighScores() {
 localStorage.removeItem("highscores");
 showHighScores();
}

showHighScores(); //show when the page loads 
// Event Listener
clearEl.addEventListener("click", emptyHighScores);  //Event Listener  

console.log("Score JS is loading");
console.log("clearEl is", clearEl);



// let testData = localStorage.getItem('scores');
// console.log("Saved Data: ", testData)
// console.log("Saved Data: ", typeof testData)
