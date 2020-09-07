const getPlayers = () => {
  let parentPlayer1 = document.querySelector('#name_player1');
  let divChildOne = document.createElement('div');
  divChildOne.innerHTML =`${player1.name}`;
  parentPlayer1.appendChild(divChildOne);

  let parentPlayer2 = document.querySelector('#name_player2');
  let divChildTwo = document.createElement('div');
  divChildTwo.innerHTML =`${player2.name}`;
  parentPlayer2.appendChild(divChildTwo);
}


const board_Player1 = document.querySelector('#board_player1');
const board_Player2 = document.querySelector('#board_player2');
const player1_lives = document.querySelector('#ships_player1');
const player2_lives = document.querySelector('#ships_player2');
const playerTurn = document.querySelector('#turn_player');


const buttons = document.querySelector('#buttons');
const resetButton = document.createElement('button');
const newButton = document.createElement('button');
buttons.appendChild(resetButton);
buttons.appendChild(newButton);
resetButton.textContent = 'Reset';
newButton.textContent = 'New Game';



const player1 = {
  name: prompt('Name of Player 1'), 
  shipsLeft: player1_lives.innerHTML = 4

  }

const player2 = {
  name: prompt('Name of Player 2'),
  shipsLeft: player2_lives.innerHTML = 4
};



function createIcon(cellBkg) {
  cellBkg.style.backgroundImage = 'url("ship.png")';
}


const addShips = board => {
  for(let ship = 0; ship < 4; ship++) {
    let xCoord = Math.floor(Math.random() * 4);
    let yCoord = Math.floor(Math.random() * 4);
    let cell1 = board.getElementsByTagName('li')[xCoord];
    let cell2 = cell1.getElementsByTagName('div')[yCoord];
      if (cell2.value === 0) {
        cell2.value = 1;
      }else{continue}
  }
}


const createPlayersBoard = cells => {
    for (var x = 0; x < 4; x++) {
      const li = document.createElement('li'); 
        for (var y = 0; y < 4; y++) {
          const cell = document.createElement('div');
          cell.className = "square"; 
          cell.textContent = ''; 
          cell.value = 0;
          cell.addEventListener( 'click', battleShip);
          li.appendChild(cell); 
        }
       cells.appendChild(li); 
    }
  }

  


const removeMsg = () => {
  let oldMessage_Winner = document.querySelector('.turn-winner p');
  oldMessage_Winner.style.display = "none";
  
  }

const buttonsActions = (e) => {
  let button = e.target;
  if (button === newButton) {
    location.reload();
  } else if (button === resetButton) {
    player1_lives.innerText= 4;
    player2_lives.innerText = 4;
    board_Player1.innerText = ''; 
    board_Player2.innerText = '';
    removeMsg();
    confetti.stop();
    createPlayersBoard(board_Player1);
    addShips(board_Player1);
    createPlayersBoard(board_Player2);
    addShips(board_Player2);
  }
}

let currentPlayer = player1;
playerTurn.textContent = player1.name;
const message = document.querySelector('.turn-winner');
let message_Winner = document.createElement('p');


const battleShip = (e) => {
  let cell = e.target; 
  message_Winner.innerHTML = '';
  message.appendChild(message_Winner);
  if (currentPlayer === player1 && board_Player2.contains(cell)) {
    if (cell.value === 1) {
      createIcon(cell);
      player2_lives.textContent--;
      currentPlayer = player1;
      if (player2_lives.textContent === "0") {
        message_Winner.style.display = "block";
        message_Winner.innerHTML =`${currentPlayer.name}. WINS!`
        confetti.start();
        
      }
    } else if (cell.value === 0) {
      cell.style.backgroundImage = 'url("explosion.png")';
      currentPlayer = player2;
      playerTurn.textContent = player2.name;
    } 
  } else if (currentPlayer === player2 && board_Player1.contains(cell)) {
    if (cell.value === 1) {
      createIcon(cell);
      player1_lives.textContent--;
      currentPlayer = player2;
      if (player1_lives.textContent === "0") {
        message_Winner.style.display = "block";
        message_Winner.innerHTML =`${currentPlayer.name} WINS!`;
        confetti.start();
        
      }
    } else if (cell.value === 0) {
      currentPlayer = player1;
      cell.style.backgroundImage = 'url("explosion.png")';
      playerTurn.textContent = player1.name;
    }
  }
  return `${currentPlayer.name} WINS!`;
}


resetButton.addEventListener('click', buttonsActions);
newButton.addEventListener('click', buttonsActions);

getPlayers ();
createPlayersBoard(board_Player1);
addShips(board_Player1);
createPlayersBoard(board_Player2);
addShips(board_Player2);
  