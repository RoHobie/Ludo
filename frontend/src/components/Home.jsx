import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    if (!name) {
      alert("Name is required");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName: name }),
      });

      const data = await res.json();
      const roomId = data.roomId;

      navigate(`/room/${roomId}`, { state: { name } });
    } catch (err) {
      alert("Failed to create room");
    }
  };

  const handleJoinRoom = async () => {
    if (!name || !roomId) {
      alert("Name and Room Code are required");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/room/${roomId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName: name }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        alert(`Error: ${error}`);
        return;
      }

      const data = await res.json();
      navigate(`/room/${roomId}`, { state: { name } });
    } catch (err) {
      alert("Failed to join room");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-3xl font-bold">Ludo Lobby</h1>
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Room Code"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value.toUpperCase())}
      />
      <div className="space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleJoinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
