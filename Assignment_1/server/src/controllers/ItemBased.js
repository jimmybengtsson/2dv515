'use strict';

// Import files
let fetchCSV = require('./FetchCSV');
let algorithms = require('./Algorithms');

/**
 *  Handles requests to get all users.
 *
 *  @returns JSON-object with ratings in a express-response.
 */
exports.GetRatings = (req, res) => {

  // Fetch all rating from the ratings-csv
  fetchCSV.ratings().then((data) => {

    return res.json({ Ratings: data });

  }).catch(err => {
    console.log(err);
  });
};

/**
 *  Handles requests to get all movie-matches and user-recommendations for
 *  a specific movie by using euclidean distance.
 *
 *  @returns JSON-object with top 3 matching movies and recommended users
 *  in a express-response.
 */
exports.Euclidean = (req, res) => {

  getSimilarity(req, res, 'euclidean').then((result) => {

    return res.json(result);
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });
};

/**
 *  Handles requests to get all movie-matches and user-recommendations for
 *  a specific movie by using pearson correlation.
 *
 *  @returns JSON-object with top 3 matching movies and recommended users
 *  in a express-response.
 */
exports.Pearson = (req, res) => {

  getSimilarity(req, res, 'pearson').then((result) => {

    return res.json(result);
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });

};

/**
 *  Handles requests to get all movies that are rated.
 *
 *  @returns JSON-object with movies in a express-response.
 */
exports.getMovies = (req, res) => {

  // Fetch all rated movies from the ratings-csv and sort
  // to a list where all movies are included once.
  fetchCSV.ratings().then((data) => {

    let tempMovies = [];

    for (let i = 0; i < data.length; i++) {

      if (tempMovies.indexOf(data[i].Movie) < 0) {
        tempMovies.push(data[i].Movie);
      }

    }

    return res.json({ Movies: tempMovies });

  }).catch(err => {
    console.log(err);
  });
};

/**
 *  Handles requests to get movie-recommendations for
 *  a specific user by using item-based euclidean distance.
 *
 *  @returns JSON-object with top 3 recommended movies
 *  in a express-response.
 */
exports.IBEuclidean = (req, res) => {

  algorithms.getIBRecommendations(req.body.UserID, 'Euclidean').then((result) => {

    return res.json(result);

  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });
};

/**
 *  Handles requests to get movie-recommendations for
 *  a specific user by using pearson correlation.
 *
 *  @returns JSON-object with top 3 recommended movies
 *  in a express-response.
 */
exports.IBPearson = (req, res) => {

  algorithms.getIBRecommendations(req.body.UserID, 'Pearson').then((result) => {

    return res.json(result);

  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });
};

/**
 *  Get the genereated item-based dataset from local storage and
 *  and find matches/recommendations for a specific movie.
 *
 *  @returns Promise with top 3 matching movies and recommended users.
 */
const getSimilarity = (req, res, similarityPattern) => {

  // Check if local storage is available and instantiate new if not.
  if (typeof localStorage === 'undefined' || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

  // Instantiate a new promise
  return new Promise((resolve, reject)  => {

    let movie = req.body.Movie;
    let resObj = {
      Users: [],
      Movies: [],
    };

    // Fetch the item-based dataset from local storage...
    let storage = JSON.parse(localStorage.getItem('ItemBased-DataSet'));

    // ...and find the specific movie and algorithm.
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].Movie === movie && similarityPattern === 'euclidean') {

        resObj.Users = storage[i].Euclidean.Users;
        resObj.Movies = storage[i].Euclidean.Movies;

      } else if (storage[i].Movie === movie && similarityPattern === 'pearson') {

        resObj.Users = storage[i].Pearson.Users;
        resObj.Movies = storage[i].Pearson.Movies;
      }
    }

    // Shorten results to top 3.
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
