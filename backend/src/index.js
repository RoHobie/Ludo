const { LudoGame } = require('./game/coreLogic');

const game = new LudoGame();

// Add 2 players
game.addPlayer('Alice');
game.addPlayer('Bob');

console.log('\nInitial game state:');
console.log(game.getState());

const diceRoll = game.rollDice();
const currentPlayer = game.getCurrentPlayer();
console.log(`\n${currentPlayer.name} rolled a ${diceRoll}`);

game.movePiece(currentPlayer.name, 0, diceRoll);

console.log('\nState after move:');
console.log(game.getState());

game.nextTurn();
console.log(`\nNext turn: ${game.getCurrentPlayer().name}`);
