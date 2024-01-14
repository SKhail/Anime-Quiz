//Starting the quiz 
const startEl = document.getElementById("start");
//Submisstion bution
const submitEl = document.getElementById("submit");
//Final Button for Results
const resultEl = document.getElementById("result");

const quizGame = document.getElementById("questions");

//Eventually link to my array in question.js
const question = [];

// create a start timer 
let clockTime = 60;

//Main Function for the Anime Quiz
function createQuiz() {

 //This will store the output
 const output = [];

 //This will focus on interating each question 
 question.forEach((currentQuestion, index) => {

  // storing the list of answers
  const answers = [];

  // every possible available answer
  for (letter in question.answers) {

   // will create a radio button to show for possible answer
   answers.push(`<label> <input type="radio name="question${index}" value="${letter}">
    ${letter} :
    ${currentQuestion.answers[letter]}
    </label>`);
  }


  //link the questions and answers to the output
  output.push(
   `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
  );
 }
 );

 //Combining and Displaying on the webpage
 // startEl.innerHTML = output.join('')
 document.getElementById("questions").innerHTML = output.join('');
 console.log(question);
}

//Execution functions 

createQuiz();



//Event Listeners 
//startgame 
startEl.addEventListener("click", createQuiz);

//show results 




//This will decrease
// function startButton() {
//  let startTimer = setInterval(function () {
//   clockTime--;
//   startEl.textContent = clockTime;
//   console.log('Time left,' + clockTime);

//   if (clockTime === 0) {
//    clearInterval(startTimer);
//    alert('⏰Time is Up⏰');
//   }
//  }, 1000);
// }