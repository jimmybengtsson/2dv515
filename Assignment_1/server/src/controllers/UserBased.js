'use strict';

// Import files
let fetchCSV = require('./FetchCSV');
let algorithms = require('./Algorithms');


/**
 *  Handles requests to get all users.
 *
 *  @returns JSON-object with users in a express-response.
 */
exports.GetUsers = (req, res) => {

  // Fetch all users data from the users-csv
  fetchCSV.users().then((data, err) => {
    if (err) {
      return res.status(500).json({ message: 'Server failed. Please try again!' });
    }

    return res.json({ Users: data });
  });
};

/**
 *  Handles requests to get all user-matches and movie-recommendations for
 *  a specific user by using euclidean distance.
 *
 *  @returns JSON-object with top 3 matching users and recommended movies
 *  in a express-response.
 */
exports.Euclidean = (req, res) => {

  algorithms.getSimilarity(req.body.UserID, 'euclidean', 'UserID', 'Movie').then((data) => {

    data.Users = data.Users.slice(0, 3);
    data.Movies = data.Movies.slice(0, 3);

    return res.json(data);
  });

};


/**
 *  Handles requests to get all user-matches and movie-recommendations for
 *  a specific user by using pearson correlation.
 *
 *  @returns JSON-object with top 3 matching users and recommended movies
 *  in a express-response.
 */
exports.Pearson = (req, res) => {

  algorithms.getSimilarity(req.body.UserID, 'pearson', 'UserID', 'Movie').then((data) => {

    data.Users = data.Users.slice(0, 3);
    data.Movies = data.Movies.slice(0, 3);

    return res.json(data);
  });

};
