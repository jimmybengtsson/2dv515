import React, { Component } from 'react';
import './App.css';

/**
 *  Starting point of the application
 */
class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
    };

  }

  // Change state
  changeState = data => {

    this.setState({

    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>
            Clustering
          </h3>
        </header>
        <div className="App-body">

        </div>
      </div>
    );
  }
}

export default App;
