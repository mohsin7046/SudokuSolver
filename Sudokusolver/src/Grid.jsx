import React, { useState } from 'react';

const Grid = ({ size = 9 }) => {
  // Dynamically create a grid of m x m based on size
  const [grid, setGrid] = useState(Array(size).fill('').map(() => Array(size).fill('')));

  const handleChange = (row, col, value) => {
    const newGrid = grid.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? value : c)) : r
    );
    setGrid(newGrid);
  };

  const handleSolve = async () => {
    const response = await fetch('http://localhost:5000/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grid }),
    });
    const data = await response.json();
    setGrid(data.solution);
  };

  const handleGenerate = async () => {
    const response = await fetch('http://localhost:5000/generate');
    const data = await response.json();
    setGrid(data.grid);
  };

  const handleRandom = () => {
    const newGrid = Array(size).fill('').map(() => Array(size).fill(''));

    // Fill random cells with numbers from 1 to size
    const filledCells = Math.floor((size * size) * 0.3); // Fill ~30% of cells
    for (let i = 0; i < filledCells; i++) {
      const randomRow = Math.floor(Math.random() * size);
      const randomCol = Math.floor(Math.random() * size);
      const randomValue = Math.floor(Math.random() * size) + 1;
      newGrid[randomRow][randomCol] = randomValue.toString();
    }

    setGrid(newGrid);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Dynamic {size}x{size} Grid</h1>
      <div className={`grid grid-cols-${size} gap-1`}>
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              maxLength="1"
              className="w-10 h-10 text-center border border-gray-300"
              value={cell}
              onChange={(e) => handleChange(i, j, e.target.value)}
            />
          ))
        )}
      </div>
      <div className="mt-4 space-x-2">
        <button onClick={handleSolve} className="btn btn-primary">Solve</button>
        <button onClick={handleGenerate} className="btn btn-secondary">Generate</button>
        <button onClick={handleRandom} className="btn btn-warning">Random</button>
      </div>
    </div>
  );
};

export default Grid;
