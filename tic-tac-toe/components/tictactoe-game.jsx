"use client";

import React from "react";

function TicTacToe() {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = React.useState(true);
  const [gameMode, setGameMode] = React.useState("two"); // 'one' or 'two'
  const [difficulty, setDifficulty] = React.useState("easy"); // 'easy' or 'hard'

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((cell) => cell !== null)
    ? "It's a draw!"
    : `Next player: ${isXNext ? "X" : "O"}`;

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    if (gameMode === "one" && isXNext) {
      setTimeout(() => {
        if (!calculateWinner(newBoard) && newBoard.includes(null)) {
          if (difficulty === "easy") {
            makeEasyMove(newBoard);
          } else {
            makeHardMove(newBoard);
          }
        }
      }, 500);
    }

    setIsXNext(!isXNext);
  }

  // Easy mode: random empty square
  function makeEasyMove(currentBoard) {
    const emptySquares = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    if (emptySquares.length === 0) return;

    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const newBoard = [...currentBoard];
    newBoard[randomIndex] = "O";
    setBoard(newBoard);
    setIsXNext(true);
  }

  // Hard mode: Minimax algorithm
  function makeHardMove(currentBoard) {
    const bestMove = minimax(currentBoard, "O").index;
    const newBoard = [...currentBoard];
    newBoard[bestMove] = "O";
    setBoard(newBoard);
    setIsXNext(true);
  }

  function minimax(newBoard, player) {
    const availSpots = newBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((idx) => idx !== null);

    const winnerCheck = calculateWinner(newBoard);
    if (winnerCheck === "X") return { score: -10 };
    if (winnerCheck === "O") return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      newBoard[availSpots[i]] = player;

      if (player === "O") {
        const result = minimax(newBoard, "X");
        move.score = result.score;
      } else {
        const result = minimax(newBoard, "O");
        move.score = result.score;
      }

      newBoard[availSpots[i]] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h1>

      {/* Mode Selection */}
      <div className="mb-4">
        <button
          onClick={() => setGameMode("one")}
          className={`mr-2 px-4 py-2 rounded hover:bg-green-600 ${
            gameMode === "one"
              ? "bg-green-500 text-white border-1 border-white"
              : "bg-green-500 text-white"
          }`}
        >
          One Player
        </button>
        <button
          onClick={() => setGameMode("two")}
          className={`px-4 py-2 rounded hover:bg-blue-600 ${
            gameMode === "two"
              ? "bg-blue-500 text-white border-1 border-white"
              : "bg-blue-500 text-white"
          }`}
        >
          Two Player
        </button>
      </div>

      {/* Difficulty Selection */}
      {gameMode === "one" && (
        <div className="mb-4">
          <button
            onClick={() => setDifficulty("easy")}
            className={`mr-2 px-4 py-2 rounded hover:bg-yellow-600 ${
              difficulty === "easy"
                ? "bg-yellow-500 text-white border-1 border-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => setDifficulty("hard")}
            className={`px-4 py-2 rounded hover:bg-red-600 ${
              difficulty === "hard"
                ? "bg-red-500 text-white border-1 border-white"
                : "bg-red-500 text-white"
            }`}
          >
            God Mode 😱
          </button>
        </div>
      )}

      {/* Dynamic Mode Message */}
      <p className="mb-4 font-semibold text-lg">
        {gameMode === "one" ? (
          <>
            You&apos;re playing against{" "}
            <span className="text-xl animate-text-gradient bg-radial-[circle_at_center] from-[#7182ff] to-[#3cff52] bg-[length:200%] bg-clip-text text-transparent pt-8 pb-4">
              {difficulty === "easy" ? "Easy AI" : "Hard AI"}
            </span>
          </>
        ) : (
          "Two Player Mode"
        )}
      </p>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <div
            key={index}
            className="w-20 h-20 border flex items-center justify-center text-xl cursor-pointer hover:bg-gray-800"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Result */}
      <div className="text-xl animate-text-gradient bg-radial-[circle_at_center] from-[#7182ff] to-[#3cff52] bg-[length:200%] bg-clip-text text-transparent pt-8 pb-4">
        {status}
      </div>

      {/* Restart Button */}
      <button
        onClick={restartGame}
        className="mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Restart
      </button>
    </div>
  );
}

export default TicTacToe;
