import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import MenuTwo from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../App.css';

import {getUsers, getMovies, getEuclidean} from '../utils/ApiRequests'

class Menu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      user: '',
      measure: '',
      movie: null,
    }
  }

  handleChange = (event) => {
    this.setState({ userID: event.target.value.UserID, user: event.target.value.UserName.toString(), chosenOne: true }, );
  };

  handleChangeTwo = event => {
    this.setState({ measure: event.target.value.measure, measureID: event.target.value.measureID, chosenTwo: true, chosenOne: false});
  };

  handleChangeMovies = (event) => {
    this.setState({ movie: event.target.value, chosenOne: true});
  };

  renderMenu = () => {

    switch(this.state.measureID) {
      case 1:
        return this.renderUserMenu();
      case 2:
        return this.renderUserMenu();
      case 3:
        return this.renderMovieMenu();
      case 4:
        return this.renderMovieMenu();
      default:
        return null;
    }
  };

  renderUserMenu = () => {
    return (
      <div>
        <FormControl style={{minWidth: 150}}>
          <InputLabel  style={{minWidth: 100}} htmlFor="pick-user-simple">Pick a user</InputLabel>
          <Select
            style={{minWidth: 100}}
            value={this.state.user}
            onChange={this.handleChange}
          >
            {this.state.users.map((item, index) => {
              return (
                <MenuItem value={item} >{item.UserName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }

  renderMovieMenu = () => {

    return (
      <div>
        <FormControl style={{minWidth: 150}}>
          <InputLabel  style={{minWidth: 100}} htmlFor="pick-user-simple">Pick a movie</InputLabel>
          <Select
            style={{minWidth: 100}}
            value={this.state.user}
            onChange={this.handleChangeMovies}
          >
            {this.state.movies.map((item, index) => {
              return (
                <MenuItem value={item} >{item}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }

  renderRecommendation = () => {

    let menuArr = [
      {
        measure: 'User - Euclidean Distance',
        measureID: 1,
      },
      {
        measure: 'User - Pearson Correlation',
        measureID: 2
      },
      {
        measure: 'Movie - Euclidean Distance',
        measureID: 3
      },
      {
        measure: 'Movie - Pearson Correlation',
        measureID: 4
      }
    ]
    return (
          <div>
            <FormControl style={{minWidth: 150}}>
              <InputLabel  style={{minWidth: 100}} htmlFor="pick-user-simple">Similarity measure</InputLabel>
              <Select
                style={{minWidth: 100}}
                value={this.state.measure}
                onChange={this.handleChangeTwo}
              >
                {menuArr.map((item, index) => {
                  return (
                    <MenuItem value={item} >{item.measure}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
    );
  };

  renderButton = () => {
    if (!this.state.chosenOne || !this.state.chosenTwo) {
      return (
        <Button style={{ marginTop: 40, width: 100, }} variant="contained"  disabled >
          OK
        </Button>
      );
    }

    return (
      <Button style={{ marginTop: 40, width: 100, }} variant="contained" onClick={() => { this.props.changeState(this.state) }}>
        OK
      </Button>
    );
  }

  componentWillMount = () => {

    Promise.all([getUsers(), getMovies()]).then((result) => {

      console.log(result[0].data.users);
      console.log(result[1].data.ratings);
      this.setState({
        users: result[0].data.users,
        movies: result[1].data.ratings
      });
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
    console.log(this.state)
    return (
      <div className="Menu">
        <div className="Menu-Body">
          {this.renderRecommendation()}
          {this.renderMenu()}
        </div>
        {this.renderButton()}
      </div>
    );
  }
}

export default Menu;