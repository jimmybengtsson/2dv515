import React, {Component} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {getEuclidean, getPearson} from '../utils/ApiRequests';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';

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
            result: result.data.score,
            measure: 'User-based Euclidean'
          })
        }).catch(err => {
          console.log(err);
        })
        break;
      case 2:
        getPearson(this.props.state.userID).then(result => {
          this.setState({
            result: result.data.score,
            measure: 'User-based Pearson'
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

    let resultArr = [];
    console.log(this.state.result)

    for (let i in this.state.result) {
      for (let j in this.props.state.users) {
        if (this.props.state.users[j].UserID === this.state.result[i].UserID) {
          let tempObj = {
            user: this.props.state.users[j].UserName,
            score: this.state.result[i].score,
            position: Number(i) + 1,
          }
          resultArr.push(tempObj)
        }
      }
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell numeric> </TableCell>
            <TableCell>Name</TableCell>
            <TableCell numeric>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultArr.map(row => {
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
        <p>{this.state.measure}</p>
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
