import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

import { useState } from 'react';

const { Badge, Button, Card } = ReactBootstrap;

function Square({value, onSquareClick, isHighlighted}) {
  const className = "square" + (isHighlighted ? " highlight" : "");
  return (
  <button className={className} onClick={onSquareClick}>{value}</button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [selectedSquare, setSelectedSquare] = useState(undefined);
  const currentPlayer = xIsNext ? "X" : "O";  
 
  function handleClick(i) {
  // Keeps track of nonNull number of spaces on board
  const nonNull = squares.filter(squares => squares != null).length;
  const CorrectTurn = (squares[i] === currentPlayer);

    // End game if there is a winner
    if(calculateWinner(squares)) { return; }
    const nextSquares = squares.slice();

    // If the square is empty, and the previously selected square is adjacent to it
    if(!(squares[i])) {
      if(nonNull != 6) {
        nextSquares[i] = currentPlayer;
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
      }
      else if(adjacency(selectedSquare).includes(i) && nonNull === 6) {
        nextSquares[i] = currentPlayer;
        nextSquares[selectedSquare] = null;
        setSelectedSquare(null);
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
        return;
      }
      else if(selectedSquare) { return; }
      else { return; }
    }
    else if(squares[i] && nonNull === 6 && CorrectTurn) {
      console.log("out");
      setSelectedSquare(i);
      return
    } 

    // Bool to determine whether the turn and the square line up

    // if(squares[i] && nonNull === 6 && CorrectTurn) { setSelectedSquare(i); return; }

  }    

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isHighlighted={selectedSquare === 0}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isHighlighted={selectedSquare === 1}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isHighlighted={selectedSquare === 2} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isHighlighted={selectedSquare === 3}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isHighlighted={selectedSquare === 4}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isHighlighted={selectedSquare === 5}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isHighlighted={selectedSquare === 6}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isHighlighted={selectedSquare === 7}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isHighlighted={selectedSquare === 8}/>
      </div>
    </>
  ); 
}

function calculateWinner(squares){

  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function adjacency(i){
  if (i === 0) { return [1,3,4]; }
  if (i === 1) { return [0,2,3,4,5]; }
  if (i === 2) { return [1,4,5]; }
  if (i === 3) { return [0,1,4,6,7]; }
  if (i === 4) { return [0,1,2,3,5, 6, 7, 8]; }
  if (i === 5) { return [1,2,4,7,8]; }
  if (i === 6) { return [3,4,7]; }
  if (i === 7) { return [3,4,5,6,8]; }
  if (i === 8) { return [4,5,7]; }
  return [];
}