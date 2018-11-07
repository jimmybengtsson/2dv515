'use strict';

module.exports = (app) => {

  let users = require('../controllers/GenerateUsers');
  let items = require('../controllers/GenerateItems');

  app.route('/users/euclidean')
    .get(users.Euclidean);

  app.route('/users/pearson')
    .get(users.Pearson);

};