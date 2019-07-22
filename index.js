const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// IMPORT ROUTERS
const categoryRouter = require('./routes/category');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const sequelize = require('./configs/sequelize');

// IMPORT MODELS
const Category = require('./models/category');
const Book = require('./models/book');
const User = require('./models/User');

// REGISTER IMPORTED ROUTERS
app.use('/category', categoryRouter);
app.use('/book', bookRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})