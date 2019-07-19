const Category = require('../models/category');
const sequelize = require('sequelize');

module.exports.getIndexCategory = (req, res) => {
    Category
        .findOne({
            where: {
                id: 1
            }
        })
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getAllCategory = (req, res) => {
    Category.findAll()
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailCategory = (req, res) => {
    Category.findOne({
            where: {
                id: req.params.category_id
            }
        })
        .then((category) => {
            res.status(200).json(category);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeCategory = (req, res) => {
    Category.create({
            name: req.body.name,
            description: req.body.description
        })
        .then((category) => {
            res.status(200).json({
                msg: 'Category Created',
                category: category
            });
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.updateCategory = (req, res) => {
    Category.findOne({
            where: {
                id: req.params.category_id
            }
        })
        .then((category) => {
            if (!category) {
                return res.status(404).json({
                    msg: 'Category Not Found'
                });
            }
            category.name = req.body.name;
            category.description = req.body.description;
            category.save();

            return res.status(200).json({
                msg: 'Category Updated',
                category: category
            });
        })
        .catch((error) => {
            console.log(error)
        });
}


module.exports.destroyCategory = (req, res) => {
    Category.destroy({
            where: {
                id: req.params.category_id
            }
        })
        .then((category) => {
            res.status(200).json({
                msg: 'Category Deleted'
            });
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.searchCategory = (req, res) => {
    Category.findAll({
            limit: 10,
            where: {
                name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + req.params.name + '%')
            }
        })
        .then((category) => {
            res.status(200).json({
                msg: 'search results',
                result: category
            });
        })
        .catch((error) => {
            console.log(error)
        });
}