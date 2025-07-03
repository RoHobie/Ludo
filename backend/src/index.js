const RoomManager = require('./game/roomManager');

const manager = new RoomManager();
const roomId = manager.createRoom();
console.log(`Room created: ${roomId}`);
const game = manager.getRoom(roomId);
console.log(game.getState());
