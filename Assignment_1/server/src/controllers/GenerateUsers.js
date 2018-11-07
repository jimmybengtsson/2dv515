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
