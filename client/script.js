//proj/client/script.js
document.addEventListener("DOMContentLoaded", async () => {
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');

let shuffleQuestions, currentQuestionIndex;
let questions = [];
let score; 

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion();
});

async function fetchquestions() {
  try {
    const response = await fetch('http://localhost:5000/fetch-questions');
    const data = await response.json();
    console.log('Fetched questions:', data);
    questions = data;
    currentQuestionIndex = 0;
    startGame();}
catch(error)
{
  console.error('Error fetching questions:', error);
  questionElement.innerText = "Failed to load quiz questions.";
}}

fetchquestions();

function startGame(){
  console.log('Starting game with questions:', questions);
  startButton.classList.add('hide');
  shuffleQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion(){
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(data){
  // console.log('Current question:', data);
  questionElement.innerText = data.question.forEach(
  console.log('current question:', data)
  data.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('btn');
    if (option == data.answer) {
      button.dataset.correct = true;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonElement.appendChild(button);
  }));
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
  if (shuffleQuestions.length > currentQuestionIndex +1){
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
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
}});
