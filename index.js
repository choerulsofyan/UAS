const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// IMPORT ROUTERS
const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const sequelize = require('./configs/sequelize');

// IMPORT MODELS
const Product = require('./models/product');
const Book = require('./models/Book');
const User = require('./models/User');
const Category = require('./models/category');

// REGISTER IMPORTED ROUTERS
app.use(homeRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/book', bookRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})