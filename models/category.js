const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Category extends Sequelize.Model {}

Category.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING
}, {
    underscored: true,
    sequelize,
    modelName: 'category'
});

module.exports = Category;