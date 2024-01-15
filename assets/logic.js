
//Variables 

const startEl = document.getElementById("start");

const submitEl = document.getElementById("submit");

const resultEl = document.getElementById("result");

const containerOfQuestions = document.getElementById("questions");

const nextButtonFeature = document.getElementById("nextButton");

// for my questions in questions.JS file
const quizQuestions = [];

//Starting the indexing 
let questionIndexing = 0;


//To link with the start button when needing to hide the start screen 
function startButton() {
 document.getElementById("start-screen").classList.add("hide")
 createQuiz();
}

//Event Listners Section 

//Event Listeners for the Start Quiz
startEl.addEventListener("click", startButton);
console.log(startEl);
//Event Listener for the Next button 
nextButtonFeature.addEventListener("click", moveNextQuestion);
console.log(nextButtonFeature);



//Main Function for the Anime Quiz Game
function createQuiz() {

 //This will store the output
 const output = [];

 //focus on starting the first questions
 const currentQuestion = questionList[questionIndexing];


 // storing the list of answers
 const answers = [];

 // every possible available answer
 for (letter in currentQuestion.answers) {

  // will create a radio button to show for possible answer
  answers.push(`<label> 
    <input type="radio" name="question${questionIndexing}" 
    value="${letter}">
    ${letter} :
    ${currentQuestion.answers[letter]}
    </label>`
  );
 }

 console.log(currentQuestion);

 //link the questions and answers to the output
 output.push(
  `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
 );

 //Combining and Displaying on the webpage
 // startEl.innerHTML = output.join('')
 // document.getElementById("questions").innerHTML = output.join('');

 containerOfQuestions.innerHTML = output.join('');

 nextButtonFeature.textContent = "Next Question";
 containerOfQuestions.appendChild(nextButtonFeature);

 // Showing the first question 
 // const containerOfQuestions = document.getElementById("questions");
 // containerOfQuestions.innerHTML = output.join('');

 //Present the next button for the next question 

 console.log(nextButtonFeature);
 console.log(containerOfQuestions);
}
//This will iterate the next question 
function moveNextQuestion() {
 questionIndexing++

 //condition to ensure each question is answered
 if (currentQuestion < questionList.length) {
  // display the next question
  console.log(createQuiz());
 } else {
  // If they are all answered display results
  finalScore();
 }
}

//This will display the results 
const finalScore = () => {

 containerOfQuestions.innerHTML = "Quiz Completed! Display Final Score or Perform Other Actions.";
};





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