let fetchCSV = require('./FetchCSV');

const Euclidean = (dataA, dataB, ratings,  typeOne, typeTwo) => {

  let sim = 0;
  let n = 0;

  for (let i = 0; i < ratings.length; i++) {
    for (let j = 0; j < ratings.length; j++) {
      if (ratings[i][typeOne] === dataA && ratings[j][typeOne] === dataB && ratings[i][typeTwo] === ratings[j][typeTwo]) {
        sim += Math.pow(ratings[i].Rating - ratings[j].Rating, 2);
        n += 1;
      }
    }
  }

  if (n === 0) {
    return 0;
  }

  return 1 / (1 + sim);
};

const Pearson = (dataA, dataB, ratings,  typeOne, typeTwo) => {

  let sumOne = 0;
  let sumTwo = 0;
  let sumOneSquare = 0;
  let sumTwoSquare = 0;
  let pSum = 0;
  let n = 0;

  for (let i = 0; i < ratings.length; i++) {
    for (let j = 0; j < ratings.length; j++) {
      if (ratings[i][typeOne] === dataA && ratings[j][typeOne] === dataB && ratings[i][typeTwo] === ratings[j][typeTwo]) {
        sumOne += Number(ratings[i].Rating);
        sumTwo += Number(ratings[j].Rating);
        sumOneSquare += Math.pow(ratings[i].Rating, 2);
        sumTwoSquare += Math.pow(ratings[j].Rating, 2);
        pSum += ratings[i].Rating * ratings[j].Rating;
        n += 1;
      }
    }
  }

  if (n === 0) {
    return 0;
  }

  let num = pSum - (sumOne * sumTwo / n);
  let den = Math.sqrt((sumOneSquare - Math.pow(sumOne, 2) / n) * (sumTwoSquare - Math.pow(sumTwo, 2) / n));

  return num / den;
};

exports.getSimilarity = (name, similarityPattern, typeOne, typeTwo) => {

  return new Promise((resolve, reject) => {

    fetchCSV.users().then((usersCsv) => {

      let resObj = {
        Users: [],
        Movies: [],
      };

      fetchCSV.ratings().then((ratingsCsv) => {

        if (typeOne === 'UserID') {

          resObj.Users = getUserMatches(name, usersCsv, ratingsCsv, typeOne, typeTwo, similarityPattern);

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
              if (ratingsCsv[j].UserID !== name && tempMovies[i] === ratingsCsv[j].Movie) {
                for (let u = 0; u < resObj.Users.length; u++) {
                  if (ratingsCsv[j].UserID === resObj.Users[u].UserID) {
                    sum += resObj.Users[u].Score * ratingsCsv[j].Rating;
                    similarity += resObj.Users[u].Score;
                  }
                }
              }
            }

            sum = sum / similarity;

            let tempObj = {
              Movie: ratingsCsv[i].Movie,
              Score: sum.toFixed(3),
            };

            tempArr.push(tempObj);
          }

          for (let i = 0; i < ratingsCsv.length; i++) {
            if (ratingsCsv[i].UserID === name) {
              for (let j = 0; j < tempArr.length; j++) {
                if (ratingsCsv[i].Movie === tempArr[j].Movie) {
                  tempArr.splice(j, 1);
                }
              }
            }
          }

          resObj.Movies = tempArr;

        } else if (typeOne === 'Movie') {

          resObj.Movies = getItemMatches(name, ratingsCsv, ratingsCsv, typeOne, typeTwo, similarityPattern);

          let tempArr = [];

          for (let i = 0; i < usersCsv.length; i++) {
            let sum = 0;
            let similarity = 0;

            for (let j = 0; j < ratingsCsv.length; j++) {
              if (ratingsCsv[j].Movie !== name && usersCsv[i].UserID === ratingsCsv[j].UserID) {
                for (let u = 0; u < resObj.Movies.length; u++) {
                  if (ratingsCsv[j].Movie === resObj.Movies[u].Movie) {
                    sum += resObj.Movies[u].Score * ratingsCsv[j].Rating;
                    similarity += resObj.Movies[u].Score;
                  }
                }
              }
            }

            sum = sum / similarity;

            let tempObj = {
              UserID: usersCsv[i].UserID,
              Score: sum.toFixed(3),
            };

            tempArr.push(tempObj);
          }

          resObj.Users = tempArr;
        }

        resObj.Users.sort((a, b) => b.Score - a.Score);
        resObj.Movies.sort((a, b) => b.Score - a.Score);
        console.log(resObj);
        resolve(resObj);

      });
    }).catch((err) => {
      reject({ message: 'Something went wrong. Please try again!', data: err });
    });
  });
};

