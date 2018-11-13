let fetchCSV = require('./FetchCSV');
let algorithms = require('./Algorithms');

exports.GetUsers = (req, res) => {

  fetchCSV.users().then((data, err) => {
    if (err) {
      return res.status(500).json({ message: 'Server failed. Please try again!' });
    }

    return res.json({ users: data });
  });
};

exports.Euclidean = (req, res) => {

  algorithms.getSimilarity(req.body.UserID, 'euclidean', 'UserID', 'Movie').then((data) => {

    data.Users = data.Users.slice(0, 3);
    data.Movies = data.Movies.slice(0, 3);

    return res.json(data);
  });

};

exports.Pearson = (req, res) => {

  algorithms.getSimilarity(req.body.UserID, 'pearson', 'UserID', 'Movie').then((data) => {

    data.Users = data.Users.slice(0, 3);
    data.Movies = data.Movies.slice(0, 3);

    return res.json(data);
  });

};
