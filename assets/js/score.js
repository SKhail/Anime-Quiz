//Out of scoped variables 
const containerHighScore = document.getElementById("highscores");
const clearEl = document.getElementById("clear");

//The aim of this is to show the highscores on the highscore page
function showHighScores() {
 const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

 containerHighScore.innerHTML = ''; //Clear the existing info

 highscores.forEach(score => {    //show each highscore on the ol list 
  const itemList = document.createElement('li');
  itemList.textContent = `${score.initials} - ${score.score}`;
  containerHighScore.appendChild(itemList);
 });
}

console.log();
console.log("highscore is: ", highscores);

// Event Listener
clearEl.addEventListener("click", emptyHighScores);  //Event Listener  

function emptyHighScores() {
 localStorage.removeItem("highscores");
 showHighScores();
}



showHighScores();


// let testData = localStorage.getItem('scores');
// console.log("Saved Data: ", testData)
// console.log("Saved Data: ", typeof testData)
