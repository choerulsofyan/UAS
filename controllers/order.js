const Order = require('../models/order');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

// sequelize use "Javascript Promise"
// It Is Asynchronous

module.exports.getIndexOrder = (req, res) => {
    Order
        .findOne({
            where: {
                id: 1
            }
        })
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getAllOrder = (req, res) => {
    Order.findAll()
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailOrder = (req, res) => {
    Order.findOne({
            where: {
                id: req.params.order_id
            }
        })
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeOrder = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Order.create({
                        date_trans: req.body.date_trans,
                        transaction_number: req.body.transaction_number,
                        qty: req.body.qty,
                        bookId: req.body.bookId,
                        userId: req.body.userId
                    })
                    .then((order) => {
                        res.status(200).json({
                            msg: 'Order Created',
                            order: order
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}

module.exports.updateOrder = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Order.findOne({
                        where: {
                            id: req.params.order_id
                        }
                    })
                    .then((order) => {
                        if (!order) {
                            return res.status(404).json({
                                msg: 'Order Not Found'
                            });
                        }
                        order.date_trans = req.body.date_trans;
                        order.transaction_number = req.body.transaction_number;
                        order.qty = req.body.qty;
                        order.bookId = req.body.bookId;
                        order.userId = req.body.userId;
                        order.save();

                        return res.status(200).json({
                            msg: 'Order Updated',
                            order: order
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}


module.exports.destroyOrder = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Order.destroy({
                        where: {
                            id: req.params.order_id
                        }
                    })
                    .then((order) => {
                        res.status(200).json({
                            msg: 'Order Deleted'
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}

module.exports.searchOrder = (req, res) => {
    Order.findAll({
            limit: 10,
            where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.params.title + '%')
            }
        })
        .then((order) => {
            res.status(200).json({
                msg: 'search results',
                result: order
            });
        })
        .catch((error) => {
            console.log(error)
        });
}