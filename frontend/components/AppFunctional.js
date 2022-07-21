import React, {useState} from 'react';
import axios from "axios"

export default function AppFunctional(props) {
  const [x, setx] = useState(2);
  const [y, sety] = useState(2);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const { className } = props;
  const squares = [];
  for (let yI = 1; yI <= 3; yI++) {
    for (let xI = 1; xI <= 3; xI++) {
      const isActive = x === xI && y === yI;
      squares.push(<div className={isActive ? "square active" : "square"} key = {xI + "," + yI}>{isActive && "B"}</div>);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    axios.post("http://localhost:9000/api/result", {
      x, y, email,
      steps: count
    })
    .then((response) =>{
      console.log(response.data)
      setError(response.data.message)
      setEmail("")
    })
    .catch((err) => {
      console.log(err)
      setError(err.response.data.message)
      setEmail("")
    }) 
  }

  function move(direction){
    switch (direction) {
      case "Left":
        if (x <= 1) {
          setError("You can't go left")
          return;
        }
        setx(x - 1)
        setCount(count + 1)
        setError(null)
        break;
      case "Right":
        if (x >= 3) {

          setError("You can't go right")
          return;
        }
        setx(x + 1)
        setCount(count + 1)
        setError(null)
        break;
      case "Down":
        if (y >= 3) {

          setError("You can't go down")
          return;
        }
        sety(y + 1)
        setCount(count + 1)
        setError(null)
        break;
      case "Up":
        if (y <= 1) {
          setError("You can't go up")
          return;
        }
        sety(y-1)
        setCount(count + 1)
        setError(null)
        break;
      case "Reset":
        setx(2)
        sety(2)
        setCount(0)
        setError(null)
        setEmail("")
        break;
    }

  }
  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">{count === 1 ? `You moved ${count} time` : `You moved ${count} times`}</h3>
      </div>
      <div id="grid">
        {squares}
      </div>
      <div className="info">
        <h3 id="message">{error}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move("Left")}>LEFT</button>
        <button id="up" onClick={() => move("Up")}>UP</button>
        <button id="right" onClick={() => move("Right")}>RIGHT</button>
        <button id="down" onClick={() => move("Down")}>DOWN</button>
        <button id="reset" onClick={() => move("Reset")}>reset</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={(evt) => setEmail(evt.target.value)} value={email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}