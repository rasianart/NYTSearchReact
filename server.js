// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// Sets up the Express App
// =============================================================
const app = express();
let PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static("./public"));

let server = require('http').Server(app);
server.listen(8000);

var io = require('socket.io')(server);
// socket.io demo
io.on('connection', function (socket) {
  socket.emit('server event', { foo: 'bar' });
  socket.on('client event', function (data) {
    console.log(data);
  });
  socket.on('clientMessage', function (data) {
      console.log("socket: " + JSON.stringify(data));
  });
});

const config = require('./webpack.dev.config.js');
let compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/data-routes.js")(app, io);

mongoose.connect('mongodb://localhost/nyt');

// app.listen(PORT, () => {
//     console.log("App listening on PORT " + PORT);
// });
