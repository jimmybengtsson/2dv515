let fetchCSV = require('./FetchCSV');
let algorithms = require('./Algorithms');

exports.GetUsers = (req, res) => {

  fetchCSV.users().then((data, err) => {
    if (err) {
      return res.status(500).json({ message: 'Server failed. Please try again!' });
    }

    console.log(data);
    return res.json({ users: data });
  });
};

exports.Euclidean = (req, res) => {

  fetchCSV.users().then((usersCsv) => {

    let user = req.body.UserID;
    let euclideanArr = [];

    fetchCSV.ratings().then((ratingsCsv) => {

      console.log(usersCsv);

      for (let i = 0; i < usersCsv.length; i++) {

        if (usersCsv[i].UserID !== user) {

          let euclidean = algorithms.Euclidean(user, usersCsv[i].UserID, ratingsCsv);

          let tempObj = {
            UserID: usersCsv[i].UserID,
            score: +euclidean.toFixed(3),
          };

          if (euclidean !== 0) {
            euclideanArr.push(tempObj);
          }
        }
      }

      if (euclideanArr <= 0) {
        return res.status(404).json({ message: 'No Euclidean matches', });
      }

      euclideanArr.sort((a, b) => b.score - a.score);

      return res.json({ score: euclideanArr.slice(0, 3) });
    });
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });

};

exports.Pearson = (req, res) => {

  fetchCSV.users().then((usersCsv) => {

    let user = req.body.UserID;
    let pearsonArr = [];

    fetchCSV.ratings().then((ratingsCsv) => {

      console.log(usersCsv);

      for (let i = 0; i < usersCsv.length; i++) {

        if (usersCsv[i].UserID !== user) {

          let pearson = algorithms.Pearson(user, usersCsv[i].UserID, ratingsCsv);

          let tempObj = {
            UserID: usersCsv[i].UserID,
            score: +pearson.toFixed(3),
          };

          if (pearson !== 0) {
            pearsonArr.push(tempObj);
          }
        }
      }

      if (pearsonArr <= 0) {
        return res.status(404).json({ message: 'No Pearson matches', });
      }

      pearsonArr.sort((a, b) => b.score - a.score);

      return res.json({ score: pearsonArr.slice(0, 3) });
    });
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });

};
