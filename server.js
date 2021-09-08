// import the Sequelize constructor form the library
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// turn on routes
app.use(routes);

// turn on connection to db and server
// sync() connects sequelize to the database
// force: true would make sequelize drop and re-create all of the database tables every time on start
sequelize.sync({ force: true}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});