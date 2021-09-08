const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 4000;
const path = require('path');
const { title } = require('process');
//create connection
app.use(bodyParser.urlencoded({ extended: true }));
//khai bao su dung template ejs
app.set("views", "./view");
app.use(express.static("public"));

app.set("view engine", "ejs");

// const routeSite = require('./route/site');
const routeAdmin = require('./route/auth');

// app.use('/', routeSite);
app.use('/admin', routeAdmin);

//router
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/about', (req, res) => {
    res.render('about');
})

app.get("/shop", (req, res) => {
    res.render('shop');
});
app.get('/blog', (req, res) => {
    res.render('blog');
})
app.get('/cart', (req, res) => {
    res.render('cart');
})
app.get('/checkout', (req, res) => {
    res.render('checkout');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.get('/delivery', (req, res) => {
    res.render('delivery');
})
app.get('/list', (req, res) => {
    res.render('list');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/detail/:id', (req, res) => {
    res.render('detail');
})

app.listen(port, () => {
    console.log(`Hello!!!Server đang chạy port: ${ port } ngon lành :)`);
});