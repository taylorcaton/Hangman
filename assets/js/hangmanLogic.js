// Let's start by grabbing a reference to the <span> below.
var wordBank = ["MARTINI", "GIN AND TONIC", "ON THE ROCKS"];
var lettersGuessed;
var mysteryWord = "";
var mysteryWordArr = [];
var mysteryText, guessedText, moneyText;
var guesses;
var beginGame = false;
var money;

var theWord = {

  letterArray: [],

    //Gets a random word and puts each character into an array
    wordToArray: function(){
      var str = wordBank[Math.floor(Math.random() * wordBank.length)];
      letterArray = str.split("");
    },

    //Makes an array with dashes for unknown letters and spaces for... spaces
    makeMysteryArray: function(){

      //Reset Mystery Word
      mysteryWord = "";

      //Builds a string with spaces and dashes
      for(var i=0; i<letterArray.length; i++){
        if(letterArray[i]===" "){
          mysteryWordArr[i] = " ";
        }else{
          mysteryWordArr[i] = "_";
        }
      }
    },

    //Makes a string with underscores, spaces, and known letters
    makeMysteryString: function(){

      mysteryWord = "";

      for (var i = 0; i <mysteryWordArr.length; i++) {
       mysteryWord += mysteryWordArr[i];
       if(mysteryWordArr[i]==" ") mysteryWord += " - ";
       else mysteryWord += " ";
      }

    }


  } //end theWord object

var userText = document.getElementById("user-text");

// Next, we give JavaScript a function to execute when onkeyup event fires.
document.onkeyup = function(event) {
  //userText.textContent = event.key;
  var x = event.key

  if(x.length>1 || !beginGame) return;

  //Convert to Uppercase
  x = ""+x.toUpperCase();
  
  //Check to see if the word is in the mysteryArray, if it is, replace with the letter
  var changes = 0;

  for (var i = 0; i < mysteryWordArr.length; i++) {
    if(x === letterArray[i]){ 
      mysteryWordArr[i] = x;
      changes++;
    }
  }

  //Add the incorrect letter to the guessed array
  var alreadyGuessed = false;
  if(lettersGuessed.indexOf(x) < 0 && changes===0){
    lettersGuessed.push(x);
    badStuff();
  }

  //Push the the dom
  guessedText.textContent = lettersGuessed;

  //winnerCheck();

  //update the mystery word
  theWord.makeMysteryString();

  //Display the mystery word (mysteryText class in html wordBox)
  updateScreen();
}

//Draw to the canvas and updated number of guesses left
function badStuff(){

  guesses--;
  guessesLeftText.textContent = guesses;

  if(guesses < 1) beginGame = false;
}

//$50 for random letter and badStuff
function bribe(){
  money -= 50;

  var randNum = Math.floor(Math.random() * letterArray.length);
  var count = 0;

  //Find an available letter (try 50 times and exit)
  while(mysteryWordArr[randNum] != "_"){
    
    randNum = Math.floor(Math.random() * letterArray.length);
    count++;
    if(count>50){
      console.log("no letters to give");
      return;
    } 
  }

  //Apply the random letter
  mysteryWordArr[randNum] = letterArray[randNum];

  //update the String
  theWord.makeMysteryString();

  //Badstuff
  badStuff();

  //update screen
  updateScreen();
}

function start(){
  //Initial Display
  document.getElementById("box1").style.display = 'initial';
  document.getElementById("box2").style.display = 'initial';
  document.getElementById("box3").style.display = 'initial';
  money = 100;
  guesses = 6;
  lettersGuessed = [];
  mysteryWord = "";

  //Pick a random word
  theWord.wordToArray();

  //Move characters to an array
  theWord.makeMysteryArray();

  //Make mystery string
  theWord.makeMysteryString();

  //Display mysteryWord, guessedLetters, guessesLeft, and money
  guessesLeftText = document.getElementById("guessesLeftText");
  guessedText = document.getElementById("guessedText");
  mysteryText = document.getElementById("mysteryText");
  moneyText = document.getElementById("moneyText");

  updateScreen();

  beginGame = true;
}

function updateScreen(){
  mysteryText.textContent = mysteryWord;
  guessesLeftText.textContent = guesses;
  moneyText.textContent = money;
  tikiHeads(guesses);
}

//THE CANVAS
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var tiki1 = document.getElementById('tiki1');
var tiki2 = document.getElementById('tiki2');
var tiki3 = document.getElementById('tiki3');
var tiki4 = document.getElementById('tiki4');
var tiki5 = document.getElementById('tiki5');
var tiki6 = document.getElementById('tiki6');


function tikiHeads(section){
  canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var nextX = 0;
  var currentTiki;
    
  for(var i=1; i<=section; i++){

    
    if(i===1){
      currentTiki = tiki1;
    }else if (i===2) {
      currentTiki = tiki2;
    }else if (i===3) {
      currentTiki = tiki3;
    }else if (i===4) {
      currentTiki = tiki4;
    }else if (i===5) {
      currentTiki = tiki5;
    }else if (i===6) {
      currentTiki = tiki6;
    }

    ctx.drawImage(currentTiki, nextX, 10);
    nextX += window.innerWidth/6;

  }
  
}