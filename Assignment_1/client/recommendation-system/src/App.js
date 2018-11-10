import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import Results from './components/Results';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: null,
      user: null,
      menuOpen: true,
      resultOpen: false,
    }

  }

  changeStateMenu = data => {

    this.setState({
      userID: data.userID,
      user: data.user,
      users: data.users,
      measureID: data.measureID,
      menuOpen: false,
      resultOpen: true,
      startTime: new Date()
    })
  };

  changeStateResult = () => {
    this.setState({
      menuOpen: true,
      resultOpen: false,
      userID: null,
      user: null,
      measureID: null,
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
          {this.state.menuOpen ? (
            <Menu state={this.state} changeState={this.changeStateMenu}/>
          ) : (
            null
          )}
          {this.state.resultOpen ? (
            <Results state={this.state} changeState={this.changeStateResult}/>
          ) : (
            null
          )}
        </div>
      </div>
    );
  }
}

export default App;
