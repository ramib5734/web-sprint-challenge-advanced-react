import React from 'react'
import axios from "axios"
export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 2,
      y: 2,
      error: null,
      count: 0,
      email: "",
    }
    this.move = this.move.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  move(direction){
    switch(direction){
      case "Left":
        if(this.state.x <= 1){
          this.setState({
            ...this.state,
            error:"You can't go left"

          })
          return;
        }
        this.setState({
          ...this.state,
          x:this.state.x-1,
          count: this.state.count + 1,
          error: null,
        })
        break;
        case "Right":
        if(this.state.x >= 3){
          this.setState({
            ...this.state,
            error:"You can't go right"

          })
          return;
        }
        this.setState({
          ...this.state,
          x:this.state.x+1,
          count: this.state.count + 1,
          error: null,
        })
        break;
        case "Down":
        if(this.state.y >= 3){
          this.setState({
            ...this.state,
            error:"You can't go down"

          })
          return;
        }
        this.setState({
          ...this.state,
          y:this.state.y+1,
          count: this.state.count + 1,
          error: null,
        })
        break;
        case "Up":
        if(this.state.y <= 1){
          this.setState({
            ...this.state,
            error:"You can't go up"

          })
          return;
        }
        this.setState({
          ...this.state,
          y:this.state.y-1,
          count: this.state.count + 1,
          error: null,
        })
        break;
        case "Reset":
        
        this.setState({
          ...this.state,
          x: 2,
          y: 2,
          count: 0,
          error: null,
          email: "",
        })
        break;
    }

  }

  handleSubmit(evt) {
    evt.preventDefault();
    const {x, y, count, email} = this.state
    axios.post("http://localhost:9000/api/result", {
      x, y, email,
      steps: count
    })
    .then((response) =>{
      console.log(response.data)
      this.setState({
        ...this.state,
        error: response.data.message,
        email: ""
      })
    })
    .catch((err) => {
      this.setState({
        ...this.state,
        error: err.response.data.message,
        email: ""
      })
    })
  }

  render() {
    const { className } = this.props
    const squares = []
    for(let y = 1; y<=3; y++){
    for(let x = 1; x<=3; x++){
        const isActive = this.state.x === x && this.state.y === y
        squares.push(<div className={isActive ? "square active" : "square"} key = {x + "," + y}>{isActive && "B"}</div>)
      }
    }
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">{this.state.count === 1 ? `You moved ${this.state.count} time` : `You moved ${this.state.count} times`}</h3>
        </div>
        <div id="grid">
          {squares}
        </div>
        <div className="info">
          <h3 id="message">{this.state.error}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick = {() =>this.move("Left")}>LEFT</button>
          <button id="up" onClick = {() =>this.move("Up")}>UP</button>
          <button id="right" onClick = {() =>this.move("Right")}>RIGHT</button>
          <button id="down" onClick = {() =>this.move("Down")}>DOWN</button>
          <button id="reset" onClick = {() =>this.move("Reset")}>reset</button>
        </div>
        <form onSubmit = {this.handleSubmit}>
          <input onChange = {(evt) =>this.setState({...this.state, email: evt.target.value})} value = {this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}