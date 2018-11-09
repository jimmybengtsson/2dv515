import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import Results from './components/Results';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: false,
      ratings: false,
      euclidean: false,
      pearson: false,
      results: false,
    }

  }

  changeState = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>
            Recommendation System
          </h3>
        </header>
        <div className="App-body">
          <Menu state={this.state} changeState={this.changeState}/>
          <Results state={this.state} changeState={this.changeState}/>
        </div>
      </div>
    );
  }
}

export default App;
