const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Order extends Sequelize.Model {}

Order.init({
    date_trans: Sequelize.DATEONLY,
    transaction_number: Sequelize.STRING,
    qty: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'order'
});

module.exports = Order;