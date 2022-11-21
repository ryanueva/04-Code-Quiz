var startBtn = document.querySelector('.start-button');
var resetBtn = document.querySelector('.reset-button');
var scoresBtn = document.querySelector('.scores-button');

var timerTxt = document.querySelector('.timer-text');
var lastScore = document.querySelector('.last-score');

var cardContent = document.querySelector('.card-content');
var cardBtm = document.querySelector('.card-bottom');

// display the questions
var questionEl = document.createElement('h5');
questionEl.classList.add('question-style');

// buttons for answer choices 4 answer choices, determines true/false
var choiceEl1 = document.createElement('button');
var choiceEl2 = document.createElement('button');
var choiceEl3 = document.createElement('button');
var choiceEl4 = document.createElement('button');
var choiceSty = document.querySelector('.choice-style');
choiceEl1.classList.add('choice-style');
choiceEl2.classList.add('choice-style');
choiceEl3.classList.add('choice-style');
choiceEl4.classList.add('choice-style');
var valueCh1 = choiceEl1.getAttribute('value');
var valueCh2 = choiceEl2.getAttribute('value');
var valueCh3 = choiceEl3.getAttribute('value');
var valueCh4 = choiceEl4.getAttribute('value');

//display current score
var scoreEl = document.createElement('h6');
scoreEl.classList.add('current-score');

// place holds info as to whther answer is or is not correct
var correctEl = document.createElement('p');
correctEl.classList.add('is-correct');

// button to quit and exit quiz
var quitEl = document.createElement('button');
quitEl.classList.add('quit-button');
quitEl.textContent = 'Quit';

// to enter name and submit score after completion
var formEl = document.createElement('form');
formEl.classList.add('input-form');

// enter name input
var inputEl = document.createElement('input');
inputEl.classList.add('input-style');
var inpuSty = document.querySelector('.input-style');

// variables for time, index of questions, quiz score, empty array stores scores 
var timeVal;
var indexProb;
var quizScore;
var scores = [];

// create list elements to display all scores, and add style
var ulEl = document.createElement('ul');
var liEl = document.createElement('li');
liEl.classList.add('list-style');

// arrays to hold questions, empty array will be a copy of the constant array when starting the quiz each time
var allProblems = [];
const allQuestions = [
      {
        problem: "An array’s length can be evaluated with the what property?",
        choices: {
          '.length': 'true',
          '.log': 'false',
          'the console': 'false',
          '.loop': 'false',
        },
      },
      {
        problem: "Within a loop, the 'break' keyword may be used to do what?",
        choices:{
          'break your competitors code': 'flase',
          'exit the loop immediately': 'true',
          'repeat the loop': 'false',
          'indicate a stopping condition': 'false',
        },
      },
      {
        problem: "Properties in a JavaScript object are often refferred to as what?",
        choices: {
          'dot walking': 'false',
          'key-value pairs': 'true',
          'nested properties': 'false',
          'undefined': 'false',
        },
      },
      {
        problem: "Which array method inserts an element at the end of the array?",
        choices: {
          '.pop()': 'false',
          '.push()': 'true',
          '.length': 'false',
          '.join()': 'false',
        },
      },
      {
        problem: "What is a callback function?",
        choices: {
          'a function that accepts an array as an argument': 'false',
          'I function that performs an HTTP request': 'false',
          'a data type similar to a string or a boolean': 'false',
          'a function that is passed into another function as an argument': 'true',
        },
      },
]

// set empty array to question by number
function restoreQuestions() {
  allProblems = [allQuestions[0], allQuestions[1], allQuestions[2], allQuestions[3], allQuestions[4]];
}

// init, set timer to 0, gets localStorage scores
function init() {
  cardContent.classList.remove("scores-list-style");
  timerTxt.textContent = 0;
  getScores()
  cardContent.appendChild(questionEl);
  cardContent.classList.add('scores-list-style')
  questionEl.textContent = "Hit Start to Begin";
}

// starts quiz, shows array of questions, sets intial score to 0, displays current score
function startQuiz() {
  restoreQuestions();
  disableBtns()
  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';
  cardContent.classList.remove("scores-list-style");

  quizScore = 0;
  scoreEl.textContent = 'Current Score: ' + quizScore;

  cardBtm.appendChild(scoreEl);
  cardBtm.appendChild(correctEl);
  cardBtm.appendChild(quitEl);

  startTimer();
  renderProbs();
}

// disables buttons
function disableBtns() {
  startBtn.disabled = true;
  resetBtn.disabled = true;
  scoresBtn.disabled = true;
}
// enables buttons
function enableBtns() {
  startBtn.disabled = false;
  resetBtn.disabled = false;
  scoresBtn.disabled = false;
}

// sets timer, displays time 
function startTimer() {
  timeVal = 120;
  timerTxt.textContent = timeVal;
  timer = setInterval(function () {
    timeVal--;
    timerTxt.textContent = timeVal;
    if (timeVal <= 0) {
      timeVal = 0
      timerTxt.textContent = timeVal;
      clearInterval(timer);
      renderForm();
      return;
    }
  }, 1000);
}

