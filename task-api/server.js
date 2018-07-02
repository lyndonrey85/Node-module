const express = require("express");
const bodyParser = require("body-parser");
const port = 8000;
const app = express();

app.use(bodyParser.json())

require('./server/config/mongoose');

require('./server/config/routes')(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
   });