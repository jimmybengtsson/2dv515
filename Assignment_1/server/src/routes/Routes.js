'use strict';

module.exports = (app) => {

  let users = require('../controllers/GenerateUsers');
  let items = require('../controllers/GenerateItems');

  app.route('/users')
    .get(users.GetUsers);

  app.route('/users/euclidean')
    .post(users.Euclidean);

  app.route('/users/pearson')
    .get(users.Pearson);

  app.route('/ratings')
    .get(items.GetRatings);

};
