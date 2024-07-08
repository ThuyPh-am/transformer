const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame(){
  startButton.classList.add('hide')
  shuffleQuestions = question.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion(){
  resetState()
  showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonElement.appendChild(button)
  })
}

function resetState(){
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonElement.firstChild){
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
}

function selectAnswer(e){
  const selectButton = e.target
  const correct  = selectButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffleQuestions.length > currentQuestionIndex +1){
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct){
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  }else{
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const question = [
  {
    question: 'how to recycle plastic',
    answers :[
      {text: 'into black bin', correct:false},
      {text: 'just throw away', correct:false},
      {text:'with glass', correct: false},
      {text:'into yellow bin', correct:true}
    ]
  },
  {
    question: 'how to handle bio trash',
    answers: [
      {text: 'into black bin', correct: true},
      {text: 'like plastic', correct: false},
      {text: 'throw them on the street', correct: false},
      {text: 'into yellow bin', correct: false}
    ]
  }
]