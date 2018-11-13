'use strict';

module.exports = (app) => {

  let users = require('../controllers/UserBased');
  let items = require('../controllers/ItemBased');

  app.route('/users')
    .get(users.GetUsers);

  app.route('/users/euclidean')
    .post(users.Euclidean);

  app.route('/users/pearson')
    .post(users.Pearson);

  app.route('/ratings')
    .get(items.GetRatings);

  app.route('/items')
    .get(items.getMovies);

  app.route('/items/euclidean')
    .post(items.Euclidean);

  app.route('/items/pearson')
    .post(items.Pearson);

  app.route('/users/ib-euclidean')
    .post(items.IBEuclidean);

  app.route('/users/ib-pearson')
    .post(items.IBPearson);

};
