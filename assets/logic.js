// importing the question.JS
import { questionList } from './questions.js';
//Variables 
const timerEl = document.getElementById("time");
const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const nextButtonFeature = document.getElementById("nextButton");
//Needed to hide the text when clicking the startQuiz button 
const descriptionText = document.querySelector(".start p");

//Not using it yet 
const submitEl = document.getElementById("submit");
const resultEl = document.getElementById("result");


// out of scope variables

let timerClock = 60; //StartTime
let timerInterval;  // to store the changes of time

// Indexing the question
let questionIndexing = 0;

// let score = 0;

// for my questions in questions.JS file
const quizQuestions = questionList;


let currentQuestion;
// let incorrectScore = [];



//Link with the start button when needing to hide the start screen 
function openingButton() {
  // console.log("Button Clicked");

  //condtional to hide and show screen
  if (startButton.classList.contains("hide")) {
    console.log("Showing Start Screen");
    startScreen.classList.remove("hide");
    descriptionText.classList.remove("hide");

    console.log("Hide Screen" + startScreen);
    console.log("Hide Screen" + descriptionText);

    questionsContainer.classList.add("hide");

    console.log("Hide Screen" + questionsContainer)

    startButton.textContent = "Start Quiz";
  } else {
    // If the startScreen is visible,hide it and present questions
    console.log("This is hiding the start-screen, showing the questions");
    startButton.classList.add("hide");
    descriptionText.classList.add("hide");
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

  resetTimer(); //Reseting the Timer

  //This will store the output
  const output = [];

  //focus on starting the first questions
  currentQuestion = quizQuestions[questionIndexing];


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

  startTimer(); //Start the Timer
  // Testing the buttons 
  console.log(questionsContainer);
}


//This will iterate the next question but need to include time and penalty time when its wrong 
function moveNextQuestion() {
  stopTimer(); //halt the timer when heading to the next question

  const selectedAnswer = document.querySelector(`input[name="question ${questionIndexing}"]:checked`);

  //Validating incorrect answers 
  if (!selectedAnswer || selectedAnswer.value !== currentQuestion.correct) {
    timerClock -= 5;  //Decrease when the answer is incorrect
  }

  console.log(selectedAnswer);

  //condition to ensure each question is answered and going to the next 
  if (questionIndexing < quizQuestions.length) {
    // display the next question
    questionIndexing++
    createQuiz();
  } else {
    // If they are all answered display results
    finalScore();
  }

  //Next question
  questionIndexing++;

  startTimer();  //Start the timer when its the next question
}

console.log(quizQuestions);

//This will display the results 
const finalScore = () => {

  questionsContainer.innerHTML = "Quiz Completed! Display Final Score or Perform Other Actions.";
};

//Ensure the js is working 
console.log("Logic.js is working successfully");


// This is the Timer Section 

//Start Timer 
function startTimer() {
  timerInterval = setInterval(function () {
    timerClock--;
    timerEl.textContent = timerClock;
    console.log('Time left,' + timerClock);

    if (timerClock === 0) {
      clearInterval(startTimer);
      alert('⏰Time is Up⏰');
    }
  }, 1000);
}

//reset the timer
function resetTimer() {
  timerClock = 60; // reset
  timerEl.textContent = timerClock;
}

//Ability to stop the timer 
function stopTimer() {
  clearInterval(timerInterval)
}