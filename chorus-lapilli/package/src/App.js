import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [isMove, setIsMove] = useState(false);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [counter, setCounter] = useState(0);
  const [index, setIndex] = useState(-1);

  function handleClick(i) {
    if (calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (counter > 5) {
      if ((squares[i] == "X" && xIsNext) || (squares[i] == "O" && !xIsNext)) {
        setIsMove(true);
        setIndex(i);
        return;
      } else if (isMove) {
        if (validMove(index, i) && squares[i] == null) {
          nextSquares[i] = xIsNext ? "X" : "O";
          nextSquares[index] = null;
          setIsMove(false);
        } else {
          setIsMove(false);
          return;
        }
      } else return;
      if (
        ((squares[4] == "X" && xIsNext) || (squares[4] == "O" && !xIsNext)) &&
        index != 4
      ) {
        if (!calculateWinner(nextSquares)) {
          return;
        }
      }
    } else {
      if (squares[i]) {
        return;
      }
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      setCounter(counter + 1);
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function validMove(i, j) {
    if (i === 0) return j === 1 || j === 3 || j === 4;
    else if (i === 1)
      return j === 0 || j === 2 || j === 4 || j === 3 || j === 5;
    else if (i === 2) return j === 1 || j === 4 || j === 5;
    else if (i === 3)
      return j === 0 || j === 1 || j === 4 || j === 6 || j === 7;
    else if (i === 4) return true;
    else if (i === 5)
      return j === 1 || j === 2 || j === 4 || j === 7 || j === 8;
    else if (i === 6) return j === 3 || j === 4 || j === 7;
    else if (i === 7)
      return j === 3 || j === 4 || j === 5 || j === 6 || j === 8;
    else if (i === 8) return j === 4 || j === 5 || j === 7;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
