let fetchCSV = require('./FetchCSV');
let algorithms = require('./Algorithms');

exports.itemBased = () => {

    fetchCSV.ratings().then((data) => {

      let tempMovies = [];
      let tempArr = [];

      for (let i = 0; i < data.length; i++) {

        if (tempMovies.indexOf(data[i].Movie) < 0) {
          tempMovies.push(data[i].Movie);
        }

      }

      for (let i = 0; i < tempMovies.length; i++) {

        Promise.all([generateData(tempMovies[i], 'euclidean'), generateData(tempMovies[i], 'pearson')]).then((result) => {
          let tempObj = {
            Movie: tempMovies[i],
            Euclidean: result[0],
            Pearson: result[1],
          };

          tempArr.push(tempObj);

          if (i + 1 === tempMovies.length) {
            if (typeof localStorage === 'undefined' || localStorage === null) {
              let LocalStorage = require('node-localstorage').LocalStorage;
              localStorage = new LocalStorage('./scratch');
            }

            localStorage.setItem('ItemBased-DataSet', JSON.stringify(tempArr));
            console.log({
              message: 'New dataset generated at ' + new Date(),
              result: JSON.parse(localStorage.getItem('ItemBased-DataSet')),
            });
          }
        });
      }
    }).catch(err => {
      return err;
    });
};

const generateData = (movie, similarityPattern) => {

  return new Promise((resolve, reject)  => {
    fetchCSV.users().then((usersCsv) => {

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

          tempArr.push(tempObj);
        }

        resObj.users = tempArr;
        resObj.users.sort((a, b) => b.score - a.score);
        resolve(resObj);

      });
    }).catch((err) => {
      reject(err);
    });
  })
};
