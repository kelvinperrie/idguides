import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import setData from './data/test.json'


function Square({value, onSquareClick }) {
  //const [value, setValue] = useState(null);

  function handleClick() {
    console.log("clicked")
    //setValue("X")
  }

  return <button className="square" onClick={onSquareClick }>{value}</button>;
}

function Guide({guide}) {
  

  return (
    <div className="guide">
      <div className="guide-title">
        <a href={guide.url}>{guide.title}</a>
      </div>
      <div className="guide-summary">{guide.summary}</div>
    </div>
  )
}

function Set({theSet, index}) {
  console.log(theSet)

  let elementId = "Set_" + theSet.name.replaceAll(" ", "_");

  const guideRender = theSet.guides.map((guide,index) => {
    return (<Guide guide={guide} key={index} />);
  });

  return <div className="set" id={elementId}>
      <div className='set-title'>{theSet.name}</div>
      <div className="guides-container">
        {guideRender}
      </div>
    </div>
}

function MenuItem({set}) {
  
  let elementId = "#" + "Set_" + set.name.replaceAll(" ", "_");


  return (
    <div>
      <a href={elementId}>{set.name}</a>
    </div>
  );
}

function Menu({allData}) {

  const menuItemsRender = allData.map((set,index) => {
    return (
        <MenuItem set={set} key={index}/>
    );
  });

  return (
    <div className="menu">
      {menuItemsRender}
    </div>
  )
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  console.log(setData);

  var sets = setData;

  const setsRender = sets.map((aset,index) => {
    //console.log("aset is:" + aset.name)
    return (
        <Set theSet={aset} index={index} key={index}/>
    );
  });

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Menu allData={sets}/>
        </div>
        <div className="col">
          
        {setsRender}
        </div>
      </div>
    </div>
    <div>
    </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
      </div>
    </>
  );
}

function ThisSucks() {
  return (<div>CRAP</div>)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          {ThisSucks()}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Board;
