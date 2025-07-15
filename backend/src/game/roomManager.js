const { LudoGame } = require("./coreLogic");

class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  generateRoomId() {
    const length = 4;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id;
    do {
      id = Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    } while (this.rooms.has(id));
    return id;
  }

  createRoom() {
    const roomId = this.generateRoomId();
    const game = new LudoGame();
    this.rooms.set(roomId, game);
    return roomId;
  }

  joinRoom(roomId, playerName) {
    const game = this.rooms.get(roomId);
    if (!game) throw new Error("Room does not exist");
    return game.addPlayer(playerName);
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  deleteRoom(roomId) {
    this.rooms.delete(roomId);
  }
  // Add a leaveRoom method
  leaveRoom(roomId, playerName) {
    const game = this.rooms.get(roomId);
    if (!game) throw new Error("Room does not exist");
    game.removePlayer(playerName);
    if (game.players.length === 0) {
      this.deleteRoom(roomId);
    }
  }
}

module.exports = { RoomManager };
