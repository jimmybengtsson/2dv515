'use strict';

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let genDataSet = require('./src/controllers/GenerateDataSet');

genDataSet.itemBased();
setInterval(() => {
  genDataSet.itemBased();
}, 300000);

let app = express();
let port = process.env.PORT || 8008;

app.use(bodyParser.json());
app.use(cors());

let routes = require('./src/routes/Routes.js');

routes(app);

app.listen(port, () => {
  console.log('API server started on: ' + port);
});
