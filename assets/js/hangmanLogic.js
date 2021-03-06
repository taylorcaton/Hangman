

// Let's start by grabbing a reference to the <span> below.
var wordBank = ["MARTINI", "GIN AND TONIC", "ON THE ROCKS", "BOSSA NOVA", "BONGOS", "UKULELE", "HULA DANCE", "PINEAPPLE RUM", "VOLCANO", "HANG TEN"];
var lettersGuessed;
var mysteryWord = "";
var mysteryWordArr = [];
var mysteryText, guessedText, moneyText, winsText;
var guesses;
var wins = 0;
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

      //Builds an array with spaces and dashes
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

  if(x.length>1 || !beginGame || !isNaN(x)) return;

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

  
  //update the mystery word
  theWord.makeMysteryString();

  //Display the mystery word (mysteryText class in html wordBox)
  updateScreen();
  winnerCheck();
}

//Draw to the canvas and updated number of guesses left
function badStuff(){

  guesses--;
  guessesLeftText.textContent = guesses;

  if(guesses < 1) beginGame = false;
}

//$50 for random letter and badStuff
function bribe(){
  
  if(!beginGame || money <= 0) return;

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
  money = 100;
  guesses = 6;
  lettersGuessed = [];
  mysteryWordArr = [];
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
  winsText = document.getElementById("winsText");

  //update the screen
  updateScreen();

  beginGame = true;
}

//Updates the mysteryWord, guessesLeft, money, & wins
function updateScreen(){
  mysteryText.textContent = mysteryWord;
  guessesLeftText.textContent = guesses;
  moneyText.textContent = money;
  winsText.textContent = wins;
  tikiHeads(guesses);
}

//Will the Belmont Family prevail?
function Castlevania(){
  var holyWater = true;
  var draculaAlive = true;
  var belmontAlive = true;

  if(holyWater){
    draculaAlive = false;
  }else{
    belmontAlive = false;
  }
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


//Controls what is displayed in the tikiHeads (martini) box
function tikiHeads(section){
  canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var nextX = 0;
  var currentTiki;

  if (section > 0){
    
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
  }else if(section===0){
    ctx.font = "40px Sigmar One";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width/2, canvas.height/2);
    wins = 0;
  }else{
    ctx.font = "40px Sigmar One";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("NICE!", canvas.width/2, canvas.height/2); 
  }
  
}

//Check for winner, stop game, display winner text, increase wins
function winnerCheck(){
  for (var i = 0; i < mysteryWordArr.length; i++) {
    if(mysteryWordArr[i]==="_") return
  }
  
  beginGame = false;
  tikiHeads(-1);
  wins++;
  if(wins%3==0) money+=50;
  mysteryWord = "";
}

//SimCity 2000
function reticulatingSplines(){
  var tikiGods = 4;
  while(4 > 0){
    tikiGods--;
    if(beginGame){
      tikiGods = tikiGods
    }else{
      tikiGods = 0
    }
  }
}

//Get the mobile keyboard to appear!
document.getElementById('openKeyboard').addEventListener('click', function(){
    var inputElement = document.getElementById('hiddenInput');
    inputElement.style.visibility = 'visible'; // unhide the input
    inputElement.focus(); // focus on it so keyboard pops
    inputElement.style.visibility = 'hidden'; // hide it again
});