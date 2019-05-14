import React, { Component } from "react";
import "./App.css";
import Dbpedia from "./dbpedia";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
        .toLowerCase()
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")
    });
  }

  render() {
    return (
      <div className="App">
        <h3>Wikipedia Search Tool</h3>
        <input
          type="text"
          id="input"
          className="InputText"
          placeholder="Input an Actor/Actress's DBPedia link or just their name"
          value={this.input}
          onChange={this.handleChange}
        />
        <div className="Dbpedia">
          <Dbpedia input={this.state.input} />
        </div>
      </div>
    );
  }
}

export default App;
