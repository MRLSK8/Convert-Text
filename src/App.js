import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      text: ""
    }

    this.modifiedText = this.modifiedText.bind(this);
    this.convertText = this.convertText.bind(this);
  }

  modifiedText = (e) => {
    this.setState({text: e.target.value});
  }

  convertText(action){
    let message = "";

    switch (action) {
      case "lower":
        message = this.state.text.toLowerCase();
      break;
      case "upper":
        message = this.state.text.toUpperCase();      
      break;
      default:
      break;
    }
    this.setState({text:message});
  }

  render() {
    return (
      <div className="App"> 
        <textarea className="textarea" placeholder="Texto qualquer" onChange={this.modifiedText} value={this.state.text}/>
        <div className="Buttons">
          <button onClick={() => this.convertText("lower")}>lowercase</button>
          <button onClick={() => this.convertText("upper")}>uppercase</button>
        </div>
      </div>
    );
  }
}

export default App;
