import axios from 'axios'

let serverURL = 'http://localhost:8000/'

export const getUsers = () => {

  return axios({
    method: 'get',
    url: serverURL + 'users',
    headers: {'Content-Type': 'application/json'}
  })
}

export const getRatings = () => {

  return axios({
    method: 'get',
    url: serverURL + 'ratings',
    headers: {'Content-Type': 'application/json'}
  })
}

export const getEuclidean = (data) => {
  let tempObj = {
    UserID: data,
  }

  return axios({
    method: 'post',
    url: serverURL + 'users/euclidean',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const getPearson = (data) => {
  let tempObj = {
    UserID: data,
  }

  return axios({
    method: 'post',
    url: serverURL + 'users/pearson',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}