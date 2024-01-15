// importing the question.JS
import { questionList } from './questions.js';
//Variables 
const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const nextButtonFeature = document.getElementById("nextButton");


//Not using it yet 
const submitEl = document.getElementById("submit");
const resultEl = document.getElementById("result");

// for my questions in questions.JS file
const quizQuestions = questionList;

// let incorrectScore = [];

//Starting the indexing 
let questionIndexing = 0;
// let score = 0;

//Link with the start button when needing to hide the start screen 
function openingButton() {
  console.log("Button Clicked");

  //condtional to hide and show screen
  if (startButton.classList.contains("hide")) {
    console.log("Showing Start Screen");
    startScreen.classList.remove("hide");
    console.log("Hide Screen" + startScreen);
    questionsContainer.classList.add("hide");
    console.log("Hide Screen" + questionsContainer)
    startButton.textContent = "Start Quiz";
  } else {
    // If the startScreen is visible,hide it and present questions
    console.log("This is hiding the start-screen, showing the questions");
    startButton.classList.add("hide");
    console.log("Start Button is hiding and the text");
    questionsContainer.classList.remove("hide")

    createQuiz();
  }
}

//Event Listeners for the Start Quiz
startButton.addEventListener("click", openingButton);
console.log(startButton);

//Event Listener for the Next button 
nextButtonFeature.addEventListener("click", moveNextQuestion);
console.log(nextButtonFeature);

//Starting the Anime Quiz Game
function createQuiz() {

  //This will store the output
  const output = [];

  //focus on starting the first questions
  const currentQuestion = quizQuestions[questionIndexing];


  // storing the list of answers
  const answers = [];

  //testing the use of Object.entries to iterate over the answers
  Object.entries(currentQuestion.answers).forEach(([letter, answerText]) => {
    // will create a radio button to show for possible answer
    answers.push(`<label class="questions-layout"> 
    <input type="radio" name="question ${questionIndexing}" 
    value="${letter}">
    ${letter} :
    ${answerText}
    </label>`
    );
  });

  console.log(currentQuestion);

  //link the questions and answers to the output
  output.push(
    `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
  );

  //Combining and Displaying on the webpage
  questionsContainer.innerHTML = output.join('');

  // The ability to go to the next question 
  nextButtonFeature.textContent = "Next Question";
  questionsContainer.appendChild(nextButtonFeature);

  // Testing the buttons 
  console.log(questionsContainer);
}
//This will iterate the next question 
function moveNextQuestion() {
  questionIndexing++

  //condition to ensure each question is answered and going to the next 
  if (questionIndexing < quizQuestions.length) {
    // display the next question
    createQuiz();
  } else {
    // If they are all answered display results
    finalScore();
  }
}

console.log(quizQuestions);

//This will display the results 
const finalScore = () => {

  questionsContainer.innerHTML = "Quiz Completed! Display Final Score or Perform Other Actions.";
};

//Ensure the js is working 
console.log("Logic.js is working successfully");


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