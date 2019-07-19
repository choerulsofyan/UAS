const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Book extends Sequelize.Model {}

Book.init({
    judul: Sequelize.STRING,
    pengarang: Sequelize.STRING,
    penerbit: Sequelize.STRING,
    price: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'book'
});

module.exports = Book;