exports.getIBRecommendations = (userID, similarityPattern) => {

  let user = userID;
  let ratedArr = [];
  let tempArr = [];
  let resArr = [];

  return fetchCSV.ratings().then((ratings) => {

    for (let i = 0; i < ratings.length; i++) {

      if (ratings[i].UserID === user) {
        ratedArr.push(ratings[i]);
      }
    }

    if (typeof localStorage === 'undefined' || localStorage === null) {
      let LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }

    let storage = JSON.parse(localStorage.getItem('ItemBased-DataSet'));

    for (let i = 0; i < storage.length; i++) {

      if (!ratedArr.find(x => x.Movie === storage[i].Movie)) {
        tempArr.push(storage[i]);
      }
    }

    for (let i = 0; i < tempArr.length; i++) {

      let sum = 0;
      let similarity = 0;

      for (let j = 0; j < ratedArr.length; j++) {

        for (let k = 0; k < tempArr[i][similarityPattern].Movies.length; k++) {
          if (tempArr[i][similarityPattern].Movies[k].Movie === ratedArr[j].Movie) {
            sum += tempArr[i][similarityPattern].Movies[k].Score * ratedArr[j].Rating;
            similarity += tempArr[i][similarityPattern].Movies[k].Score;
          }
        }
      }

      sum = sum / similarity;

      let tempObj = {
        Movie: tempArr[i].Movie,
        Score: sum.toFixed(3),
      };

      resArr.push(tempObj);
    }

    resArr.sort((a, b) => b.Score - a.Score);

    resArr = resArr.slice(0, 3);

    return resArr;

  }).catch((err) => {
    return err;
  });
};

const getUserMatches = (name, csv, ratings, typeOne, typeTwo, similarityPattern) => {

  let tempArr = [];

  for (let i = 0; i < csv.length; i++) {

    if (csv[i][typeOne] !== name) {

      let pattern;

      if (similarityPattern === 'pearson') {
        pattern = Pearson(name, csv[i][typeOne], ratings, typeOne, typeTwo);
      }

      if (similarityPattern === 'euclidean') {
        pattern = Euclidean(name, csv[i][typeOne], ratings, typeOne, typeTwo);
      }

      let tempObj = {
        [typeOne]: csv[i][typeOne],
        Score: +pattern.toFixed(3),
      };

      if (pattern !== 0) {
        tempArr.push(tempObj);
      }
    }
  }

  return tempArr;
};

const getItemMatches = (name, csv, ratings, typeOne, typeTwo, similarityPattern) => {

  let tempArr = [];
  let tempMovies = [];

  for (let i = 0; i < csv.length; i++) {

    if (csv[i][typeOne] !== name && tempMovies.indexOf(csv[i].Movie) < 0) {

      let pattern;

      if (similarityPattern === 'pearson') {
        pattern = Pearson(name, csv[i][typeOne], ratings, typeOne, typeTwo);
      }

      if (similarityPattern === 'euclidean') {
        pattern = Euclidean(name, csv[i][typeOne], ratings, typeOne, typeTwo);
      }

      let tempObj = {
        [typeOne]: csv[i][typeOne],
        Score: +pattern.toFixed(3),
      };

      if (pattern !== 0) {
        tempArr.push(tempObj);
      }

      tempMovies.push(ratings[i].Movie);
    }
  }

  return tempArr;
};

module.exports.Euclidean = Euclidean;
module.exports.Pearson = Pearson;
