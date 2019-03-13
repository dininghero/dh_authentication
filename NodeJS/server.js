const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

/* Middleware */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json())

//for further streamlining, add parsers to only the routes that need the specific ones / will cut down on the amount of code needing to be run from top to bottom and reduce latency and bottlenecking in high traffic - run tests for this theory

app.listen(port, () => console.log(`*** app listening on http://localhost:${port}/ ***`));
