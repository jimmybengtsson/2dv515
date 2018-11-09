import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import MenuTwo from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {getUsers} from '../utils/ApiRequests';

class Menu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      users: null,
      user: '',
      correlation: null,
    }

    this.renderUserMenu = this.renderUserMenu.bind(this);
  }

  handleChange = event => {
    this.setState({ userID: event.target.value.UserID, user: event.target.value.UserName});
  };

  handleChangeTwo = event => {
    this.setState({ correlation: event.target.value });
  };

  renderUserMenu = () => {

    let menuItems = [];
    for (let i in this.state.users) {
      menuItems.push(<MenuItem value={this.state.users[i]} >{this.state.users[i].UserName}</MenuItem>)
    }

    const { anchorEl } = this.state;
    return (
      <div>
        {this.state.users ? (
          <div>
            <FormControl style={{minWidth: 50}}>
              <InputLabel  style={{minWidth: 50}} htmlFor="pick-user-simple">Pick a user</InputLabel>
              <Select
                style={{minWidth: 50}}
                value={this.state.user}
                onChange={this.handleChange}
              >
                {menuItems}
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
            <FormControl style={{minWidth: 50}}>
              <InputLabel  style={{minWidth: 50}} htmlFor="pick-user-simple">Pick a pattern</InputLabel>
              <Select
                style={{minWidth: 50}}
                value={this.state.user}
                onChange={this.handleChangeTwo}
              >
                <MenuItem value={1} >User-based Euclidean</MenuItem>
                <MenuItem value={2} >User-based Pearson</MenuItem>
              </Select>
            </FormControl>
          </div>
        ) : (
          null
        )}
      </div>
    );
  };

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
    const { anchorEl } = this.state;
    return (
      <div className="Menu">
        <div className="Menu-Body">
          {this.renderUserMenu()}
          {this.renderRecommendation()}
        </div>
      </div>
    );
  }
}

export default Menu;