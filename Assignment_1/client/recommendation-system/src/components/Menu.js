import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import MenuTwo from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../App.css';

import {getUsers} from '../utils/ApiRequests';

class Menu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      user: '',
      measure: '',
    }

    this.renderUserMenu = this.renderUserMenu.bind(this);
  }

  handleChange = (event) => {
    this.setState({ userID: event.target.value.UserID, user: event.target.value.UserName.toString()});
  };

  handleChangeTwo = event => {
    this.setState({ measure: event.target.value.measure, measureID: event.target.value.measureID});
  };

  renderUserMenu = () => {

    let menuItems = [];
    for (let i in this.state.users) {
      menuItems.push(<MenuItem value={this.state.users[i]} >{this.state.users[i].UserName}</MenuItem>)
    }

    return (
      <div>
        {this.state.users ? (
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
        ) : (
          null
        )}
      </div>
    );
  };

  renderRecommendation = () => {

    return (
      <div>
        {this.state.users ? (
          <div>
            <FormControl style={{minWidth: 150}}>
              <InputLabel  style={{minWidth: 100}} htmlFor="pick-user-simple">Similarity measure</InputLabel>
              <Select
                style={{minWidth: 100}}
                value={this.state.measure}
                onChange={this.handleChangeTwo}
              >
                <MenuItem key={1}
                          value={{
                            measure: 'User - Euclidean Distance',
                            measureID: 1
                          }}
                >User - Euclidean Distance</MenuItem>
                <MenuItem key={2}
                          value={{
                            measure: 'User - Pearson Correlation',
                            measureID: 2
                          }}
                >User - Pearson Correlation</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : (
          null
        )}
      </div>
    );
  };

  renderButton = () => {
    if (!this.state.userID || !this.state.measure) {
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

    getUsers().then((result) => {
      console.log(result);
      this.setState({ users: result.data.users });
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
    console.log(this.state)
    return (
      <div className="Menu">
        <div className="Menu-Body">
          {this.renderUserMenu()}
          {this.renderRecommendation()}
        </div>
        {this.renderButton()}
      </div>
    );
  }
}

export default Menu;