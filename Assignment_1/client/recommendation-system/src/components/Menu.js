import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../App.css';

import {getUsers, getMovies} from '../utils/ApiRequests'

/**
 *  Menu-class where user can pick similarity patterns by user or movie.
 */
class Menu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      user: '',
      measure: '',
      movie: '',
    }
  }

  /**
   *  Handle all state changes when menu items are chosen.
   */
  handleChangeUsers = (event) => {
    this.setState({ userID: event.target.value.UserID, user: event.target.value.UserName, chosenOne: true });
  };

  handleChangeRecommendation = event => {
    this.setState(() => ({ measure: event.target.value.measure, measureID: event.target.value.measureID, chosenTwo: true, chosenOne: false}));
  };

  handleChangeMovies = (event) => {
    this.setState({ movie: event.target.value, chosenOne: true});
  };

  /**
   *  Render user or movie menu depending on state
   */
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
      case 5:
        return this.renderUserMenu();
      case 6:
        return this.renderUserMenu();
      default:
        return null;
    }
  };

  /**
   *  Render user menu
   */
  renderUserMenu = () => {
    return (
      <div>
        <FormControl style={{minWidth: 200}}>
          <InputLabel >Pick a user</InputLabel>
          <Select
            value={this.state.user}
            onChange={this.handleChangeUsers}
          >
            <MenuItem value="" disabled>
              <em>Select user</em>
            </MenuItem>
            {this.state.users.map((item, index) => {
              return (
                <MenuItem key={index} value={item} >{item.UserName}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }

  /**
   *  Render movie menu
   */
  renderMovieMenu = () => {

    return (
      <div>
        <FormControl style={{minWidth: 200}}>
          <InputLabel >Pick a movie</InputLabel>
          <Select
            value={this.state.user}
            onChange={this.handleChangeMovies}
          >
            <MenuItem value="" disabled>
              <em>Select movie</em>
            </MenuItem>
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

  /**
   *  Render menu for similarity patterns
   */
  renderRecommendation = () => {

    console.log(this.state.measure)
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
      },
      {
        measure: 'User IB CF - Euclidean Distance',
        measureID: 5,
      },
      {
        measure: 'User IB CF - Pearson Correlation',
        measureID: 6,
      },
    ]
    return (
          <form>
            <FormControl style={{minWidth: 200}}>
              <InputLabel htmlFor="pick-user-simple">Similarity pattern</InputLabel>
              <Select
                value={this.state.measure}
                onChange={this.handleChangeRecommendation}
              >
                <MenuItem value="" disabled>
                  <em>Select pattern</em>
                </MenuItem>
                {menuArr.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item} >{item.measure}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </form>
    );
  };

  /**
   *  Render button. Not clickable if not pattern and user/movie is chosen in menu
   */
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

  /**
   *  Make request to server for all users and movies before rendering the component.
   */
  componentWillMount = () => {

    Promise.all([getUsers(), getMovies()]).then((result) => {

      this.setState({
        users: result[0].data.Users,
        movies: result[1].data.Movies
      });
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
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