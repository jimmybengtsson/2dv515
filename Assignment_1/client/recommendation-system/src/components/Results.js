import React, {Component} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {getEuclidean, getPearson, getItemEuclidean, getItemPearson, getIBEuclidean, getIBPearson} from '../utils/ApiRequests';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';

/**
 *  Result class where the similarity results are rendered.
 */

class Results extends Component {
  constructor (props) {
    super(props)

    this.state = {
      result: null,
    }

  }

  /**
   *  Depending on chosen similarity pattern, a http-request are made to the
   *  server to fetch the result which is saved in this.state.
   */
  getResult = () => {

    switch(this.props.state.measureID) {
      case 1:
        getEuclidean(this.props.state.userID).then(result => {
          this.setState({
            result: result.data,
            measure: 'User - Euclidean'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      case 2:
        getPearson(this.props.state.userID).then(result => {
          this.setState({
            result: result.data,
            measure: 'User - Pearson'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      case 3:
        getItemEuclidean(this.props.state.movie).then(result => {
          this.setState({
            result: result.data,
            measure: 'Item - Euclidean'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      case 4:
        getItemPearson(this.props.state.movie).then(result => {
          this.setState({
            result: result.data,
            measure: 'Item - Pearson'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      case 5:
        getIBEuclidean(this.props.state.userID).then(result => {
          this.setState({
            result: result.data,
            measure: 'User IB - Euclidean'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      case 6:
        getIBPearson(this.props.state.userID).then(result => {
          this.setState({
            result: result.data,
            measure: 'User IB - Pearson'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      default:
        return;
    }
  }

  /**
   *  Depending on chosen similarity pattern, the result is rendered to the user.
   */
  renderResult = () => {

    let userArr = [];
    let movieArr = [];

    if (this.state.result.Users) {

      for (let i in this.state.result.Users) {
        for (let j in this.props.state.users) {
          if (this.props.state.users[j].UserID === this.state.result.Users[i].UserID) {
            let tempObj = {
              user: this.props.state.users[j].UserName,
              score: this.state.result.Users[i].Score,
              position: Number(i) + 1,
            }
            userArr.push(tempObj)
          }
        }
      }

      movieArr = this.state.result.Movies;
    } else {
      movieArr = this.state.result;
    }

    // Execution time is measured and rendered to the user
    let stopTime = new Date();
    let executionTime = stopTime - this.props.state.startTime;

    let timeObj = {
      measure: this.state.measure,
      time: executionTime,
      user: this.props.state.user,
      movie: this.props.state.movie
    }

    // The latest 20 execution times are saved to local storage.
    let storage;

    if (localStorage.getItem('TimeResults')) {
      storage = JSON.parse(localStorage.getItem('TimeResults'));
    } else {
      storage = [];
    }

    storage.unshift(timeObj);

    storage = storage.slice(0, 20);

    localStorage.setItem('TimeResults', JSON.stringify(storage));


    if (this.props.state.measureID === 1 || this.props.state.measureID === 2) {

      return (
        <div>
          <p>Top three matches for {this.props.state.user} ({this.state.measure})</p>
          <Table>
            <TableBody>
              {userArr.map(row => {
                return (
                  <TableRow key={row.position}>
                    <TableCell numericcomponent="th" scope="row">
                      {row.position}
                    </TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell numeric>{row.score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <br/>
          <p>Top three recommendations for {this.props.state.user} ({this.state.measure})</p>
          <Table>
            <TableBody>
              {movieArr.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell numeric>
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.Movie}</TableCell>
                    <TableCell numeric>{row.Score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <br/>
          <p>Execution time: {executionTime}ms</p>
        </div>
      );
    } else if (this.props.state.measureID === 3 || this.props.state.measureID === 4) {

      return (
        <div>
          <p>Top three matching items for {this.props.state.movie} ({this.state.measure})</p>
          <Table>
            <TableBody>
              {movieArr.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell numeric>
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.Movie}</TableCell>
                    <TableCell numeric>{row.Score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <br/>
          <p>Recommended critics for {this.props.state.movie} ({this.state.measure})</p>
          <Table>
            <TableBody>
              {userArr.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell numericcomponent="th" scope="row">
                      {row.position}
                    </TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell numeric>{row.score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <br/>
          <p>Execution time: {executionTime}ms</p>
        </div>
      );
    } else if (this.props.state.measureID === 5 || this.props.state.measureID === 6) {

      return (
        <div>
          <p>Top three recommendations for {this.props.state.user} ({this.state.measure})</p>
          <Table>
            <TableBody>
              {movieArr.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell numeric>
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.Movie}</TableCell>
                    <TableCell numeric>{row.Score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <br/>
          <p>Execution time: {executionTime}ms</p>
        </div>
      );
    }
  }

  componentDidMount() {
    this.getResult();
  }

  /**
   *  A circular progress is shown until server response is received.
   */
  render() {
    return (
      <div className="Results">
        <button className="Results-Close" onClick={() => {this.props.changeState()}}>
          X
        </button>
          {this.state.result ? (
          <div>
            {this.renderResult()}
          </div>
            ) : (
          <CircularProgress />
        )}
      </div>
    );
  }
}

export default Results;
