const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Publisher extends Sequelize.Model {}

Publisher.init({
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'publisher'
});

module.exports = Publisher;