const {LudoGame} = require('./coreLogic');

class RoomManager {
    constructor(){
        this.rooms = new Map();
    }

    generateRoomId(length = 4){
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id;
        do {
            id = Array.from({length}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
        }while(this.rooms.has(id));
        return id;
    }

    createRoom(){
        const roomId = this.generateRoomId();
        const game = new LudoGame();
        this.rooms.set(roomId, game);
        return roomId;
    }

    joinRoom(roomId, playerName){
        const game = this.rooms.get(roomId);
        if(!game) throw new Error('Room does not exist');
        return game.addPlayer(playerName);
    }

    getRoom(roomId){
        return this.rooms.get(roomId);
    }

    deleteRoom(roomId){
        this.rooms.delete(roomId);
    }
}

module.exports = {RoomManager};
