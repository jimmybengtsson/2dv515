import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import Results from './components/Results';

/**
 *  Starting point of the application
 */
class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userID: null,
      user: null,
      movie: null,
      menuOpen: true,
      resultOpen: false,
    }

  }

  // Change state when menu is closed
  changeStateMenu = data => {

    this.setState({
      userID: data.userID,
      user: data.user,
      users: data.users,
      movie: data.movie,
      movies: data.movies,
      measureID: data.measureID,
      menuOpen: false,
      resultOpen: true,
      startTime: new Date()
    })
  };

  // Change state when result is closed
  changeStateResult = () => {
    this.setState({
      menuOpen: true,
      resultOpen: false,
      userID: null,
      user: null,
      users: null,
      measureID: null,
      movie: null,
      movies: null,
      startTime: null,
    })
  };

  // When this.state.menuOpen is true menu will be rendered.
  // When this.state.resultOpen is true results will be rendered.
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
