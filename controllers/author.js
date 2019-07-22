const Author = require('../models/author');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

// sequelize use "Javascript Promise"
// It Is Asynchronous

module.exports.getIndexAuthor = (req, res) => {
    Author
        .findOne({
            where: {
                id: 1
            }
        })
        .then((author) => {
            res.status(200).json(author);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getAllAuthor = (req, res) => {
    Author.findAll()
        .then((author) => {
            res.status(200).json(author);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailAuthor = (req, res) => {
    Author.findOne({
            where: {
                id: req.params.author_id
            }
        })
        .then((author) => {
            res.status(200).json(author);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeAuthor = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Author.create({
                        name: req.body.name,
                        email: req.body.email
                    })
                    .then((author) => {
                        res.status(200).json({
                            msg: 'Author Created',
                            author: author
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

module.exports.updateAuthor = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Author.findOne({
                        where: {
                            id: req.params.author_id
                        }
                    })
                    .then((author) => {
                        if (!author) {
                            return res.status(404).json({
                                msg: 'Author Not Found'
                            });
                        }
                        author.name = req.body.name;
                        author.email = req.body.email;
                        author.save();

                        return res.status(200).json({
                            msg: 'Author Updated',
                            author: author
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


module.exports.destroyAuthor = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Author.destroy({
                        where: {
                            id: req.params.author_id
                        }
                    })
                    .then((author) => {
                        res.status(200).json({
                            msg: 'Author Deleted'
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

module.exports.searchAuthor = (req, res) => {
    Author.findAll({
            limit: 10,
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.params.name + '%')
            }
        })
        .then((author) => {
            res.status(200).json({
                msg: 'search results',
                result: author
            });
        })
        .catch((error) => {
            console.log(error)
        });
}