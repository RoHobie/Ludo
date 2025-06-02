class Piece {
  constructor(id) {
    this.id = id;
    this.position = -1; //-1 = house, 0+ = board, 57 = base
  }

  inHouse() {
    return this.position === -1;
  }

  inBase() {
    return this.position === 57;
  }

  move(steps) {
    if (this.position + steps <= 57) {
      this.position += steps;
    }
  }
}

class Player {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.pieces = [0, 1, 2, 3].map((id) => new Piece(id));
    this.hasFinished = false;
  }

  allPiecesHome() {
    return this.pieces.every((p) => p.inBase());
  }
}
class LudoGame {
  constructor() {
    this.players = [];
    this.currentTurnIndex = 0;
    this.maxPlayers = 4;
    this.colors = ["red", "blue", "green", "yellow"];
    this.started = false;
  }

  startGame() {
    if (this.players.length < 2) {
      throw new Error("Need at least 2 players to start the game");
    }
    this.started = true;
  }

  addPlayer(name) {
    if (this.players.length >= this.maxPlayers) {
      throw new Error("Room full");
    }

    const color = this.colors[this.players.length];
    const player = new Player(name, color);
    this.players.push(player);
    return player;
  }

  getCurrentPlayer() {
    if (!this.started) throw new Error("Game not started");
    return this.players[this.currentTurnIndex];
  }

  nextTurn() {
    this.currentTurnIndex = (this.currentTurnIndex + 1) % this.players.length;
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1; //adding 1 coz Math.floor() rounds down to the preceding whole number
  }

  movePiece(playerName, pieceId, steps) {
    if (!this.started) throw new Error("Game has not started yet");

    const player = this.players.find((p) => p.name === playerName);
    if (!player) throw new Error("Player not found");

    const piece = player.pieces[pieceId];
    if (!piece) throw new Error("Invalid piece");

    piece.move(steps);
    if (player.allPiecesHome()) {
      player.hasFinished = true;
    }
  }

  getState() {
    return {
      players: this.players.map((p) => ({
        name: p.name,
        color: p.color,
        pieces: p.pieces.map((pc) => pc.position),
        hasFinished: p.hasFinished,
      })),
      currentTurn: this.started ? this.getCurrentPlayer().name : null,
      started: this.started,
    };
  }

  getPlayer(name) {
    return this.players.find((p) => p.name === name);
  }
}

module.exports = { LudoGame };
