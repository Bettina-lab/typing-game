const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultyselect = document.getElementById('difficulty');




//List of words:

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'admit',
    'drag',
    'loving'
];

//Random word:

let randomword;

//Initialise score:

let score = 0;

//Init time:

let time = 10;

//init difficulty:
//difficulty in local storage 
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//set difficulty select value:
difficultyselect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';



//focus on text on start

text.focus();

//Start counting down every second

const timeInterval = setInterval(updateTime, 1000);


//Generate random word from the array

function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

console.log(getRandomWord());


//Add word tomthe DOM:

function addWordToDOM(){
    randomword = getRandomWord();
    word.innerHTML = randomword;

}

//Update the scoe:

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        //end the game, call function gameOver:
        gameOver();

    }
}

//gameover
function gameOver(){
    endgameEl.innerHTML = `
    <h1>Time ran out</h1?
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

//call

addWordToDOM();



//Event Listener:
//Capture whatever is typed:
text.addEventListener('input', event => {
    const insertedText = event.target.value;
if(insertedText === randomword) {
    addWordToDOM();

    updateScore();

    //clear the input:
    event.target.value = "";

   // time +=3;

   if (difficulty === 'hard'){
       time += 1 ;
   } else if(difficulty === 'medium') {
       time += 2
   } else {
       time += 3;
   }

    updateTime();
}

});

//Settings btn click:

settingsBtn.addEventListener('click', ()=> 
settings.classList.toggle('hide'));

//settings select:

settingsForm.addEventListener('change', event => {
    difficulty = event.target.value;

    //localStorage check it
    localStorage.setItem('difficulty', difficulty);
})