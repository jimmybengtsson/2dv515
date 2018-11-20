'use strict';

// Import files
let fetchDataSet = require('./FetchDataSet');
let algorithms = require('./Algorithms');

/**
 *  Handles requests to get the blog data.
 *
 *  @returns JSON-object with data in a express-response.
 */
exports.GetDataSet = (req, res) => {

  // Fetch all users data from the users-csv
  fetchDataSet.GetData().then((data, err) => {
    if (err) {
      return res.status(500).json({ message: 'Server failed. Please try again!' });
    }

    return res.json({ Data: data });
  });
};