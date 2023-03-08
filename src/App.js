import React, { useState , useRef } from "react";

/* 
Something to find out:
initially had const[king, setKing] = useState(false)
=> becomes true when reaches top row (r===0)
=> however, state did not change... so found a workaround with stateless variable king

hypothesis for state not changing
concept: closure => fn within a fn ;  the inner fn ref a variable that was declared in the outer fn
var in the outer fn will be maintained in mem, even after inner fn returned and is called off the stack 
inner fn has access to state from outer fn at the time it was created 

look into react and pure functions 
it appears that the state isn't modified as a pure fun since it's a fn within fn mutating the global state var 
https://beta.reactjs.org/learn/keeping-components-pure

*/

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "DodgerBlue",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  borderColor: "black",
};

const squareStyleActive = {
  width: "60px",
  height: "60px",
  backgroundColor: "black",
  opacity: "0.5",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
  borderColor: "black",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #666 solid",
  borderColor: "black",
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

// function Square() {
//   return <div className="square" style={squareStyle}></div>;
// }

// function ActiveSquare() {
//   return <div className="square" style={squareStyleActive} ></div>;
// }

// function CheckerSquare() {
//   return (
//     <div className="square" style={squareStyle}>
//       <div style={redChecker}></div>
//     </div>
//   );
// }

function Board() {
  //r = row ; c = column
  const [king, setKing] = useState(false)
  const [board, setBoard] = useState([
    [
      <Box type={1} r={0} c={0} />,
      <Box type={1} r={0} c={1} />,
      <Box type={1} r={0} c={2} />,
    ],
    [
      <Box type={1} r={1} c={0} />,
      <Box type={1} r={1} c={1} />,
      <Box type={1} r={1} c={2} />,
    ],
    [
      <Box type={3} r={2} c={0} />,
      <Box type={1} r={2} c={1} />,
      <Box type={1} r={2} c={2} />,
    ],
  ]);

  function Box({ type, r, c, disabled }) {
    let temp = [];
    for (let i = 0; i < board.length; i++) {
      temp.push([...board[i]]);
    }

    //copy of type to be carried to fn (type prior to assignment)
    let typeBox = type;
    if (type === 1) {
      type = squareStyle;
    } else if (type === 2) {
      type = squareStyleActive;
    } else if (type === 3) {
      type = redChecker;
    }

    return (
      <div
        className="square"
        style={type}
        r={r}
        c={c}
        disabled={disabled}
        onClick={() => ClickChecker(r, c, typeBox, temp)}
      ></div>
    );
  }
  //hardcopy of board, don't put it into a parameter to a function

  function ClickChecker(r, c, typeBox, temp) {
    //typebox is type of box : 1 => nonActive ; 2 => active ; 3 => checker
    //r is row
    //c is column
    console.log("r ", r);
    console.log("c ", c);
    console.log("king " , king)

    //clicking on empty box does nothing
    if (typeBox === 1) {
      return;
    }

    //experimented: realized that needed seperate return statements
    //or would render the initial board from useState instead
    if (typeBox === 3 && king=== false) {
      if (r === 2 && c === 0) {
        temp[1][1] = <Box type={2} r={1} c={1} />;
        return setBoard(temp);
      } else if (r === 1 && c === 1) {
        setBoard((temp) => [
          ...temp,
          (temp[1][1] = <Box type={3} r={1} c={1} />),
          (temp[0][0] = <Box type={2} r={0} c={0} />),
          (temp[0][2] = <Box type={2} r={0} c={2} />),
        ]);
        return 
      } else {
        setBoard(temp => [...temp, (temp[1][1] = <Box type={2} r={1} c={1} />)])
      }
    } else if (typeBox === 3 && king === true) {
      if (r===1 && c===1){
        setBoard(temp => [...temp, temp[0][0] = <Box type={2} r={0} c={0} />, temp[0][2] = <Box type={2} r={0} c={2} />, temp[2][0] = <Box type={2} r={2} c={0} />, temp[2][2] = <Box type={2} r={2} c={2 } />])
      } else {
        setBoard(temp => [...temp, temp[1][1] = <Box type={2} r={1} c={1} />])
      }
    }

    if (typeBox === 2) {
      console.log("Type 2 Ran");
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[i].length; j++) {
          if (temp[i][j].props.type === 3) {
            temp[i][j] = <Box type={1} r={i} c={j} />;
          }
        }
      }
      temp[r][c] = <Box type={3} r={r} c={c} />;

      return setBoard(temp);
    }
  }

  function Reset() {

  }

  return (
    <div style={containerStyle} className="gameBoard">
      <button style={buttonStyle} onClick={Reset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {board[0][0]}
          {board[0][1]}
          {board[0][2]}
        </div>
        <div className="board-row" style={rowStyle}>
          {board[1][0]}
          {board[1][1]}
          {board[1][2]}
        </div>
        <div className="board-row" style={rowStyle}>
          {board[2][0]}
          {board[2][1]}
          {board[2][2]}
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

function App() {
  return <Game />;
}

export default App;
