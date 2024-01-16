// importing the question.JS
import { questionList } from './questions.js';
//Variables 
const timerEl = document.getElementById("time");
const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const descriptionText = document.querySelector(".start p");

// handling the condition if it wrong /correct question
const msgCont = document.querySelector(".msg-container");
const wrongMessageEl = document.getElementById("wrongMessage");
const messageEl = document.getElementById('message');

//final Score Value
const finalScoreValue = document.getElementById("final-score");
const endScreen = document.getElementById("end-screen");
//Not using it yet 
const submitEl = document.getElementById("submit");
// const resultEl = document.getElementById("result");

// out of scope variables
let timerClock = 60; //StartTime
let timerInterval;  // to store the changes of time
let questionIndexing = 0;
let currentQuestion;
let displayFinalScore = 0;

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
    hideMessage(); // Hide the messages when transitioning to questions 
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

  //This will store the output
  const output = [];

  //focus on starting the first questions
  currentQuestion = quizQuestions[questionIndexing];

  if (currentQuestion) {
    // storing the list of answers
    const answers = [];
    let correctAnswer;

    // Object.entries to iterate over the answers
    Object.entries(currentQuestion.answers).forEach(([letter, answerText]) => {
      // will create a radio button to show for possible answer
      answers.push(`<label class="questions-layout"> 
    <input type="radio" name="question-${questionIndexing}" 
    value="${letter}">
    ${letter} :
    ${answerText}
    </label>`
      );

      if (currentQuestion.correct === letter) {
        correctAnswer = answerText; // this should get the correct answer passing due to previously being underfined
      }
    });

    //Testing if it works 
    console.log("Show Correct Answer: ", correctAnswer);

    //link the questions and answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
    );

    //Testing it
    console.log("Show me the Correct Answer", currentQuestion.correctAnswer);

    //Combining and Displaying on the webpage
    questionsContainer.innerHTML = output.join('');

    startTimer(); //Start the Timer
  } else {
    console.error("currentQuestion is underfined");
  }

  // Testing the buttons 
  // console.log(questionsContainer);
}

// Iterate the next question but need to include time and penalty time when its wrong 
function moveNextQuestion(event) {
  stopTimer(); //halt the timer when heading to the next question

  console.log("Event: ", event);  // when you have tim einspect this OBJECT
  console.log("Event Target: ", event.target);
  console.log("Label or wrapping element: ", event.target.children);
  console.log("Input Element: ", event.target.children[0]);
  console.log("Value: ", event.target.children[0].value);
  console.log("Heading the next question");
  if (currentQuestion) {
    const selectedAnswer = event.target.children[0].value;
    console.log("Selected answer:", selectedAnswer);

    console.log("Current Question: ", currentQuestion)

    // 
    //Validating incorrect answers 
    if (!selectedAnswer || selectedAnswer !== currentQuestion.correctAnswer) {
      timerClock -= 5;  // Decrease when the answer is incorrect 
      if (timerClock <= 0) {  // Need this to avoid going below 0 
        timerClock = 0;
      }
      displayMessage("Incorrect Answer! 5 seconds will be reduced in the time");
      // document.getElementById("wrongMessage").textContent = "Incorrect Answer! 5 seconds will be reduced";
    } else {
      displayMessage("Correct Answer On to the next question"); // Success
    }

    if (questionIndexing < quizQuestions.length) {
      questionIndexing++;
      createQuiz();
    } else {
      // If they are all answered display results
      finalScore();
    }

    startTimer();  //Start the timer when its the next question

  } else {
    console.error("currentQuestion is still underfined")  //need to check if its passing or not
  }

  console.log("current question:", currentQuestion);
  console.log("correct answer:", currentQuestion.correctAnswer);
}

// console.log(quizQuestions);

//Event Listener
questionsContainer.addEventListener("click", moveNextQuestion);
console.log(questionsContainer);




//Error Message when its a incorrect answer

function displayMessage(msg) {

  // console.log("Displaying Message:", msg);


  if (msg.includes("Incorrect")) {   //if its success or error will be displayed
    messageEl.classList.add("success");
    messageEl.textContent = msg;
    messageEl.classList.remove("success");
    wrongMessageEl.textContent = "Incorrect Answer! 5 seconds reduced";
    wrongMessageEl.classList.remove("hide");

    timerClock -= 5;
    if (timerClock < 0) {
      timerClock = 0;
    }
  } else {
    messageEl.textContent = "Correct Answer! On to the next question";
    messageEl.classList.add("success");

    wrongMessageEl.textContent = '';
    wrongMessageEl.classList.add('hide');
  }
  msgCont.classList.remove("hide");
}

//Testing section 
console.log("does it minus 5 seconds " + timerClock);
console.log(messageEl);
// console.log(wrongMessageEl);


function hideMessage() {
  messageEl.textContent = "";
  messageEl.classList.add("hide");
  wrongMessageEl.textContent = '';
  wrongMessageEl.classList.add('hide');

  msgCont.classList.remove("hide");

}

// This is the Timer Section 
function startTimer() {
  timerInterval = setInterval(function () {
    timerClock--;


    if (timerClock <= 0) {
      clearInterval(timerInterval);
      displayMessage('Time is Up, Anime Quiz is done');
      showStartButton() //Will need this to redirect me to the main page 
      timerClock = 0;
    } else {
      timerEl.textContent = timerClock;
      clearInterval(timerInterval)
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


function showStartButton() {
  startButton.classList.remove("hide");
  descriptionText.classList.remove("hide");
  questionsContainer.classList.add("hide");
  startButton.textContent = "Start Quiz"
}


//This will display the results 
function finalScore() {

  finalScoreValue.textContent = displayFinalScore; //Displaying the final score
  endScreen.classList.remove = ("hide")
  // questionsontainer.innerHTML = "Quiz Completed! Display Final Score or Perform Other Actions.";
}

//Adding event listner to the submision button 
submitEl.addEventListener("click, submitScore ");


function submitScore() {
  //store the initials
  const initials = document.getElementById("initials").toUpperCase()

  const storingScores = JSON.parse(localStorage.getItem("scores")) || [];
  storingScores.push({ initials, score: finalScoreValue });
  localStorage.setItem("scores", JSON.stringify(storingScores));

  //Want to redirect to the highscore page
  window.location.href = "highscores.html";
}

// console.log("Logic.js is working successfully"); //Ensure the js is working 
