const express = require('express');
const {RoomManager} = require('./game/roomManager');
const cors = require('cors');
const app = express();
const port = 3000;
const roomManager = new RoomManager();

app.use(express.json());
app.use(cors());

app.post('/room', (req, res) => {   //room creation endpoint
    try{
        const { playerName } = req.body;
        if (!playerName) {
            return res.status(400).json({ error: 'Player name is required' });
        }
        const roomId = roomManager.createRoom();
        roomManager.joinRoom(roomId, playerName);
        res.json({roomId});
    } catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to create room'});
    }
});

app.post('/room/:roomId/join', (req, res) => {  //room joining endpoint
    const {roomId} = req.params;
    const {playerName} = req.body;

    if(!playerName) return res.status(400).json({error: 'Player name is required'});
    try{
        const game = roomManager.getRoom(roomId);
        if (!game) throw new Error("Room does not exist");
        if (game.started) {
            return res.status(400).json({error: 'Game already started'});
        }
        const playerId = roomManager.joinRoom(roomId, playerName);
        res.json({playerId});
    } catch(err){
        console.error(err);
        res.status(400).json({error: err.message || 'Failed to join room'});
    }
});

//get room state

app.get('/room/:roomId/state', (req, res) => {
    const {roomId} = req.params;
    const game = roomManager.getRoom(roomId);

    if(!game) return res.status(404).json({error: 'Room not found'});

    res.json(game.getState());
});

app.post('/room/:roomId/start', (req, res) => {
    const {roomId} = req.params;
    const game = roomManager.getRoom(roomId);

    if(!game) return res.status(404).json({error: 'Room not found'});

    try {
        game.startGame();
        res.json(game.getState());
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}
);

//dice rolling endpoint

app.post('/room/:roomId/roll', (req, res) => {
  const { roomId } = req.params;
  const game = roomManager.getRoom(roomId);
  if (!game) return res.status(404).json({ error: 'Room not found' });

  const roll = game.rollDice();
  res.json({ roll });
});

//piece moving endpoint

app.post('/room/:roomId/move', (req, res) => {
  const { roomId } = req.params;
  const { playerName, pieceId, steps } = req.body;

  const game = roomManager.getRoom(roomId);
  if (!game) return res.status(404).json({ error: 'Room not found' });

  try {
    game.movePiece(playerName, pieceId, steps);
    res.json({ state: game.getState() });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Leave room endpoint
app.post('/room/:roomId/leave', (req, res) => {
    const { roomId } = req.params;
    const { playerName } = req.body;
    try {
        roomManager.leaveRoom(roomId, playerName);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
