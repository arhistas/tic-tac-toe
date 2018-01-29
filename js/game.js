var nameSpan = document.getElementById('name'),
	gameBox = document.getElementById('game-box');

 var players = ['X','O'], names = [], results = [],
    combinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
var currIndex = 1;
var started = false;

function isWon(value) {
  var combination, i, j, len = combinations.length;

  for (i = 0; i < len; i++) {
    combination = combinations[i];

    for (j = 0; j < len; j++) {
      if (results[combination[j]] !== value) {
		break;
	  }
    }

    if (j === 3) {
		return true;
	}
  }

  return false;
}

function isGameOver() {
  var i, inputs = gameBox.getElementsByTagName('input');
  var allFilled = true;
     
  for (i = 0; i < inputs.length; i++) {
    results[i] = inputs[i].value;
	allFilled = allFilled && !!inputs[i].value;
  }

  for (i = 0; i < players.length; i++) {
    if (isWon(players[i])) {
      alert('The winner is ' + names[i] + '!');
      return;
    }
  }
  
  if (allFilled) {
	alert('Game over!');
      return;
  }
}

function triggerPlayer() {  
  currIndex = currIndex === 0 ? 1 : 0;
  
  nameSpan.className = players[currIndex];
  nameSpan.innerHTML = names[currIndex]; 
}

function onClick(input) {
  var symbol = players[currIndex];
  
  
  if (!started) {
	return;
  }
  
  input.disabled = "disabled";
  input.value = symbol;
  input.classList.add(symbol);

  triggerPlayer();
  setTimeout(function() {
	isGameOver();
	}, 0);
  ;
}

function doSubmit(form) {
  var i, inputs = form.getElementsByTagName('input');
  
  for (i = 0; i < inputs.length; i++) {
    names[i] = inputs[i].value || inputs[i].id;
	inputs[i].disabled = "disabled";
  }
  
  form.getElementsByTagName('button')[0].disabled = "disabled";
  document.getElementById('invite').innerHTML = "Let's play, " + names[0] + " and " + names[1]; 
  started = true;
  triggerPlayer();
  
  return false;
}