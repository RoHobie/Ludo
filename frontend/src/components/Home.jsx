import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomIdInput, setRoomIdInput] = useState("");
  const navigate = useNavigate();

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    setShowOptions(true);
  };

  const handleCreateRoom = async () => {
    try {
      const res = await fetch("http://localhost:3000/room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName: name }),
      });
      const data = await res.json();
      navigate(`/room/${data.roomId}`, { state: { name } });
    } catch (err) {
      alert("Failed to create room");
    }
  };

  const handleJoinRoom = async () => {
    if (!roomIdInput.trim()) {
      alert("Room Code is required");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/room/${roomIdInput.trim().toUpperCase()}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ playerName: name }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }
      navigate(`/room/${roomIdInput.trim().toUpperCase()}`, { state: { name } });
    } catch (err) {
      alert("Failed to join room");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 relative">
      <h1 className="text-3xl font-bold mb-4">Ludo Lobby</h1>
      {!showOptions && (
        <form
          className="flex flex-col items-center space-y-2"
          onSubmit={handleNameSubmit}
        >
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Continue
          </button>
        </form>
      )}

      {showOptions && (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-lg">
            Welcome,{" "}
            <span className="font-semibold" data-testid="welcome-username">
              {name}
            </span>
          </div>
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCreateRoom}
            >
              Create Room
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowJoinModal(true)}
            >
              Join Room
            </button>
          </div>
        </div>
      )}

      {/* Modal for joining room */}
      {showJoinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
          <div className="bg-white rounded shadow-lg p-6 w-80 flex flex-col items-center">
            <div className="text-lg font-semibold mb-2">Enter Room Code</div>
            <input
              className="border p-2 rounded w-full mb-4 text-center"
              type="text"
              placeholder="Room Code"
              value={roomIdInput}
              onChange={(e) => setRoomIdInput(e.target.value.toUpperCase())}
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setShowJoinModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleJoinRoom();
                  setShowJoinModal(false);
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
