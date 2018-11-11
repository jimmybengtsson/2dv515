let fetchCSV = require('./FetchCSV');

exports.GetRatings = (req, res) => {

  fetchCSV.ratings().then((data) => {

    transposeToMovies().then((test) => {

      return res.json({ ratings: data, test: test,});
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.Euclidean = (req, res) => {

};

exports.Pearson = (req, res) => {

};

const transposeToMovies = () => {

  return new Promise((resolve, reject)  => {

    fetchCSV.ratings().then((data, err) => {

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
        };

        for (let j = 0; j < data.length; j++) {

          if (tempMovies[i] === data[j].Movie) {
            let ratingObj = {
              userID: data[j].UserID,
              rating: data[j].Rating,
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
