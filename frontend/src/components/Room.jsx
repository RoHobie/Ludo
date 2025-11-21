export default function LudoBoard() {
  const renderCell = (row, col) => {
    let className = 'border border-gray-300 box-border';
    const tokens = [];
    
    // Red home area (top-left)
    if (row < 6 && col < 6) {
      className += ' bg-red-500';
      // Add tokens
      if ((row === 1 || row === 4) && (col === 1 || col === 4)) {
        tokens.push(
          <div
            key="token"
            className="w-3/5 h-3/5 rounded-full m-[20%] bg-red-500 border-2 border-gray-800"
          />
        );
      }
    }

    //Red home path
    if(row === 7 && col >= 1 && col <= 5){
      className += ' bg-red-500';
    }
    
    // Green home area (top-right)
    if (row < 6 && col > 8) {
      className += ' bg-green-500';
      // Add tokens
      if ((row === 1 || row === 4) && (col === 10 || col === 13)) {
        tokens.push(
          <div
            key="token"
            className="w-3/5 h-3/5 rounded-full m-[20%] bg-green-500 border-2 border-gray-800"
          />
        );
      }
    }

    // Green home path
    if(col === 7 && row >= 1 && row <= 5){
      className += ' bg-green-500';
    }
    
    // Blue home area (bottom-left)
    if (row > 8 && col < 6) {
      className += ' bg-blue-500';
      // Add tokens
      if ((row === 10 || row === 13) && (col === 1 || col === 4)) {
        tokens.push(
          <div
            key="token"
            className="w-3/5 h-3/5 rounded-full m-[20%] bg-blue-500 border-2 border-gray-800"
          />
        );
      }
    }

    // Blue home path
    if(col === 7 && row >= 9 && row <= 13){
      className += ' bg-blue-500';
    }
    
    // Yellow home area (bottom-right)
    if (row > 8 && col > 8) {
      className += ' bg-yellow-400';
      // Add tokens
      if ((row === 10 || row === 13) && (col === 10 || col === 13)) {
        tokens.push(
          <div
            key="token"
            className="w-3/5 h-3/5 rounded-full m-[20%] bg-yellow-400 border-2 border-gray-800"
          />
        );
      }
    }

    // Yellow home path
    if(row === 7 && col >= 9 && col <= 13){
      className += ' bg-yellow-400';
    }
    
    // Center area
    if (row >= 6 && row <= 8 && col >= 6 && col <= 8) {
      className += ' bg-gradient-to-br from-red-500 via-green-500 to-blue-500';
    }
    
    // Red path
    if (col === 6 && row >= 0 && row < 6) {
      className += ' bg-white';
      if (row === 1) {
        tokens.push(
          <div key="star" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-800">
            ★
          </div>
        );
      }
    }
    if (row === 6 && col >= 6 && col <= 8) {
      className += ' bg-red-500';
    }
    
    // Green path
    if (row === 6 && col > 8 && col <= 14) {
      className += ' bg-white';
      if (col === 13) {
        tokens.push(
          <div key="star" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-800">
            ★
          </div>
        );
      }
    }
    if (col === 8 && row >= 6 && row <= 8) {
      className += ' bg-green-500';
    }
    
    // Blue path
    if (col === 8 && row > 8 && row <= 14) {
      className += ' bg-white';
      if (row === 13) {
        tokens.push(
          <div key="star" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-800">
            ★
          </div>
        );
      }
    }
    if (row === 8 && col >= 6 && col <= 8) {
      className += ' bg-blue-500';
    }
    
    // Yellow path
    if (row === 8 && col >= 0 && col < 6) {
      className += ' bg-white';
      if (col === 1) {
        tokens.push(
          <div key="star" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-800">
            ★
          </div>
        );
      }
    }
    if (col === 6 && row >= 6 && row <= 8) {
      className += ' bg-yellow-400';
    }
    
    // Outer paths
    if (col === 1 && row >= 6 && row <= 8) className += ' bg-white';
    if (col === 2 && row === 6) className += ' bg-white';
    if (col === 13 && row >= 6 && row <= 8) className += ' bg-white';
    if (col === 12 && row === 8) className += ' bg-white';
    if (row === 1 && col >= 6 && col <= 8) className += ' bg-white';
    if (row === 2 && col === 8) className += ' bg-white';
    if (row === 13 && col >= 6 && col <= 8) className += ' bg-white';
    if (row === 12 && col === 6) className += ' bg-white';
    
    return (
      <div key={`${row}-${col}`} className={`${className} relative`}>
        {tokens}
      </div>
    );
  };

  const cells = [];
  for (let row = 0; row < 15; row++) {
    for (let col = 0; col < 15; col++) {
      cells.push(renderCell(row, col));
    }
  }

  return (
    <div className="m-0 p-5 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[600px] h-[600px] grid grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] bg-white border-4 border-gray-800">
        {cells}
      </div>
    </div>
  );
}