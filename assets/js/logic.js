// importing the question.JS
import { questionList } from './questions.js';

//Variables 
const timerEl = document.getElementById("time");
const startButton = document.getElementById("start");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");
const descriptionText = document.querySelector(".start p");

// handling the condition if it wrong /correct question
// const msgCont = document.querySelector(".msg-container");
const wrongMessageEl = document.getElementById("wrongMessage");
const messageEl = document.getElementById('message');

//final Score Value
const finalScoreValue = document.getElementById("final-score");
const endScreen = document.getElementById("end-screen");

const submitEl = document.getElementById("submit");
// const resultEl = document.getElementById("result");

// out of scope variables
let timerClock = 61; //StartTime
let timerInterval;  // to store the changes of time
let questionIndexing = 0;
let currentQuestion;
let displayFinalScore = 0;

// for my questions in questions.JS file
const quizQuestions = questionList;


//Link with the start button when needing to hide the start screen 
function openingButton() {
  console.log("Button Clicked");

  // condtion to hide and show screen
  if (!startScreen.classList.contains("hide")) {
    console.log("Showing Start Screen");
    startScreen.classList.remove("hide");
    descriptionText.classList.remove("hide");
    questionsContainer.classList.add("hide");
    startButton.textContent = "Start Quiz";
    hideMessage();

    // Hide the messages when transitioning to questions 
    console.log("Hide Screen" + startScreen);
    console.log("Hide Screen" + descriptionText);
    console.log("Hide Screen" + questionsContainer)

  } else {
    console.log("This is hiding the start-screen, showing the questions"); // If the startScreen is visible,hide it and present questions
    startButton.classList.add("hide");
    descriptionText.classList.add("hide");
    questionsContainer.classList.remove("hide");

    //if the end-screen is shown,hide it 
    if (!endScreen.classList.contains("hide")) {
      endScreen.classList.add("hide");
    }

    createQuiz();
  }
}

//Event Listeners for the Start Quiz
startButton.addEventListener("click", openingButton);
console.log(startButton);

//The Anime Quiz Game
function createQuiz() {

  // resetTimer(); //Reseting the Timer

  //This will store the output
  const output = [];

  //focus on starting the first questions
  currentQuestion = quizQuestions[questionIndexing];

  if (currentQuestion) {
    // storing the list of answers
    const answers = [];
    // let correctAnswer;

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
        correctAnswer = letter;
        // correctAnswer = answerText; // this should get the correct answer passing due to previously being underfined
      }
    });

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

    // console.error("currentQuestion is underfined");
    console.log("No more questions - game end");

    finalScore()
  }

  // Testing the buttons 
  // console.log(questionsContainer);
}

// Iterate the next question but need to include time and penalty time when its wrong 
function moveNextQuestion(event) {

  stopTimer(); //halt the timer when heading to the next question

  console.log("Event: ", event);  // when you have time inspect this OBJECT

  if (event.target.tagName === 'INPUT') {
    // const selectedAnswer = event.target.children[0].value;
    const selectedAnswer = event.target.value;

    console.log("Selected answer:", selectedAnswer);

    console.log("Current Question: ", currentQuestion)


    //Validating incorrect answers 

    if (selectedAnswer !== currentQuestion.correctAnswer) {
      timerClock -= 10;  // Decrease when the answer is incorrect 
    } else {
      displayFinalScore++;
    }
    console.log("Current Index: ", questionIndexing);
    if (questionIndexing < quizQuestions.length) {
      questionIndexing++;
      createQuiz();
    } else {
      stopTimer();
      finalScore();
    }

  }
}

//Event Listener
questionsContainer.addEventListener("click", moveNextQuestion);
console.log(questionsContainer);


// function displayMessage(msg) {

//   if (msg.includes("Incorrect")) {
//     messageEl.classList.add("success");
//     messageEl.textContent = msg;
//     messageEl.classList.remove("success");
//     wrongMessageEl.textContent = "Incorrect Answer! 5 seconds reduced";
//     wrongMessageEl.classList.remove("hide");

//     timerClock -= 5;
//     if (timerClock < 0) {
//       timerClock = 0;
//     }
//   } else {
//     messageEl.textContent = "Correct Answer! On to the next question";
//     messageEl.classList.add("success");

//     wrongMessageEl.textContent = '';
//     wrongMessageEl.classList.add('hide');
//   }
//   msgCont.classList.remove("hide");
// }

//Testing section 
// console.log("does it minus 10 seconds " + timerClock);
// console.log(messageEl);
// console.log(wrongMessageEl);

function hideMessage() {
  messageEl.textContent = "";
  messageEl.classList.add("hide");
  wrongMessageEl.textContent = '';
  wrongMessageEl.classList.add('hide');
}
// This is the Timer Section 
function startTimer() {
  timerInterval = setInterval(function () {
    timerClock--;
    timerEl.textContent = timerClock;

    if (timerClock <= 0) {
      timerClock = 0; //Set the timer to 0
      finalScore()
      clearInterval(timerInterval);
    }
  }, 1000);
}


//Ability to stop the timer 
function stopTimer() {
  clearInterval(timerInterval);
}

// function showStartButton() {
//   startButton.classList.remove("hide");
//   descriptionText.classList.remove("hide");
//   questionsContainer.classList.add("hide");
//   endScreen.classList.add("hide");
//   startScreen.classList.remove("hide");
//   startButton.textContent = "Start Quiz";
// }

//This will display the results 
function finalScore() {
  stopTimer();
  questionsContainer.classList.add("hide");
  endScreen.classList.remove("hide")
  finalScoreValue.textContent = displayFinalScore; //Displaying the final score
}

//Adding event listner to the submision button
submitEl.addEventListener("click", submitScore);
// console.log(submitEl);

function submitScore() {

  console.log("submitScore Function is called");
  stopTimer(); //Pause this for the user to type the Initials 

  //store the initials and reduce it by trimming
  const inputInitials = document.getElementById("initials");
  const initials = inputInitials.value.trim().toUpperCase();

  endScreen.classList.add("hide"); //present end screen

  //condition for initials 
  if (initials !== "") {
    const storingScores = JSON.parse(localStorage.getItem("scores")) || [];

    // converting to a number 
    const scoreValueNum = parseFloat(finalScoreValue.textContent);

    if (!isNaN(scoreValueNum)) {
      storingScores.push({
        initials: initials,
        score: scoreValueNum
      });
      // handle the scores in decending order
      storingScores.sort((a, b) => b.score - a.score);

      //max 10 scores stored
      storingScores.splice(10);

      localStorage.setItem("scores", JSON.stringify(storingScores));
      console.log("Scores stored in local storage");

      window.location.href = "highscores.html";  //Want to redirect to the highscore page
    }
  }
  console.log("After storing scores", storingScores);
  console.log("Final score value", finalScoreValue);

  //Call it from the score.js
  getHighScore();
}


