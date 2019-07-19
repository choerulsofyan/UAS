const User = require('../models/User');
const sequelize = require('sequelize');

module.exports.getIndexUser = (req, res) => {

    // sequelize use "Javascript Promise"
    // It Is Asynchronous
    User
        .findOne({
            where: {
                id: 1
            }
        })
        .then((user) =>{
            res.status(200).json(user);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getAllUser = (req, res) => {
    User.findAll()
    .then((user) => {
        res.status(200).json({
            data: user
        });
    })
    .catch((error) => {
        console.log(error)
    });
}

module.exports.getDetailUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.user_id
        }
    })
    .then((user) => {
        res.status(200).json(user);
    })
    .catch((error) => {
        console.log(error)
    });
} 

module.exports.storeUser = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })
    .then((user) => {
        res.status(201).json({
            msg: 'User Created',
            user: user
        });
    })
    .catch((error) => {
        console.log(error)
    });
} 

module.exports.updateUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.user_id
        }
    })
    .then((user) => {
        if(!user){
            return res.status(404).json({
                msg: 'User Not Found'
            });
        }
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = req.body.role;
        user.save();
        
        return res.status(200).json({
            msg: 'User Updated',
            book: user
        });
    })
    .catch((error) => {
        console.log(error)
    });
} 


module.exports.destroyUser = (req, res) => {
    User.destroy({
        where: {
            id: req.params.user_id
        }
    })
    .then((user) => {
        res.status(200).json({
            msg: 'User Deleted'
        });
    })
    .catch((error) => {
        console.log(error)
    });
} 

module.exports.searchUser = (req, res) => {
    User.findAll({
        limit: 10,
        where: {
            username: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', '%' + req.params.username + '%')
        }
    })
    .then((user) => {
        res.status(200).json({
            msg: 'search results',
            result: user
        });
    })
    .catch((error) => {
        console.log(error)
    });
} 