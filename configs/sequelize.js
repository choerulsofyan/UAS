const Sequelize = require('sequelize');
// const sequelize = new Sequelize('mysql://root:s3cret@localhost:3306/uas');
const sequelize = new Sequelize('mysql://root:s3cret@localhost:3306/myapp');

module.exports = sequelize;