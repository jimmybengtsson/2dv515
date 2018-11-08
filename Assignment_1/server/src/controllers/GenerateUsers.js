let fetchUsers = require('./FetchCSV');

exports.GetUsers = (req, res) => {

  fetchUsers.users().then((data, err) => {
    if (err) {
      return res.status(500).json({ message: 'Server failed. Please try again!' });
    }

    console.log(data);
    return res.json({ users: data });
  });
};

exports.Euclidean = (req, res) => {

  return new Promise((resolve, reject) => {

      /*if (err) {
        reject(err);
      }*/

      console.log('Euclidean');
      resolve(res.json({ message: 'Euclidean', }));
    });
};

exports.Pearson = (req, res) => {

  return new Promise((resolve, reject) => {

    /*if (err) {
      reject(err);
    }*/

    console.log('Pearson');
    resolve(res.json({ message: 'Pearson', }));
  });
};
