const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

let score = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', ()=>{
  currentQuestionIndex++
  setNextQuestion()
})

function startGame(){
  console.log('Started')
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
  questionElement.classList.remove('hide')
  answerButtonsElement.classList.remove('hide')
  questionElement.innerText = question.question
  question.answers.forEach((answer, index) =>{
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct == true){
       button.setAttribute("id", "correct");
    } else {
      button.setAttribute("id", index)
    }
   
    //Loius:: since you are in for loop, of course you can check if the answer correct is true or not. if it is true, then add score; if wrong, no need to do anything 
    //Louis:: you dun need the below
    // if (answer.correct){
    //   button.dataset.correct = answer.correct
    // }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
} 

function resetState(){
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e){
  //const selectedButton = e.target
  // yes, it logs the click event
  // Louis:: If you console.log (e) and expand, you will see the structure of the object. Line 64 to 69 is the add score / not add score
  console.log(e)
  console.log(e.srcElement.attributes.id.value)
  if (e.srcElement.attributes.id.value=='correct'){
    console.log("You have clicked the correct answer")
    score += 1
    console.log(score)
    questionElement.classList.add('hide')
    answerButtonsElement.classList.add('hide')
  } else {
    console.log("You have clicked the wrong answer")
    console.log(score)
    questionElement.classList.add('hide')
    answerButtonsElement.classList.add('hide')
  }
  if (shuffledQuestions.length > currentQuestionIndex+1){
  nextButton.classList.remove('hide')
  }else{
    questionElement.classList.remove('hide')
    questionElement.innerText = 'Your final score is ' + score
    //answerButtonsElement.add('hide')
    //console.log(answerButtonsElement)
    startButton.innerText = 'Restart'
    startButton.addEventListener('click', restart)
    startButton.classList.remove('hide')
    // Louis: just reset the score here is fine
    
  }
}
//Louis:: now working
function restart(){
  score = 0
}

const questions = [
  {
    question:'What is 2 + 2?',
    answers: [
      {text: '4', correct: true} ,
      {text: '5',  correct: false},
      {text: '6', correct: false},
      {text: '7', correct: false}
    ]
  },
  {
    question:'What is 4 * 5?',
    answers: [
      {text: '22', correct: false} ,
      {text: '25',  correct: false},
      {text: '20', correct: true},
      {text: '18', correct: false}
    ]
  },
  {
    question:'What is 63 / 9?',
    answers: [
      {text: '4', correct: false} ,
      {text: '5',  correct: false},
      {text: '6', correct: false},
      {text: '7', correct: true}
    ]
  }
]