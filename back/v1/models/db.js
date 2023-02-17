'use strict';

// const fs = require('fs');
const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '../../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Successfully connect to MySQL!");
  })
  .catch((err) => {
    console.error(err);
  });

process.on('beforeExit', async () => {
    console.log('Server is shutting down, deleting all data from the database...');
    await sequelize.sync({ force: true });
    console.log('All data deleted from the database');
});

process.on('SIGINT', async () => {
  console.log('Server is shutting down, deleting all data from the database...');
  await sequelize.sync({ force: true });
  console.log('All data deleted from the database');
  process.exit(0);
});

db.Calculator = require('./Calculator')(sequelize, Sequelize);

module.exports = db;
