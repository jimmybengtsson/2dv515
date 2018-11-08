const neatCsv = require('neat-csv');
let fs = require('fs');
let userCSV = './data/users.csv';
let ratingCSV = './data/ratings.csv';

exports.users = () => {

  return (async () => {
    return await neatCsv(fs.createReadStream(userCSV), { separator: ';' });
  })();
};

exports.ratings = () => {

  return (async () => {
    return await neatCsv(fs.createReadStream(ratingCSV), { separator: ';' });
  })();
};
