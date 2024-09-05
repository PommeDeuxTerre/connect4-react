"use client";
import { useState } from 'react';

const PLAYER1COLOR = "bg-red-700"
const PLAYER2COLOR = "bg-blue-800"
const EMPTYCOLOR = "bg-white"
const HOVERCOLOR = "bg-black"

function App() {
  return (
    <Connect4 />
  );
}

function Connect4(){
  const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array(7).fill(0)));
  const [hovered, setHovered] = useState([-1, -1]);
  const [player, setPlayer] = useState(1);

  function playMove(x:number, y:number=0){
    // recursively find the lowest free square of the column
    if (y>=6)return;
    if (grid[y][x])return playMove(x, y+1);

    //update grid
    const newGrid = grid.map(row => [...row]);
    newGrid[y][x] = player;
    setGrid(newGrid);

    // update the hover
    setHovered([hovered[0], hovered[1]+1]);

    //update the player's turn
    setPlayer(player % 2 + 1);
  }

  return (
    <div id='connect4' className="w-[91vh] h-[78vh] my-[11vh] mx-auto flex flex-row" onMouseLeave={()=>setHovered([-1, -1])}>
      <Column grid={ grid } x={ 0 } playMove={ playMove } hovered={ hovered } setHovered={ setHovered } />
      <Column grid={ grid } x={ 1 } playMove={ playMove } hovered={ hovered } setHovered={ setHovered } />
      <Column grid={ grid } x={ 2 } playMove={ playMove } hovered={ hovered } setHovered={ setHovered } />
      <Column grid={ grid } x={ 3 } playMove={ playMove } hovered={ hovered } setHovered={ setHovered } />
      <Column grid={ grid } x={ 4 } playMove={ playMove } hovered={ hovered } setHovered={ setHovered } />
      <Column grid={ grid } x={ 5 } playMove={ playMove } hovered={ hovered } setHovered={ setHovered } />
      <Column grid={ grid } x={ 6 } playMove={ playMove } hovered={ hovered } setHovered={ setHovered } />
    </div>
  );
}

function Column({ grid, x, playMove, hovered, setHovered }:{grid:number[][], x:number, playMove:(x:number)=>void, hovered:number[], setHovered:(hovered:number[])=>void}) {
  function columnHover(){
    //get y
    let result = -1;
    for (let i=0;i<6;i++){
      if (!grid[i][x]){
        result = i;
        break;
      }
    }
    setHovered([x, result]);
  }
  return (
    <div className="column w-full h-full flex flex-col" onMouseEnter={columnHover} >
      <Square grid={ grid } x={ x } y={ 5 } playMove={ playMove } hovered={ hovered } />
      <Square grid={ grid } x={ x } y={ 4 } playMove={ playMove } hovered={ hovered } />
      <Square grid={ grid } x={ x } y={ 3 } playMove={ playMove } hovered={ hovered } />
      <Square grid={ grid } x={ x } y={ 2 } playMove={ playMove } hovered={ hovered } />
      <Square grid={ grid } x={ x } y={ 1 } playMove={ playMove } hovered={ hovered } />
      <Square grid={ grid } x={ x } y={ 0 } playMove={ playMove } hovered={ hovered } />
    </div>
  );
}

function Square({ grid, x, y, playMove, hovered }:{grid:number[][], x:number, y:number, playMove:(x:number)=>void, hovered:number[]}) {
  function getSquarecolor(){
    if (grid[y][x] == 1)return PLAYER1COLOR;
    if (grid[y][x] == 2)return PLAYER2COLOR;
    if (x === hovered[0] && y === hovered[1])return HOVERCOLOR;
    return EMPTYCOLOR;
  }
  return (
    <button className="square w-full h-full bg-cyan-700" onClick={()=>playMove(x)}>
      <div className={`w-5/6 h-5/6 ${getSquarecolor()} rounded-full m-auto`}></div>
    </button>
  );
}

export default App;