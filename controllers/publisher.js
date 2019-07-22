const Publisher = require('../models/publisher');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

// sequelize use "Javascript Promise"
// It Is Asynchronous

module.exports.getIndexPublisher = (req, res) => {
    Publisher
        .findOne({
            where: {
                id: 1
            }
        })
        .then((publisher) => {
            res.status(200).json(publisher);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getAllPublisher = (req, res) => {
    Publisher.findAll()
        .then((publisher) => {
            res.status(200).json(publisher);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailPublisher = (req, res) => {
    Publisher.findOne({
            where: {
                id: req.params.publisher_id
            }
        })
        .then((publisher) => {
            res.status(200).json(publisher);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storePublisher = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Publisher.create({
                        name: req.body.name,
                        phone: req.body.phone,
                        email: req.body.email,
                        address: req.body.address
                    })
                    .then((publisher) => {
                        res.status(200).json({
                            msg: 'Publisher Created',
                            publisher: publisher
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

module.exports.updatePublisher = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Publisher.findOne({
                        where: {
                            id: req.params.publisher_id
                        }
                    })
                    .then((publisher) => {
                        if (!publisher) {
                            return res.status(404).json({
                                msg: 'Publisher Not Found'
                            });
                        }
                        publisher.name = req.body.name;
                        publisher.phone = req.body.phone;
                        publisher.email = req.body.email;
                        publisher.address = req.body.address;
                        publisher.save();

                        return res.status(200).json({
                            msg: 'Publisher Updated',
                            publisher: publisher
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


module.exports.destroyPublisher = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Publisher.destroy({
                        where: {
                            id: req.params.publisher_id
                        }
                    })
                    .then((publisher) => {
                        res.status(200).json({
                            msg: 'Publisher Deleted'
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

module.exports.searchPublisher = (req, res) => {
    Publisher.findAll({
            limit: 10,
            where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.params.title + '%')
            }
        })
        .then((publisher) => {
            res.status(200).json({
                msg: 'search results',
                result: publisher
            });
        })
        .catch((error) => {
            console.log(error)
        });
}