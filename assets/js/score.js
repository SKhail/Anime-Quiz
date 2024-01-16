//Out of scoped variables 

const containerHighScore = document.getElementById("highscore");
const clearEl = document.getElementById("clear");

//The aim of this is to show the highscores on the highscore page
function showHighScores() {

 const highscores = JSON.parse(localStorage.getItem("highscore")) || [];

 containerHighScore.innerHTML = ''; //Clear the existing information

 highscores.forEach(score => {    //show each highscore on the ol list 
  const itemList = document.createElement('li');
  itemList.textContent = `${score.initials} - ${score.score}`;
  containerHighScore.appendChild(itemList);
 });
}

console.log();

console.log("highscore is: ", highscores);

function emptyHighScores() {

 clearEl.addEventListener("click", emptyHighScores);  //Event Listener  

 emptyHighScores();
}

//Empty the highscore
// function emptyHighScores() {

//  localStorage.removeItem("highscore")
//  showHighScores()  //Should refresh to display the highscore
// }

// clearEl.addEventListener("click", emptyHighScores);  //Event Listener  


// //invoking the funciton when the page starts 
// emptyHighScores();


let testData = localStorage.getItem('scores');
console.log("Saved Data: ", testData)
console.log("Saved Data: ", typeof testData)
