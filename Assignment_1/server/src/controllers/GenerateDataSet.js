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

            console.log(tempArr);
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

const generateData = (movie, similarityPattern) => {

  return new Promise((resolve, reject)  => {

    algorithms.getSimilarity(movie, similarityPattern, 'Movie', 'UserID').then((data) => {

      resolve(data);

    }).catch((err) => {
      reject({ Message: 'Something went wrong. Please try again!', Data: err });
    });
  });
};
