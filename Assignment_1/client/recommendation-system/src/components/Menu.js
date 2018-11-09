import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import MenuTwo from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {getUsers} from '../utils/ApiRequests';

class Menu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      anchorEl: null,
    }

  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderUserMenu = () => {

  };

  componentWillMount = () => {

    getUsers().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    })
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div className="Menu">
        <div className="Menu-Body">
        </div>
      </div>
    );
  }
}

export default Menu;