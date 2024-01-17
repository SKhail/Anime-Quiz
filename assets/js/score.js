//Out of scoped variables 
document.addEventListener("DOMContentLoaded", function () {

 //Reconfirming if the results are from localStorage 
 const storedHighScores = JSON.parse(localStorage.getItem("highscores")) || [];
 const highScore = (storedHighScores);
 showHighScores(highScore);

 //The aim of this is to show the highscore on the highscore page
 function showHighScores(highScore) {
  const containerHighScore = document.getElementById("highscores");
  if (highScore) {
   highScore.innerHTML = ''; //forgot to include this  to clear current info

   for (let i = 0; i < highScore.length; i++) {
    const score = highScore[i];
    console.log(score);
    const itemList = document.createElement('li');
    if (score.initials) {
     itemList.textContent = `${score.initials} - ${score.score}`;
     containerHighScore.appendChild(itemList);
    }
   }
  }
 }
 // console.log("Highscores is: ", highScore);
 const clearEl = document.getElementById("clear");

 if (clearEl) {
  clearEl.addEventListener("click", emptyHighScores);  //Event Listener  
 }

 function emptyHighScores() {
  localStorage.removeItem("highscores");
  showHighScores();
 }

 showHighScores(); //show when the page loads 
 // Event Listener


 console.log("Score JS is loading");
 // console.log("clearEl is", clearEl);

});


// console.log("Saved Data: ", testData)
// console.log("Saved Data: ", typeof testData)
