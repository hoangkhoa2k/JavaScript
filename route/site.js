const { render } = require('ejs');
const express = require('express');
const router = express.Router();
//define route
router.get('/view/shop', product.getAll)
module.exports = router;
router.get('/checkout', user.login)
router.post('/checkout', user.register);
router.post('/index', user.login1);