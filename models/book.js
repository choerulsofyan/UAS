const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Book extends Sequelize.Model {}

Book.init({
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    publisher: Sequelize.STRING,
    price: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'book'
});

module.exports = Book;