let fetchCSV = require('./FetchCSV');
let algorithms = require('./Algorithms');

/**
 *  Creates an object with all movies movie-matches and user-recommendations
 *  and adds the to local storage
 */
exports.itemBased = () => {

    // Fetch all rated movies from the ratings-csv and sort
    // to a list where all movies are included once.
    fetchCSV.ratings().then((data) => {

      let tempMovies = [];
      let tempArr = [];

      for (let i = 0; i < data.length; i++) {

        if (tempMovies.indexOf(data[i].Movie) < 0) {
          tempMovies.push(data[i].Movie);
        }
      }

      for (let i = 0; i < tempMovies.length; i++) {

        // Generate matches and recommendations for each movie in the ratings-csv.
        Promise.all([generateData(tempMovies[i], 'euclidean'), generateData(tempMovies[i], 'pearson')]).then((result) => {
          let tempObj = {
            Movie: tempMovies[i],
            Euclidean: result[0],
            Pearson: result[1],
          };

          tempArr.push(tempObj);

          // Data are added to local storage when last movie in array.
          if (i + 1 === tempMovies.length) {
            if (typeof localStorage === 'undefined' || localStorage === null) {
              let LocalStorage = require('node-localstorage').LocalStorage;
              localStorage = new LocalStorage('./scratch');
            }

            localStorage.setItem('ItemBased-DataSet', JSON.stringify(tempArr));
            console.log({
              Message: 'New dataset generated at ' + new Date(),
              Result: JSON.parse(localStorage.getItem('ItemBased-DataSet')),
            });
          }
        });
      }
    }).catch(err => {
      return err;
    });
  };

/**
 *  Get all movie-matches and user-recommendations for
 *  a specific movie and algorithm.
 *
 *  @returns Promise with top 3 matching movies and recommended users that will be added to dataset.
 */
const generateData = (movie, similarityPattern) => {

  return new Promise((resolve, reject)  => {

    algorithms.getSimilarity(movie, similarityPattern, 'Movie', 'UserID').then((data) => {

      resolve(data);

    }).catch((err) => {
      reject({ Message: 'Something went wrong. Please try again!', Data: err });
    });
  });
};
