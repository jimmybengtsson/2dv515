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

      let tempMovies = [];

      for (let i = 0; i < ratingsCsv.length; i++) {

        if (ratingsCsv[i].Movie !== movie && tempMovies.indexOf(ratingsCsv[i].Movie) < 0) {

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

          tempMovies.push(ratingsCsv[i].Movie);
        }
      }

      if (resObj.movies <= 0) {
        return res.status(404).json({ message: 'No matches', });
      }

      resObj.movies.sort((a, b) => b.score - a.score);

      let tempArr = [];

      for (let i = 0; i < usersCsv.length; i++) {
        let sum = 0;
        let similarity = 0;

        for (let j = 0; j < ratingsCsv.length; j++) {
          if (ratingsCsv[j].Movie !== movie && usersCsv[i].UserID === ratingsCsv[j].UserID) {
            for (let u = 0; u < resObj.movies.length; u++) {
              if (ratingsCsv[j].Movie === resObj.movies[u].movie) {
                sum += resObj.movies[u].score * ratingsCsv[j].Rating;
                similarity += resObj.movies[u].score;
              }
            }
          }
        }

        sum = sum / similarity;

        let tempObj = {
          UserID: usersCsv[i].UserID,
          score: sum.toFixed(3),
        };

        console.log(tempObj);

        tempArr.push(tempObj);
      }

      resObj.users = tempArr;
      resObj.users.sort((a, b) => b.score - a.score);
      resObj.users = resObj.users.slice(0, 3);
      resObj.movies = resObj.movies.slice(0, 3);
      return res.json(resObj);

    });
  }).catch((err) => {
    return res.status(500).json({ message: 'Something went wrong. Please try again!', data: err });
  });
};