// displays the specific problem, pulls 1 variable from the array, pulls pieces apart in the question text, answer choices, and whether option is true or false
function renderProbs() {
  cardContent.classList.remove("scores-list-style");
  cardContent.innerHTML = '';
  var numProb = allProblems.length;
  var randomProb = Math.floor(Math.random() * numProb);
  indexProb = randomProb;

  // text appears on the screen
  var question = Object.values(allProblems[randomProb])[0];
  var choice1 = Object.keys(Object.values(allProblems[randomProb])[1])[0];
  var choice2 = Object.keys(Object.values(allProblems[randomProb])[1])[1];
  var choice3 = Object.keys(Object.values(allProblems[randomProb])[1])[2];
  var choice4 = Object.keys(Object.values(allProblems[randomProb])[1])[3];

  // correct/incorrect value for each answer choice
  var choiceTF1 = Object.values(Object.values(allProblems[randomProb])[1])[0];
  var choiceTF2 = Object.values(Object.values(allProblems[randomProb])[1])[1];
  var choiceTF3 = Object.values(Object.values(allProblems[randomProb])[1])[2];
  var choiceTF4 = Object.values(Object.values(allProblems[randomProb])[1])[3];

  // sets correct/incorrect values for the answer choices
  choiceEl1.setAttribute('value', choiceTF1);
  choiceEl2.setAttribute('value', choiceTF2);
  choiceEl3.setAttribute('value', choiceTF3);
  choiceEl4.setAttribute('value', choiceTF4);

  // assigns the text to specific element
  questionEl.textContent = question;
  choiceEl1.textContent = choice1;
  choiceEl2.textContent = choice2;
  choiceEl3.textContent = choice3;
  choiceEl4.textContent = choice4;

  // appends question and answer buttons
  cardContent.appendChild(questionEl);
  cardContent.appendChild(choiceEl1);
  cardContent.appendChild(choiceEl2);
  cardContent.appendChild(choiceEl3);
  cardContent.appendChild(choiceEl4);

  return;
}

// displays form to enter info after completing quiz
function renderForm() {
  enableBtns();
  cardContent.classList.remove("scores-list-style");
  timeVal = 0;
  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';

  questionEl.textContent = 'Please enter your name to save your score';
  correctEl.textContent = ''
  cardContent.classList.add('scores-list-style');
  cardContent.appendChild(questionEl);
  cardContent.appendChild(formEl);
  formEl.appendChild(inputEl);
  return;
}

// event listener function to submit form
formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  var userName = inputEl.value.trim(); 0

  if (userName === "") {
    return;
  }

  var nameScore = {
    person: userName,
    score: quizScore
  }

  scores.push(nameScore);
  inputEl.value = "";

  setScores();

  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';

  questionEl.textContent = 'Thank you ' + userName + '!';
  cardContent.appendChild(questionEl);

  return;
});

// pulls scores from local storage
function getScores() {
  var retreiveScores = JSON.parse(localStorage.getItem('scores'));
  if (retreiveScores !== null) {
    scores = retreiveScores;
    lastScore.textContent = scores[scores.length - 1].score;
  } return;
}

// saves scores array to local storage
function setScores() {
  if (scores.length > 0) {
    localStorage.setItem("scores", JSON.stringify(scores));
    lastScore.textContent = scores[scores.length - 1].score;
    return;
  }
  return;
}

// displays all scores to screen, clears screen, gets scores
function renderScores() {
  cardContent.innerHTML = '';
  getScores()
  if (scores !== null) {
    ulEl.innerHTML = '';
    cardContent.appendChild(questionEl);
    cardContent.classList.add('scores-list-style');

    questionEl.classList.add('scores-list');
    cardContent.appendChild(ulEl);
    questionEl.textContent = 'Scores';

    for (var i = 0; i < scores.length; i++) {
      var user = scores[i].person;
      var userScore = scores[i].score;

      var liEl = document.createElement('li');
      liEl.textContent = user + ' - ' + userScore;
      liEl.setAttribute('data-index', i);
      ulEl.appendChild(liEl);
    }
  } else {
    questionEl.textContent = "No scores to display"
    cardContent.appendChild(questionEl);
  }
  return;
}

// clears local storage and scores array
function resetScores() {
  cardContent.innerHTML = '';
  localStorage.clear()
  scores.length = 0;
  setScores();
  renderScores();
  questionEl.textContent = 'Deleted Scores'
  return;
}

// determines if chosen answer correct or incorrecct,
// +10 pts to quiz score and displayed with correct message
// 10 seconds reduced from time and displayed with incorrect message
function choiceClk1() {
  clearTimeout(messageTimeout);
  var choice1Val = choiceEl1.getAttribute('value');
  if (choice1Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!'
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}
function choiceClk2() {
  clearTimeout(messageTimeout);
  var choice2Val = choiceEl2.getAttribute('value');
  if (choice2Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!';
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}
function choiceClk3() {
  clearTimeout(messageTimeout);
  var choice3Val = choiceEl3.getAttribute('value');
  if (choice3Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!';
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}
function choiceClk4() {
  clearTimeout(messageTimeout);
  var choice4Val = choiceEl4.getAttribute('value');
  if (choice4Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!';
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}

// mesaage to show correct or incorrect choice (disappears after 2 sec)
function messageTimeout() {
  setTimeout(function () {
    correctEl.textContent = '';
  }, 2000);
}
// quits the quiz, clears card, enables buttons, and sets time to 0
function quit() {
  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';
  timeVal = 0
  enableBtns();
}
// event listeners for all buttons, can be clicked
startBtn.addEventListener('click', startQuiz);
choiceEl1.addEventListener('click', choiceClk1);
choiceEl2.addEventListener('click', choiceClk2);
choiceEl3.addEventListener('click', choiceClk3);
choiceEl4.addEventListener('click', choiceClk4);
quitEl.addEventListener('click', quit);
scoresBtn.addEventListener('click', renderScores);
resetBtn.addEventListener('click', resetScores);
init();