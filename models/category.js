const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Category extends Sequelize.Model {}

Category.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING
}, {
    sequelize,
    modelName: 'category'
});

module.exports = Category;