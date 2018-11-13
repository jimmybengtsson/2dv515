import axios from 'axios'

let serverURL = 'http://109.228.145.167:8008/'

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

export const getMovies = () => {

  return axios({
    method: 'get',
    url: serverURL + 'items',
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

export const getItemEuclidean = (data) => {
  let tempObj = {
    Movie: data,
  }

  return axios({
    method: 'post',
    url: serverURL + 'items/euclidean',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const getItemPearson = (data) => {
  let tempObj = {
    Movie: data,
  }

  return axios({
    method: 'post',
    url: serverURL + 'items/pearson',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const getIBEuclidean = (data) => {
  let tempObj = {
    UserID: data,
  }

  return axios({
    method: 'post',
    url: serverURL + 'users/ib-euclidean',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}

export const getIBPearson = (data) => {
  let tempObj = {
    UserID: data,
  }

  return axios({
    method: 'post',
    url: serverURL + 'users/ib-pearson',
    data: JSON.stringify(tempObj),
    headers: {'Content-Type': 'application/json'}
  })
}