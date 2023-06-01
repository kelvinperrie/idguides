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

  let organisation = guide.organisation != "" ? <span> ({guide.organisation})</span> : "";

  return (
    <div className="guide">
      <a href={guide.url} target="_blank"><span title="open this guide in a new window" class="material-symbols-outlined open-guide-icon">open_in_new</span></a>
      <div className="guide-title">
        {guide.title}{organisation}
      </div>
      <div className="guide-summary">{guide.summary}</div>
    </div>
  )
}

function Set({set,showFriendly,showScientific}) {

  let elementId = "Set_" + set.name.replaceAll(" ", "_");

  let icon = set.icon ? <span class="material-symbols-outlined">{set.icon}</span> : "";

  const filteredGuides = set.guides.filter(guide => {
    return (showFriendly && guide.accessiblity === "friendly") || (showScientific && guide.accessiblity === "scientific");
  });

  const guideRender = filteredGuides.map((guide,index) => {
    return (<Guide guide={guide} key={index} />);
  });

  return <div className="set" id={elementId}>
      <div className='set-title'>{set.name} {icon}</div>
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
    <>
    <div className="menu">
    Jump to section:
      {menuItemsRender}
    </div>
    </>
  )
}

function LevelOptions({showFriendly, showScientific, handleLevelClick}) {

  let friendlyButtonStyle = showFriendly ? "btn btn-success" : "btn btn-outline-secondary";
  let scientificButtonStyle = showScientific ? "btn btn-success" : "btn btn-outline-secondary";

  return (
    <div className="level-options">
      What type of guides do you want to see? 
      <button type="button" onClick={() => handleLevelClick('friendly')} className={friendlyButtonStyle}>Friendly</button>
      <button type="button" onClick={() => handleLevelClick('scientific')} className={scientificButtonStyle}>Scientific</button>
    </div>
  );
}

function App() {
  const [showFriendly, setShowFriendly] = useState(true);
  const [showScientific, setShowScientific] = useState(false);

  var sets = setData;

  function handleLevelClick(level) {
    if(level === "friendly") {
      setShowFriendly(!showFriendly);
    } else {
      setShowScientific(!showScientific);
    }
  }

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Menu allData={sets}/>
        </div>
        <div className="col">
          <LevelOptions showFriendly={showFriendly} showScientific={showScientific} handleLevelClick={handleLevelClick} />
          {sets.map((set,index) => ( <Set set={set} key={index} showFriendly={showFriendly} showScientific={showScientific}/> ))}
        </div>
      </div>
    </div>
    </>
  );
}


export default App;
