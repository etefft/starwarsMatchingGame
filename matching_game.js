

document.getElementById('startBtn').addEventListener('click', chooseTeam);

function chooseTeam() {

document.getElementById('startBtn').style.display = 'none';
document.getElementById('gameBody').innerHTML = '<div class="animated slideInLeft" id="choose"><h1 id="chooseTeamTxt">Choose a Team</h1></div> <br> <div id="rebels"><img id="teamRebel" class="Team animated infinite flash" src="images/rebel.png" alt="rebelSymbol"/> <img id="teamEmpire" class="Team animated infinite flash" src="images/empire.png" alt="empireSymbol"/></div>'
document.querySelector("#teamRebel").addEventListener('click', function(){ createGame("rebel"); });
document.querySelector("#teamEmpire").addEventListener('click', function(){ createGame("empire"); });
}


function createGame(team) {
  var teamChoice = team;
document.getElementById('titleScreen').style.display = 'none';
document.getElementById('chooseTeamTxt').style.display = 'none';
document.querySelector("#choose").style.display = 'none';
document.querySelector("#teamRebel").style.display = 'none';
document.querySelector("#teamEmpire").style.display = 'none';
document.getElementById('gameBody').innerHTML += '<div id="pointKeeper"><div id="rebelPoints"><img id="turnOne" src="images/turn.png" alt="turn ind"/><br> <h2>Rebel Team</h2>  <p id="rebelMatches">0</p> </div> <div id="empirePoints"><img id="turnTwo" src="images/turn.png" alt="turn ind"/> <h2>Empire Team</h2> <p id="empireMatches">0</p> </div></div>';
if (teamChoice === "rebel") {
    document.querySelector("#turnTwo").style.opacity = 0;
    matching.rebel = true;
}
else {
  document.querySelector("#turnOne").style.opacity = 0;
  matching.rebel = false;
}

  var a = "00";
  var random1 = [];
  var random2 = [];
  var num1 = 0;
  var num2 = 0;
  starter = true;
  for(var i = 0;i < 32;i++){
    if(starter){
     random1[i] = Math.floor((Math.random() * 32) + 1);
     random2[i] = Math.floor((Math.random() * 32) + 1);

      var num1 = random1[i];
      document.getElementById('gameBody').innerHTML += '<div class="card hvr-pulse-grow" id="card' + random1[i] + '"> <div id="back' + random1[i] + '" onclick="matching.clickBox(' + i + ','+ random1[i] +',' + random1[i] + ')"> <img id="pic' + random1[i] + '" src="images/' + random1[i] + '.jpg" /></div>';
      var num2 = random2[i];
      document.getElementById('gameBody').innerHTML += '<div class="card hvr-pulse-grow" id="card' + random2[i] + a + '"> <div id="back' + random2[i] + '" onclick="matching.clickBox(' + i + ','+ random2[i] +',' + random2[i] + a + ')"> <img id="pic' + random2[i] + a + '" src="images/' + random2[i] + '.jpg" /></div>';
      starter = false;
    }
    else{
    while(random1.indexOf(num1) > -1){
      num1 = Math.floor((Math.random() * 32) + 1);
    }
    while(random2.indexOf(num2) > -1){
      num2 = Math.floor((Math.random() * 32) + 1);
    }
    random1[i] = num1;
      random2[i] = num2;
      document.getElementById('gameBody').innerHTML += '<div class="card hvr-pulse-grow" id="card' + random1[i] + '"> <div id="back' + random1[i] + '" onclick="matching.clickBox(' + i + ','+ random1[i] +',' + random1[i] + ')"> <img id="pic' + random1[i] + '" src="images/' + random1[i] + '.jpg" /></div>';
      document.getElementById('gameBody').innerHTML += '<div class="card hvr-pulse-grow" id="card' + random2[i] + a + '"> <div id="back' + random2[i] + '" onclick="matching.clickBox(' + i + ','+ random2[i] +',' + random2[i] + a + ')"> <img id="pic' + random2[i] + a + '" src="images/' + random2[i] + '.jpg" /></div>';
    }
  }


}

