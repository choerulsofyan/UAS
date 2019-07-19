const express = require('express');

const app = express();

app.set('view engine', 'ejs');

const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const sequelize = require('./configs/sequelize');

const Product = require('./models/product');
const Book = require('./models/Book');
const User = require('./models/User');

app.use(homeRouter);
app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/product', productRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})