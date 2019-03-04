import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      text: "",
      isBinaryDecoderDisabled: true,
      isBinaryParserDisabled: false
    }

    this.modifiedText = this.modifiedText.bind(this);
    this.convertText = this.convertText.bind(this);
    this.binaryParser = this.binaryParser.bind(this);
  }

  modifiedText = event => {
    this.setState({text: event.target.value});
  }

  binaryParser = event => {
    let ascii = [], binary = [];
    
    [...event].map( ( _ , i) => ascii.push( event.charCodeAt(i) ) );

    ascii.map( asciiCode => binary.push( asciiCode.toString(2) ) );

    this.setState({
      text: ''
      }, () => {

        let text = '';
  
        binary.map( binary => {
            binary = binary.toString();

            if( binary.length == 7 )
              text += `0${binary} `;
            else if (binary.length == 6)
              text += `00${binary} `;
            else
              text += `${binary} `;

        });
        
        this.setState({ text, isBinaryDecoderDisabled: false, isBinaryParserDisabled: true });
    });

  }

  binaryDecoder = () => {
    let { text } = this.state;
    const binaries = text.trim().split(" ");
    let charCodes = [...binaries].map( binary => (parseInt(binary, 2).toString() ));
    let string = charCodes.map( charCode =>  String.fromCharCode(charCode) );
    text = '';
    string.map( char => text += char );

    this.setState({ text, isBinaryDecoderDisabled: true, isBinaryParserDisabled: false });
  }

  convertText(action){
    const { text } = this.state;

    let message = "";
    
    switch (action) {
      case "lower":
        message = text.toLowerCase();
      break;
      case "upper":
        message = text.toUpperCase();      
      break;
      default:
        console.log("Erro");
      break;
    }
    this.setState({ text : message });
  }

  render() {
    return (
      <div className="App"> 
        <textarea className="textarea" placeholder="Texto qualquer" onChange={this.modifiedText} value={this.state.text}/>
        <div className="Buttons">
          <button onClick={() => this.convertText("lower")}>lowercase</button>
          <button onClick={() => this.convertText("upper")}>uppercase</button>
          <button disabled={this.state.isBinaryParserDisabled} onClick={() => this.binaryParser(this.state.text)}>Binary parser</button>
          <button disabled={this.state.isBinaryDecoderDisabled} onClick={() => this.binaryDecoder(this.state.text)}>Binary decoder</button>
        </div>
      </div>
    );
  }
}

export default App;
