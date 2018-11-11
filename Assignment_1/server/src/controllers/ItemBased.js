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

  return getSimilarity(req, res, 'euclidean');
};

exports.Pearson = (req, res) => {

  return getSimilarity(req, res, 'pearson');

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

const transposeToMovies = () => {

  return new Promise((resolve, reject)  => {

    fetchCSV.ratings().then((data) => {

      let tempMovies = [];
      let tempArr = [];

      for (let i = 0; i < data.length; i++) {

        if (tempMovies.indexOf(data[i].Movie) < 0) {
          tempMovies.push(data[i].Movie);
        }

      }

      for (let i = 0; i < tempMovies.length; i++) {

        let tempObj = {
          movie: tempMovies[i],
          ratings: [],
          movieID: i,
        };

        for (let j = 0; j < data.length; j++) {

          if (tempMovies[i] === data[j].Movie) {
            let ratingObj = {
              userID: data[j].UserID,
              Rating: data[j].Rating,
              movieID: i,
            };
            tempObj.ratings.push(ratingObj);
          }

        }

        tempArr.push(tempObj);
      }

      console.log(tempArr);
      resolve(tempArr);
    }).catch(err => {
      reject(err);
    });
  });
};

const getSimilarity = (req, res, similarityPattern) => {

  fetchCSV.users().then((usersCsv) => {

    let movie = req.body.Movie;
    let resObj = {
      users: [],
      movies: [],
    };

    fetchCSV.ratings().then((ratingsCsv) => {

      for (let i = 0; i < ratingsCsv.length; i++) {

        if (ratingsCsv[i].Movie !== movie) {

          let pattern;

          if (similarityPattern === 'pearson') {
            pattern = algorithms.itemPearson(movie, ratingsCsv[i].Movie, ratingsCsv);
          }

          if (similarityPattern === 'euclidean') {
            pattern = algorithms.itemEuclidean(movie, ratingsCsv[i].Movie, ratingsCsv);
          }

          let tempObj = {
            movie: ratingsCsv[i].Movie,
            score: +pattern.toFixed(3),
          };

          if (pattern !== 0) {
            resObj.movies.push(tempObj);
          }
        }
      }

      if (resObj.movies <= 0) {
        return res.status(404).json({ message: 'No matches', });
      }

      resObj.movies.sort((a, b) => b.score - a.score);

      let tempUsers = [];
      let tempArr = [];

      for (let i = 0; i < usersCsv.length; i++) {

        if (tempUsers.indexOf(ratingsCsv[i].UserID) < 0) {
          tempUsers.push(ratingsCsv[i].UserID);
        }

      }

      for (let i = 0; i < tempUsers.length; i++) {
        let sum = 0;
        let similarity = 0;

        for (let j = 0; j < ratingsCsv.length; j++) {
          if (ratingsCsv[j].Movie !== movie && tempUsers[i] === ratingsCsv[j].UserID) {
            for (let u = 0; u < resObj.movies.length; u++) {
              if (ratingsCsv[j].Movie === resObj.movies[u].UserID) {
                sum += resObj.movies[u].score * ratingsCsv[j].Rating;
                similarity += resObj.movies[u].score;
              }
            }
          }
        }

        sum = sum / similarity;

        let tempObj = {
          user: ratingsCsv[i].UserID,
          score: sum.toFixed(3),
        };

        tempArr.push(tempObj);
      }

      /*for (let i = 0; i < ratingsCsv.length; i++) {
        if (ratingsCsv[i].Movie === movie) {
          for (let j = 0; j < tempArr.length; j++) {
            if (ratingsCsv[i].UserID === tempArr[j].UserID) {
              tempArr.splice(j, 1);
            }
          }
        }
      }

      resObj.movies = tempArr;*/
      console.log(resObj);
      resObj.movies.sort((a, b) => b.score - a.score);
      resObj.users = resObj.users.slice(0, 3);
      resObj.movies = resObj.movies.slice(0, 3);
      return res.json(resObj);

    });
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });
};