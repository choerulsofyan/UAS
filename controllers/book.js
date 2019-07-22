const Book = require('../models/book');
const sequelize = require('sequelize');

// sequelize use "Javascript Promise"
// It Is Asynchronous

module.exports.getIndexBook = (req, res) => {
    Book
        .findOne({
            where: {
                id: 1
            }
        })
        .then((book) => {
            res.status(200).json(book);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getAllBook = (req, res) => {
    Book.findAll()
        .then((book) => {
            res.status(200).json(book);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailBook = (req, res) => {
    Book.findOne({
            where: {
                id: req.params.book_id
            }
        })
        .then((book) => {
            res.status(200).json(book);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Book.create({
                        judul: req.body.judul,
                        pengarang: req.body.pengarang,
                        penerbit: req.body.penerbit,
                        price: req.body.price,
                    })
                    .then((book) => {
                        res.status(200).json({
                            msg: 'Book Created',
                            book: book
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

module.exports.updateBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Book.findOne({
                        where: {
                            id: req.params.book_id
                        }
                    })
                    .then((book) => {
                        if (!book) {
                            return res.status(404).json({
                                msg: 'Book Not Found'
                            });
                        }
                        book.judul = req.body.judul;
                        book.pengarang = req.body.pengarang;
                        book.penerbit = req.body.penerbit;
                        book.price = req.body.price;
                        book.save();

                        return res.status(200).json({
                            msg: 'Book Updated',
                            book: book
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


module.exports.destroyBook = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Book.destroy({
                        where: {
                            id: req.params.book_id
                        }
                    })
                    .then((book) => {
                        res.status(200).json({
                            msg: 'Book Deleted'
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

module.exports.searchBook = (req, res) => {
    Book.findAll({
            limit: 10,
            where: {
                judul: sequelize.where(sequelize.fn('LOWER', sequelize.col('judul')), 'LIKE', '%' + req.params.judul + '%')
            }
        })
        .then((book) => {
            res.status(200).json({
                msg: 'search results',
                result: book
            });
        })
        .catch((error) => {
            console.log(error)
        });
}