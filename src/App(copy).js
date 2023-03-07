import React, { useState } from "react";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const squareStyleActive = {
  width: "60px",
  height: "60px",
  backgroundColor: "yellow",
  opacity: "0.5",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const redChecker = {
  width: "50px",
  height: "50px",
  backgroundColor: "red",
  border: "5px brown solid",
  borderRadius: "50%",
};
const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

function Square() {
  return <div className="square" style={squareStyle}></div>;
}

function CheckerSquare() {
  return (
    <div className="square" style={squareStyle}>
      <div style={redChecker}></div>
    </div>
  );
}

function Board() {
  return (
    <div style={containerStyle} className="gameBoard">
      <button style={buttonStyle}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square />
          <CheckerSquare />
          <Square />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

function App(){
  return <Game/>
}

export default App;