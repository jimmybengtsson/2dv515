'use strict';

/**
 *  Bind the different express-routes to their functions
 */

module.exports = (app) => {

  let controller = require('../controllers/Controller');

  app.route('/blogdata')
    .get(controller.GetDataSet);

};
