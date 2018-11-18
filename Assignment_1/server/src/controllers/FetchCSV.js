'use strict';

// Import npm-modules
const neatCsv = require('neat-csv');
const fs = require('fs');

// Import files
let userCSV = './data/users.csv';
let ratingCSV = './data/ratings.csv';

/**
 *  Creates an array of users from the users-csv.
 *
 *  @returns Array of users by Async.
 */
exports.users = () => {

  return (async () => {
    return await neatCsv(fs.createReadStream(userCSV), { separator: ';' });
  })();
};

/**
 *  Creates an array of ratings from the ratings-csv.
 *
 *  @returns Array of ratings by Async.
 */
exports.ratings = () => {

  return (async () => {
    return await neatCsv(fs.createReadStream(ratingCSV), { separator: ';' });
  })();
};
