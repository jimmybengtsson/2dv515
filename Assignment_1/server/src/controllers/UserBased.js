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

  return getSimilarity(req, res, 'euclidean');

};

exports.Pearson = (req, res) => {

  return getSimilarity(req, res, 'pearson');

};

const getSimilarity = (req, res, similarityPattern) => {

  fetchCSV.users().then((usersCsv) => {

    let user = req.body.UserID;
    let resObj = {
      users: [],
      movies: [],
    };

    fetchCSV.ratings().then((ratingsCsv) => {

      console.log(usersCsv);

      for (let i = 0; i < usersCsv.length; i++) {

        if (usersCsv[i].UserID !== user) {

          let pattern;

          if (similarityPattern === 'pearson') {
            pattern = algorithms.Pearson(user, usersCsv[i].UserID, ratingsCsv);
          }

          if (similarityPattern === 'euclidean') {
            pattern = algorithms.Euclidean(user, usersCsv[i].UserID, ratingsCsv);
          }

          let tempObj = {
            UserID: usersCsv[i].UserID,
            score: +pattern.toFixed(3),
          };

          if (pattern !== 0) {
            resObj.users.push(tempObj);
          }
        }
      }

      if (resObj.users <= 0) {
        return res.status(404).json({ message: 'No matches', });
      }

      resObj.users.sort((a, b) => b.score - a.score);

      let tempMovies = [];
      let tempArr = [];

      for (let i = 0; i < ratingsCsv.length; i++) {

        if (tempMovies.indexOf(ratingsCsv[i].Movie) < 0) {
          tempMovies.push(ratingsCsv[i].Movie);
        }

      }

      for (let i = 0; i < tempMovies.length; i++) {
        let sum = 0;
        let similarity = 0;

        for (let j = 0; j < ratingsCsv.length; j++) {
          if (ratingsCsv[j].UserID !== user && tempMovies[i] === ratingsCsv[j].Movie) {
            for (let u = 0; u < resObj.users.length; u++) {
              if (ratingsCsv[j].UserID === resObj.users[u].UserID) {
                sum += resObj.users[u].score * ratingsCsv[j].Rating;
                similarity += resObj.users[u].score;
              }
            }
          }
        }

        sum = sum / similarity;

        let tempObj = {
          movie: ratingsCsv[i].Movie,
          score: sum.toFixed(3),
        };

        tempArr.push(tempObj);
      }

      for (let i = 0; i < ratingsCsv.length; i++) {
        if (ratingsCsv[i].UserID === user) {
          for (let j = 0; j < tempArr.length; j++) {
            if (ratingsCsv[i].Movie === tempArr[j].movie) {
              tempArr.splice(j, 1);
            }
          }
        }
      }

      resObj.movies = tempArr;
      resObj.movies.sort((a, b) => b.score - a.score);
      resObj.users = resObj.users.slice(0, 3);
      resObj.movies = resObj.movies.slice(0, 3);
      return res.json(resObj);

    });
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });
};