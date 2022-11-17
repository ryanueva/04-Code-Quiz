// var questions = [
//     {
//         prompt: "An array’s length can be evaluated with the what property?\n (a).length\n (b).log\n (c)the console\n (d).loop",
//         answer: "a"
//       },
    
//       {
//         prompt: "Within a loop, the 'break' keyword may be used to do what?\n (a)break your competitors code\n (b)exit the loop immediately\n (c)repeat the loop\n (d)indicate a stopping condition",
//         answer: "b"
//       },
    
//       {
//         prompt: "Properties in a JavaScript oject are often refferred to as what?\n (a)dot walking\n (b)key-value pairs\n (c)nested properties\n (d)undefined",
//         answer: "b"
//       },
    
//       {
//         prompt: "Which array method inserts an element at the end of the array?\n (a).pop()\n (b).push()\n (c).length\n (d).join()",
//         answer: "b"
//       },
    
//       {
//         prompt: "What is a callback function?\n (a)a function that accepts an array as an argument\n (b)I function that performs an HTTP request\n (c)a data type similar to a string or a boolean\n (d)a function that is passed into another function as an argument",
//         answer: "a"
//       }
// ];

// var score = 0;

// for (var i=0; i < questions.length; i++) {
//     var response = window.prompt(questions[i].prompt);
//     if(response == questions[i].answer){
//         score++;
//         alert("Correct");
//     }else {
//         alert("Wrong!");
//     }
// }
// alert("you got " + socre + "/" + questions.length);\

// var ids and locate elements
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
        problem: "An array’s length can be evaluated with the what property?"
        choices: {
          '.length': 'true',
          '.log': 'false',
          'the console': 'false',
          '.loop': 'false',
        },
      },
    
      {
        problem: "Within a loop, the 'break' keyword may be used to do what?"
        choices:{
          'break your competitors code': 'flase',
          'exit the loop immediately': 'true',
          'repeat the loop': 'false',
          'indicate a stopping condition': 'false',
        },
      },
    
      {
        problem: "Properties in a JavaScript oject are often refferred to as what?"
        choices: {
          'dot walking': 'false',
          'key-value pairs': 'true',
          'nested properties': 'false',
          'undefined': 'false',
        },
      },
    
      {
        problem: "Which array method inserts an element at the end of the array?"
        choices: {
          '.pop()': 'false',
          '.push()': 'true',
          '.length': 'false',
          '.join()': 'false',
        },
      },
    
      {
        problem: "What is a callback function?"
        choices: {
          'a function that accepts an array as an argument': 'true',
          'I function that performs an HTTP request': 'false',
          'a data type similar to a string or a boolean': 'false',
          'a function that is passed into another function as an argument': 'false',
        },
      },
]