var matching = {

  rebel: '',
  flipOne: true,
  flipTwo: false,
  calculate: false,
  choiceOne: '',
  choiceTwo: '',
  number1: '',
  number2: '',
  canClick: true,
  value1: '',
  value2: '',
  newScoreR: 0,
  newScoreE: 0,

clickBox: function(container,choice,num) {
if (this.canClick) {


  if (this.flipOne) {
    document.getElementById('pic' + num).style.opacity = 1;
    this.choiceOne = choice;
    this.number1 = num;
    this.flipOne = false;


  }
  else if (this.flipTwo) {
    document.getElementById('pic' + num).style.opacity = 1;
    this.choiceTwo = choice;
    this.number2 = num;
    this.flipTwo = false;
    this.calculate = true;
    this.canClick = false;
  }
  if (this.calculate && matching.number2 === matching.number1) {
    this.calculate = false;
    this.choiceTwo = '';
    this.number2 = '';
    this.flipTwo = true;
    this.calculate = false;
    this.canClick = true;
  }
 if (this.calculate) {
  setTimeout(this.calculateChoices, 1800);
  }
  if (!this.flipOne) {
    this.flipTwo = true;
  }
}

},

resetCards: function() {
  matching.flipOne = true;
  matching.flipTwo = false;
  matching.calculate = false;
  matching.choiceOne = '';
  matching.choiceTwo = '';
  matching.number1 = '';
  matching.number2 = '';
  matching.canClick = true;
},

calculateChoices: function() {
  if (matching.choiceOne === matching.choiceTwo) {
    document.getElementById('pic' + matching.number1).style.opacity = 0;
    document.getElementById('pic' + matching.number2).style.opacity = 0;
    document.getElementById('card' + matching.number1).style.opacity = 0;
    document.getElementById('card' + matching.number2).style.opacity = 0;
    if (matching.rebel) {
      matching.value1 = document.querySelector("#rebelMatches").innerHTML;
      matching.newScoreR = parseInt(matching.value1,10) + 1;
      document.querySelector("#rebelMatches").innerHTML = matching.newScoreR;
    }
    else {
      matching.value2 = document.querySelector("#empireMatches").innerHTML;
      matching.newScoreE = parseInt(matching.value2,10) + 1;
        document.querySelector("#empireMatches").innerHTML = matching.newScoreE;
        matching.rebel = false;
    }
    var combined = parseInt(matching.newScoreR,10) + parseInt(matching.newScoreE,10);
    var winner;
    var rebels = parseInt(matching.newScoreR,10);
    var empire = parseInt(matching.newScoreE,10)
    if (combined === 32) {
      if (rebels == empire) {
        winner = "Its a tie!"
      }
      else if (rebels > empire) {
        winner = "The Rebels have won!"
      }
      else {
        winner = "The Empire has won!"
      }
      document.querySelector("#gameBody").innerHTML = '<div class="animated slideInDown" id="gameOver"><h1>'+ winner +'<h1><a href="index.html">Play again?</a></div>'
    }


    matching.resetCards();
  }
  else {
    document.getElementById('pic' + matching.number1).style.opacity = 0;
    document.getElementById('pic' + matching.number2).style.opacity = 0;
    if (matching.rebel) {
      document.querySelector("#turnTwo").style.opacity = 1;
      document.querySelector("#turnOne").style.opacity = 0;
      matching.rebel = false;
    }
    else {
      document.querySelector("#turnTwo").style.opacity = 0;
      document.querySelector("#turnOne").style.opacity = 1;
      matching.rebel = true;
    }
    matching.resetCards();
  }


},




loadPictures : function() {
  var httpRequest = new XLMHttprequest();
  httpRequest.onreadystatechange = function() {
    if (this.readState === 4 && this.status === 200) {

    }
  };
}
};
