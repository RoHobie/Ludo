import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Room() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // Load from localStorage if not in location.state
  const playerName =
    location.state?.name ||
    localStorage.getItem("playerName") ||
    "Guest";
  const [roomState, setRoomState] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!playerName) {
      alert("No name provided, redirecting...");
      navigate("/");
      return;
    }
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("roomId", roomId);
    fetchRoomState();
  }, []);

  const fetchRoomState = async () => {
    try {
      // Fixed: Added /state to the endpoint
      const res = await fetch(
        `http://localhost:3000/room/${roomId}/state`
      );
      if (!res.ok) throw new Error("Failed to fetch room info");
      const data = await res.json();
      setRoomState(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load room");
    }
  };

  const handleStartGame = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/room/${roomId}/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        alert(`Error: ${data.error}`);
        return;
      }
      fetchRoomState(); // Refresh state after starting
    } catch (err) {
      console.error(err);
      alert("Failed to start game");
    }
  };

  const handleQuitRoom = async () => {
    try {
      await fetch(
        `http://localhost:3000/room/${roomId}/leave`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerName }),
        }
      );
    } catch (err) {
      // ignore error
    }
    localStorage.removeItem("playerName");
    localStorage.removeItem("roomId");
    navigate("/");
  };

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">{error}</div>
    );
  }

  if (!roomState) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Loading room...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6">
      <h1 className="text-3xl font-bold">Room: {roomId}</h1>
      <p className="text-lg text-gray-700">You are: {playerName}</p>

      <div className="bg-white p-4 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Players</h2>
        <ul className="list-disc list-inside">
          {roomState.players.map((p, i) => (
            <li key={i}>{p.name}</li>
          ))}
        </ul>
      </div>

      {!roomState.started && roomState.players[0].name === playerName && (
        <button
          onClick={handleStartGame}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Start Game
        </button>
      )}

      {roomState.started && (
        <div className="text-blue-600 font-semibold text-lg">
          Game Started!
        </div>
      )}

      <button
        onClick={handleQuitRoom}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Quit Room
      </button>
    </div>
  );
}