const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Book extends Sequelize.Model {}

Book.init({
    title: Sequelize.STRING,
    price: Sequelize.INTEGER,
}, {
    underscored: true,
    sequelize,
    modelName: 'book'
});

module.exports = Book;