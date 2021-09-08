const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
        res.render('admin/admin');
    })
    // router.get('/admin', (req, res) => {
    //     res.render('admin/admin');
    // })

// products
router.get('/products', (req, res) => {
    res.render('admin/products');
})
router.get('/add_products', (req, res) => {
    res.render('admin/add_products');
})
router.get('/edit_products/:id', (req, res) => {
    res.render('admin/edit_products');
})

// categories
router.get('/categories', (req, res) => {
    res.render('admin/categories');
})
router.get('/add_categories', (req, res) => {
    res.render('admin/add_categories');
})
router.get('/edit_categories/:id', (req, res) => {
    res.render('admin/edit_categories');
})

// user
router.get('/user', (req, res) => {
    res.render('admin/user');
})
router.get('/add_user', (req, res) => {
    res.render('admin/add_user');
})
router.get('/edit_user/:id', (req, res) => {
    res.render('admin/edit_user');
})

// income
router.get('/income', (req, res) => {
    res.render('admin/income');
})

module.exports = router;