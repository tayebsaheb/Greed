/*

Created by Tayeb Sahebzada

Greed RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



//Declare variables we are going to need
var scores = [0,0];
var roundScore = 0;
var currentPlayer = 0;

var dice;

//Hide the dice in the beginning
document.querySelector('.dice').style.display = 'none';

// These are the buttons, basically saying on click do these functions (turn,hold,or newGame)
document.querySelector('.btn-roll').addEventListener('click',turn );
document.querySelector('.btn-hold').addEventListener('click',hold );
document.querySelector('.btn-new').addEventListener('click',newGame );


function turn(){
    // dice has to be a number from 1 to 6, math.random generates a number from 0-1 so we multiply.
    //math.floor removes the decimal
    dice = Math.floor(Math.random() * 6) + 1;
    
    //variable dicedom is to save time so we dont have to keep typing document.... out
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //as long as the dice does not equal one keep on adding
    if(dice != 1){
    document.querySelector('#current-' + currentPlayer).textContent = (roundScore += dice);
    }
    
    // if it equals 1 , reset your round score to 0 and you lose your turn.
    //you got greedy.
    else{
        roundScore = 0;
        document.querySelector('#current-' + currentPlayer).textContent = roundScore;
        hold();

    }
    
}

//honestly don't need a function to point to another function only
//This just helped me keep track of where I am.
function hold(){
//once you click hold itll do what setScore function does
 setScore();    
}
    
    
//This is where we set the score by adding round score to your main score.
function setScore(){
        scores[currentPlayer] += roundScore;
         // change text to display correct score
        document.querySelector('#score-' + currentPlayer).textContent = scores[currentPlayer];
         //reset round score
        roundScore = 0;
         //display that the round score was reset
    document.querySelector('#current-' + currentPlayer).textContent = roundScore;
         
         //Within this function we have another function to see if you won
        checkIfWinner();

    }


// This just creates a new game, resets everything.
function newGame(){
    
    scores = [0,0];
    currentPlayer = 0;
    roundScore = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#score-0').textContent = scores[0];
    document.querySelector('#score-1').textContent = scores[1];

    document.querySelector('#current-0').textContent = roundScore;
    document.querySelector('#current-1').textContent = roundScore;
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    

    
}

function checkIfWinner(){
    // if your score is >= 100 , hide everything and display winner
    if (scores[currentPlayer] >= 100){
        document.getElementById('name-' + currentPlayer).textContent = 'WINNER!'
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';

    }
    else{
        //if you didn't win, switch turns, make current player active by changing color and 
        //displaying red dot next to player name
        
          if (currentPlayer === 0){
         currentPlayer = 1;
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
          }
        
        
        
        else{
              currentPlayer = 0;
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        }
    }
    
}