const express = require('express');

const app = express();

app.set('view engine', 'ejs');

// IMPORT ROUTERS
const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');
const bookRouter = require('./routes/book');

const sequelize = require('./configs/sequelize');

// IMPORT MODELS
const Product = require('./models/product');
const Category = require('./models/category');
const Book = require('./models/book');

// REGISTER IMPORTED ROUTERS
app.use(homeRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/book', bookRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})