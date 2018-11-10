import React, {Component} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {getEuclidean, getPearson} from '../utils/ApiRequests';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';
const perf = require('execution-time')();

class Results extends Component {
  constructor (props) {
    super(props)

    this.state = {
      result: null,
    }

  }

  getResult = () => {

    switch(this.props.state.measureID) {
      case 1:
        getEuclidean(this.props.state.userID).then(result => {
          this.setState({
            result: result.data,
            measure: 'Euclidean'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      case 2:
        getPearson(this.props.state.userID).then(result => {
          this.setState({
            result: result.data,
            measure: 'Pearson'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      default:
        return;
    }
  }

  renderResult = () => {

    let userArr = [];
    console.log(this.state.result)

    for (let i in this.state.result.users) {
      for (let j in this.props.state.users) {
        if (this.props.state.users[j].UserID === this.state.result.users[i].UserID) {
          let tempObj = {
            user: this.props.state.users[j].UserName,
            score: this.state.result.users[i].score,
            position: Number(i) + 1,
          }
          userArr.push(tempObj)
        }
      }
    }

    let movieArr = this.state.result.movies;

    let stopTime = new Date();
    let executionTime = stopTime - this.props.state.startTime;

    let timeObj = {
      measure: this.state.measure,
      time: executionTime,
      user: this.props.state.user,
    }

    let storage;

    if (localStorage.getItem('TimeResults')) {
      storage = JSON.parse(localStorage.getItem('TimeResults'));
    } else {
      storage = [];
    }

    storage.push(timeObj);

    localStorage.setItem('TimeResults', JSON.stringify(storage));

    console.log(storage)

    return (
      <div>
        <p>Top three matches for {this.props.state.user} ({this.state.measure})</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell numeric> </TableCell>
              <TableCell>Name</TableCell>
              <TableCell numeric>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userArr.map(row => {
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
        <p>Top three recommendations for {this.props.state.user} ({this.state.measure})</p>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell numeric> </TableCell>
              <TableCell>Movie</TableCell>
              <TableCell numeric>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieArr.map((row, index) => {
              return (
                <TableRow key={row.id}>
                  <TableCell numeric>
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.movie}</TableCell>
                  <TableCell numeric>{row.score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <p>Execution time: {executionTime}ms</p>
      </div>
    );
  }

  componentDidMount() {
    this.getResult();
  }

  render() {
    return (
      <div className="Results">
        <button className="Results-Close" aria-label="Close" onClick={() => {this.props.changeState()}}>
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
