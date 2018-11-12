let fetchCSV = require('./FetchCSV');
let algorithms = require('./Algorithms');

exports.GetRatings = (req, res) => {

  fetchCSV.ratings().then((data) => {

    return res.json({ ratings: data });

  }).catch(err => {
    console.log(err);
  });
};

exports.Euclidean = (req, res) => {

  getSimilarity(req, res, 'euclidean').then((result) => {

    return res.json(result);
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });
};

exports.Pearson = (req, res) => {

  getSimilarity(req, res, 'pearson').then((result) => {

    return res.json(result);
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });

};

exports.getMovies = (req, res) => {

  fetchCSV.ratings().then((data) => {

    let tempMovies = [];

    for (let i = 0; i < data.length; i++) {

      if (tempMovies.indexOf(data[i].Movie) < 0) {
        tempMovies.push(data[i].Movie);
      }

    }

    return res.json({ ratings: tempMovies });

  }).catch(err => {
    console.log(err);
  });
};

const getSimilarity = (req, res, similarityPattern) => {

    if (typeof localStorage === 'undefined' || localStorage === null) {
      let LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    return new Promise((resolve, reject)  => {

      let movie = req.body.Movie;
      let resObj = {
        users: [],
        movies: [],
      };

      let storage = JSON.parse(localStorage.getItem('ItemBased-DataSet'));

      for (let i = 0; i < storage.length; i++) {
        if (storage[i].Movie === movie && similarityPattern === 'euclidean') {

          resObj.users = storage[i].Euclidean.users;
          resObj.movies = storage[i].Euclidean.movies;

        } else if (storage[i].Movie === movie && similarityPattern === 'pearson') {

          resObj.users = storage[i].Pearson.users;
          resObj.movies = storage[i].Pearson.movies;
        }
      }

      console.log({
        message: 'Dataset was sent at ' + new Date(),
        pattern: similarityPattern,
        movie: movie,
        result: resObj,
      });

      resObj.users = resObj.users.slice(0, 3);
      resObj.movies = resObj.movies.slice(0, 3);

      resolve(resObj);
    });
  };
