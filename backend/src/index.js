const RoomManager = require('./game/roomManager');

const manager = new RoomManager();
const roomId = manager.createRoom();
console.log(`Room created: ${roomId}`);

manager.joinRoom(roomId, 'Alice');
manager.joinRoom(roomId, 'Bob');

const game = manager.getRoom(roomId);
console.log(game.getState());
