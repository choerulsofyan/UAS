const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Author extends Sequelize.Model {}

Author.init({
    name: Sequelize.STRING,
    email: Sequelize.STRING,
}, {
    underscored: true,
    sequelize,
    modelName: 'author'
});

module.exports = Author;