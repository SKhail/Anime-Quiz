// importing the question.JS
import { questionList } from './questions.js';
//Variables 
const timerEl = document.getElementById("time");
const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
// const nextButtonFeature = document.getElementById("nextButton");
//Needed to hide the text when clicking the startQuiz button 
const descriptionText = document.querySelector(".start p");

//errorMessage being displayed if the user is incorrect 
const messageEl = document.getElementById("message")

//Not using it yet 
const submitEl = document.getElementById("submit");
const resultEl = document.getElementById("result");

// out of scope variables
let timerClock = 60; //StartTime
let timerInterval;  // to store the changes of time
let questionIndexing = 0;
let currentQuestion;

// for my questions in questions.JS file
const quizQuestions = questionList;


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



//The Anime Quiz Game
function createQuiz() {
  resetTimer(); //Reseting the Timer
  hideMessage(); // Hide

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



  startTimer(); //Start the Timer
  // Testing the buttons 
  console.log(questionsContainer);
}

// Iterate the next question but need to include time and penalty time when its wrong 
function moveNextQuestion() {
  stopTimer(); //halt the timer when heading to the next question

  const selectedAnswer = document.querySelector(`input[name="question ${questionIndexing}"]:checked`);

  //Validating incorrect answers 
  if (!selectedAnswer || selectedAnswer.value !== currentQuestion.correct) {
    timerClock -= 5;  //Decrease when the answer is incorrect 
    if (timerClock < 0) {  // Need this to avoid going below 0 
      timerClock = 0;
    }
    displayMessage("Incorrect Answer! 5 seconds will be reduced in the time");
  } else {
    displayMessage("Correct Answer Press the Next Question"); // Success
  }

  if (timerClock === 0) {
    displayMessage("Time is up! Quiz Over.")
    stopTimer();
    return;
  }

  if (questionIndexing < quizQuestions.length) {
    questionIndexing++;
    createQuiz();
  } else {
    // If they are all answered display results
    finalScore();
  }

  startTimer();  //Start the timer when its the next question
}

// console.log(quizQuestions);

//Event Listener
questionsContainer.addEventListener("click", moveNextQuestion);

//This will display the results 
const finalScore = () => {

  questionsContainer.innerHTML = "Quiz Completed! Display Final Score or Perform Other Actions.";
};


console.log("Logic.js is working successfully"); //Ensure the js is working 



//Error Message when its a incorrect answer

function displayMessage(msg) {
  messageEl.textContent = msg
  if (msg.includes("Correct")) {   //if its success or error will be displayed
    messageEl.classList.add("success");
  } else {
    messageEl.classList.remove("success");
  }
  messageEl.classList.remove("hide");
}


function hideMessage() {
  messageEl.textContent = "";
  messageEl.classList.add("hide");
}

// This is the Timer Section 
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




// The ability to go to the next question 
// nextButtonFeature.textContent = "Next Question";
// questionsContainer.appendChild(nextButtonFeature);


//Event Listener for the Next button 
// nextButtonFeature.addEventListener("click", moveNextQuestion);
// console.log(nextButtonFeature);