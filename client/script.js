//proj/client/script.js
document.addEventListener("DOMContentLoaded", async () => {
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const scoreElement = document.getElementById('score');

let shuffleQuestions, currentQuestionIndex;
let questions = [];
let score; 

document.addEventListener('keydown', handleEnterKey);
startButton.addEventListener('click',init);
restartButton.addEventListener('click', restartGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion();
});
async function init() {
  startGame();
}
async function fetchquestions() {
  try {
    const response = await fetch('http://localhost:5000/fetch-questions');
    const data = await response.json();
    console.log('Fetched questions:', data);
    questions = data; //store the fetched questions in the questions array
    // showQuestion();
    console.log('Questions array:', questions);
  }
catch(error)
{
  console.error('Error fetching questions:', error);
  questionElement.innerText = "Failed to load quiz questions.";
}}

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    if (!startButton.classList.contains('hide')) {
      startButton.click();
    }
    else if (!nextButton.classList.contains('hide')) {
      nextButton.click();
    }
    else if (!restartButton.classList.contains('hide')) {
      restartGame();
    } 
  }
}

async function startGame(){
  console.log('Starting game...');
  startButton.classList.add('hide');
  try {
  await fetchquestions();
  console.log('Questions fetched', questions);
  shuffleQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
} catch (error) {
  console.error('Error starting game:', error);
  questionElement.innerText = "Failed to start the game.";
}}

function setNextQuestion(){
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question){
  // console.log('Current question:', data);
  questionElement.innerText = question.question;
  console.log('current question:', question)
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    if (option == question.answer) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonElement.appendChild(button);
  });
}

function resetState(){
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonElement.firstChild){
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}

function selectAnswer(e){
  const selectButton = e.target;
  const correct  = selectButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (correct == 'true') {
    score++;
    scoreElement.textContent = score;
  }
  if (shuffleQuestions.length > currentQuestionIndex +1){
    nextButton.classList.remove('hide');
  } else {
    restartButton.classList.remove('hide');
    startButton.classList.add('hide');
  }
}

function setStatusClass(element, correct){
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  }else{
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function restartGame() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;
  startButton.classList.remove('hide');
  restartButton.classList.add('hide');
  questionContainerElement.classList.add('hide');
  resetState();
}

});
