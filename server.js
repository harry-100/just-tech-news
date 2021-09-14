// import the Sequelize constructor form the library
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
/* foreign key constraint failure occurs when trying to drop a table
with foreign key. the workaround is to disable foreign key check before dropping the
table and then re-enable it after dropping and creating the tables */
sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
    sequelize.sync({ force: false }).then(() => {
        app.listen(PORT, () => console.log('Now listening'));
        sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      });
});
/* sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
}); */
