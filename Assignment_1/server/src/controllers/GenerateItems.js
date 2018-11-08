let fetchCSV = require('./FetchCSV');

exports.GetRatings = (req, res) => {

  fetchCSV.ratings().then((data, err) => {
    if (err) {
      return res.status(500).json({ message: 'Server failed. Please try again!' });
    }

    console.log(data);
    return res.json({ ratings: data });
  });
};
