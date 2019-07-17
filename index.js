const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');

const sequelize = require('./configs/sequelize');

const Product = require('./models/product');
const Book = require('./models/Book');

app.use(homeRouter);
app.use('/product', productRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})