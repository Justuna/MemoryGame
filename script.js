//Globat Constants
const defaultHoldTime = 1000;
const defaultPauseTime = 333;
const defaultClueWaitTime = 1000;
const diffs = {1:5, 2:3, 3:1};
const defaultTime = 20;

//Global Variables
var pattern = [2, 7, 4, 8, 3, 5, 1, 6];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //Between 0.0 and 1.0
var guessCounter = 0;
var clueHoldTime = defaultHoldTime;
var cluePauseTime = defaultPauseTime;
var nextClueWaitTime = defaultClueWaitTime;
var chances = 3;
var difficulty = 1;
var timer = 0;
var seconds = defaultTime;

//Helper Functions
function generateSequence() {
  for (let i = 0; i < pattern.length; i++) {
    pattern[i] = Math.floor(Math.random() * 8) + 1;
    console.log("Entry " + (i + 1) + " is button " + pattern[i]);
  }
}

function displayImage(btn) {
  document.getElementById("musicnote" + btn).classList.remove("hidden");
}

function hideImage(btn) {
  document.getElementById("musicnote" + btn).classList.add("hidden");
}

//Game State Functions
function startGame() {
  //Initialize values
  progress = 0;
  clueHoldTime = defaultHoldTime;
  cluePauseTime = defaultPauseTime;
  nextClueWaitTime = defaultClueWaitTime;
  gamePlaying = true;
  
  //Set up timer
  seconds = defaultTime;
  document.getElementById("clock").innerHTML = "Seconds remaining: " + seconds;
  document.getElementById("clock").classList.remove("hidden");
  
  //Set up chance counter
  chances = diffs[difficulty];
  document.getElementById("chances").innerHTML = "Chances remaining: " + chances;
  document.getElementById("chances").classList.remove("hidden");
  document.getElementById("difficulty").classList.add("hidden");
  
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");

  generateSequence();
  
  playClueSequence();
}

function setDiff(d) {
  difficulty = d;
}

function stopGame() {
  gamePlaying = false;
  
  //Remove timer and chances counter
  clearInterval(timer);
  document.getElementById("clock").classList.add("hidden");
  document.getElementById("chances").classList.add("hidden");
  document.getElementById("difficulty").classList.remove("hidden");
  
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
}

function loseGame() {
  stopGame();
  alert("Game Over. Better luck next time!");
}

function winGame() {
  stopGame();
  alert("You win! Impressive work!");
}

function counter() {
  seconds--;
  document.getElementById("clock").innerHTML = "Seconds remaining: " + seconds;
  if (seconds == 0) {
    loseGame();
  }
}

//Clue Functions
function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  //Begin timer after clues to be fair
  setTimeout(function() {if (gamePlaying) timer = setInterval(counter, 1000);}, delay);
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    displayImage(btn);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

//Button Functions
function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] != btn) {
    chances--;
    if (chances == 0) {
      loseGame();
    } else {
      document.getElementById("chances").innerHTML = "Chances remaining: " + chances;
      alert("Oops! Try that again!");
    }
  } else {
    if (guessCounter < progress) {
      guessCounter++;
    } else {
      if (progress < pattern.length - 1) {
        progress++;
        //Make turns faster
        clueHoldTime -= 75;
        cluePauseTime -= 27;
        nextClueWaitTime -= 75;
        seconds = defaultTime;
        clearInterval(timer);
        document.getElementById("clock").innerHTML = "Seconds remaining: " + seconds;
        playClueSequence();
      } else {
        winGame();
      }
    }
  }
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
  
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
  hideImage(btn);
}

// Sound Synthesis Functions
const freqMap = {
  1: 440,
  2: 493.883,
  3: 554.365,
  4: 587.33,
  5: 659.255,
  6: 739.989,
  7: 830.609,
  8: 880,
  9: 987.767,
  10: 1108.731,
  11: 1174.659,
  12: 1318.51
};

function playTone(btn, len) {
  o1.frequency.value = freqMap[btn];
  o2.frequency.value = freqMap[btn + 2];
  o3.frequency.value = freqMap[btn + 4];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

function startTone(btn) { 
  if (!tonePlaying) {
    o1.frequency.value = freqMap[btn];
    o2.frequency.value = freqMap[btn + 2];
    o3.frequency.value = freqMap[btn + 4];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o1 = context.createOscillator();
var o2 = context.createOscillator();
var o3 = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o1.connect(g); o2.connect(g); o3.connect(g);
o1.start(0); o2.start(0); o3.start(0);
