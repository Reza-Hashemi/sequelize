const { Sequelize } = require('sequelize');

const connection = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    acquire: 1000 * 30,
    idle: 1000 * 10,
    min: 0,
    max: 10,
  },
});

(async function () {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
module.exports = connection;
