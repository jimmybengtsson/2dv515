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
        Users: [],
        Movies: [],
      };

      let storage = JSON.parse(localStorage.getItem('ItemBased-DataSet'));

      for (let i = 0; i < storage.length; i++) {
        if (storage[i].Movie === movie && similarityPattern === 'euclidean') {

          resObj.Users = storage[i].Euclidean.Users;
          resObj.Movies = storage[i].Euclidean.Movies;

        } else if (storage[i].Movie === movie && similarityPattern === 'pearson') {

          resObj.Users = storage[i].Pearson.Users;
          resObj.Movies = storage[i].Pearson.Movies;
        }
      }

      resObj.Users = resObj.Users.slice(0, 3);
      resObj.Movies = resObj.Movies.slice(0, 3);

      console.log({
        Message: 'Dataset was sent at ' + new Date(),
        Movie: movie,
        Pattern: similarityPattern,
        Result: resObj,
      });

      resolve(resObj);
    });
  };
