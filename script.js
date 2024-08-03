"use strict";

const loginButton = document.querySelector(".login-btn");
const welcomeScreen = document.querySelector("#welcome-screen");
const quizScreen = document.querySelector("#quiz-screen");
const completionScreen = document.querySelector("#completion-screen");
const nextArrow = document.querySelector("#next-arrow");
const prevArrow = document.querySelector("#prev-arrow");
const nextStageButton = document.querySelector(".next-stage-btn");
const playAgainButton = document.querySelector(".play-again-btn");

const questions = [
  {
    question: "What is the meaning of DOM?",
    options: [
      "Direct Object Manipulation",
      "Document Object Model",
      "Display Oriented Manipulation",
    ],
    correct: 1,
    image: "./images/img-1.jpg",
  },
  {
    question: "What is JavaScript?",
    options: ["A movie script", "A type of coffee", "A programming language"],
    correct: 2,
    image: "./images/img-2.png",
  },
  {
    question: "What is HTML?",
    options: ["Hypertext Markup Language", "Hotmail", "A programming language"],
    correct: 0,
    image: "./images/img-3.jpg",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Crazy Style Sheets",
    ],
    correct: 0,
    image: "./images/img-4.jpg",
  },
  {
    question: "What is an API?",
    options: [
      "Automated Public Interaction",
      "Application Programming Interface",
      "Artificial Programmed Inteligence",
    ],
    correct: 1,
    image: "./images/img-5.jpg",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function updateQuestion() {
  const questionCount = document.querySelector(".question-count");
  const quizQuestion = document.querySelector(".quiz-question");
  const quizOptions = document.querySelector(".quiz-options");
  const quizImage = document.querySelector(".quiz-image");

  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
  quizQuestion.textContent = questions[currentQuestionIndex].question;
  quizOptions.innerHTML = "";
  questions[currentQuestionIndex].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;
    button.addEventListener("click", () => handleOptionClick(index, button));
    quizOptions.appendChild(button);
  });
  quizImage.src = questions[currentQuestionIndex].image;
}

function handleOptionClick(selectedOptionIndex, button) {
  if (selectedOptionIndex === questions[currentQuestionIndex].correct) {
    button.style.backgroundColor = "green";
    score += 20; // Assuming each correct answer gives 20 points
  } else {
    button.style.backgroundColor = "red";
    document.querySelectorAll(".option-btn")[
      questions[currentQuestionIndex].correct
    ].style.backgroundColor = "green";
  }

  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      updateQuestion();
    } else {
      showCompletionScreen();
    }
  }, 1000); // Delay of 1 second before moving to the next question
}

function showCompletionScreen() {
  quizScreen.classList.add("hidden");
  completionScreen.classList.remove("hidden");
  document.querySelector(".points").textContent = `${score} pts`;
}

document.addEventListener("DOMContentLoaded", function () {
  loginButton.addEventListener("click", function () {
    welcomeScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    updateQuestion();
  });

  nextArrow.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      updateQuestion();
    }
  });

  prevArrow.addEventListener("click", function () {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      updateQuestion();
    }
  });

  nextStageButton.addEventListener("click", function () {
    resetGame();
  });

  playAgainButton.addEventListener("click", function () {
    resetGame();
  });
});

function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  welcomeScreen.classList.remove("hidden");
  quizScreen.classList.add("hidden");
  completionScreen.classList.add("hidden");
}
